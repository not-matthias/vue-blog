import axios from 'axios';
import config from '../config';
import cache from './cache';
import fm from 'front-matter';
import moment from 'moment';

export interface IMetaData {
  title: string;
  date: string;
  tags: string[];
  description: string;
  author: string;
}

interface IFileResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: ILinks;
}

export interface IFile {
  hash: string;
  title: string;
  date: string;
  tags: string[];
  author: string;
  description: string;
}

interface IPost {
  content: string;
  metaData: IMetaData;
}

interface ILinks {
  self: string;
  git: string;
  html: string;
}

/**
 * Generates a url for a content list
 * @returns {string} the url
 */
const getListUrl = (): string =>
  `https://api.github.com/repos/${config.username}/${config.repo}/contents/${config.folder}?ref=${config.branch}`;

/**
 * Generates a url for the content of a file
 * @param  {string} hash the file hash
 */
const getPostUrl = (hash: string) => `https://api.github.com/repos/${config.username}/${config.repo}/git/blobs/${hash}`;

export default {
  /**
   * Parses the response.
   * @param file
   * @returns Promise<IFile>
   */
  async parseListResponse(file: IFileResponse): Promise<IFile> {
    const metaData = await this.getMetaData(file.sha);

    return {
      hash: file.sha,
      title: metaData.title,
      date: metaData.date,
      tags: metaData.tags,
      author: metaData.author,
      description: metaData.description
    };
  },

  /**
   * Gets the content list.
   * @returns Promise<IFile[]>
   */
  async getList(): Promise<IFile[]> {
    if (cache.hasItem('list')) {
      return Promise.resolve(JSON.parse(cache.getItem('list')));
    } else {
      // Get list
      const response = await axios.get<IFileResponse[]>(getListUrl());

      // Create custom list
      const promise: Array<Promise<IFile>> = response.data.map(file => this.parseListResponse(file));

      // Resolve all promises
      const list = await Promise.all(promise);

      // Save into cache
      cache.setItem('list', JSON.stringify(list));

      // Return it
      return list;
    }
  },

  /**
   * Gets the file content.
   * @param hash
   * @returns Promise<string>
   */
  async getRawContent(hash: string): Promise<string> {
    const cacheKey = `post.${hash}`;
    const headers = { Accept: 'application/vnd.github.v3.raw' };

    if (cache.hasItem(cacheKey)) {
      return Promise.resolve(cache.getItem(cacheKey));
    } else {
      // Get list
      const response = await axios.get(getPostUrl(hash), { headers });

      // Save into cache
      cache.setItem(cacheKey, response.data);

      // Return it
      return response.data;
    }
  },

  /**
   * Gets the meta data.
   * @param  {string} hash
   * @returns Promise<IMetaData>
   */
  async getMetaData(hash: string): Promise<IMetaData> {
    const cacheKey = `meta.${hash}`;

    if (cache.hasItem(cacheKey)) {
      return Promise.resolve(JSON.parse(cache.getItem(cacheKey)));
    } else {
      // Get list
      const response = await this.getRawContent(hash);

      // Parse front-matter (to get meta-data)
      const content = fm<IMetaData>(response);

      // Create meta data object
      const data = {
        title: content.attributes.title,
        date: moment(content.attributes.date).format('dddd, DD. MMMM YYYY'),
        tags: content.attributes.tags,
        description: content.attributes.description,
        author: content.attributes.author
      };

      // Save into cache
      cache.setItem(cacheKey, JSON.stringify(data));

      // Return it
      return data;
    }
  },

  /**
   * Gets the content without meta data.
   * @param hash
   * @returns Promise<string>
   */
  async getContent(hash: string): Promise<string> {
    // Get raw content
    const response = await this.getRawContent(hash);

    // Remove metadata
    const content = response.replace(/^---[\s\S]*---/, '');

    // Return it
    return content;
  },

  /**
   * Gets the content with meta data.
   * @param hash
   * @returns Promise<any>
   */
  async getContentWithMetaData(hash: string): Promise<IPost> {
    const content = await this.getContent(hash);
    const metaData = await this.getMetaData(hash);

    return { content, metaData };
  }
};
