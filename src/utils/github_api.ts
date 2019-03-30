import config from '@/config';
import cache from '@/utils/cache';
import axios from 'axios';
import fm from 'front-matter';
import moment from 'moment';

export interface IMetaData {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
}

interface IListResponse {
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
  metaData: IMetaData;
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
  async parseListResponse(file: IListResponse): Promise<IFile> {
    const metaData = await this.getMetaData(file.sha);

    return {
      hash: file.sha,
      metaData
    };
  },

  /**
   * Gets the content list.
   * @returns Promise<IFile[]>
   */
  async getList(): Promise<IFile[]> {
      // Get list
      const response = await axios.get<IListResponse[]>(getListUrl());

      // Create custom list
      const promise: Array<Promise<IFile>> = response.data.map(file => this.parseListResponse(file));

      // Resolve all promises
      const list = await Promise.all(promise);

      // Return it
      return list;
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
      return Promise.resolve(cache.getItem(cacheKey) || '');
    } else {
      // Get list
      const response = await axios.get<string>(getPostUrl(hash), { headers });

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
      return Promise.resolve(JSON.parse(cache.getItem(cacheKey) || ''));
    } else {
      // Get list
      const response = await this.getRawContent(hash);

      // Parse front-matter (to get meta-data)
      const content = fm<IMetaData>(response);

      // Create meta data object
      const data = {
        title: content.attributes.title,
        description: content.attributes.description,
        date: moment(content.attributes.date).format('DD. MMMM YYYY'),
        author: content.attributes.author,
        category: content.attributes.category,
        tags: content.attributes.tags
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

    // Remove meta data
    const lines: string[] = response.split('\n');
    lines.splice(0, 8);

    // Return it
    return lines.join('\n');
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
