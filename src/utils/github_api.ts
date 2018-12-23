import axios from 'axios';
import config from '../config';
import cache from './cache';
import fm from 'front-matter';
import moment from 'moment';

export interface IFile {
  title: string;
  date: string;
  sha: string;
  size: number;
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

/**
 * Retrieves only the title out of the filename
 * @param filename the full filename
 * @returns string
 */
const getTitle = (filename: string): string => {
  return filename.replace(/\.md$/, '').replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '');
};

/**
 * Retrieves the date out of the filename
 * @param filename the full filename
 * @returns string
 */
const getDate = (filename: string): string => {
  const pattern = new RegExp(/^\d{4}-\d{1,2}-\d{1,2}/);
  return pattern.exec(filename) + '';
};

/**
 * Formats a file, received from the github api
 * @param param0 data from the file
 * @returns any
 */
const formatFile = ({ name, sha, size }: any) => ({ title: getTitle(name), date: getDate(name), hash: sha, size });

export default {
  /**
   * Gets the content list.
   * @returns Promise<any>
   */
  async getList(): Promise<any> {
    if (cache.hasItem('list')) {
      return Promise.resolve(cache.getItem('list'));
    } else {
      // Get list
      const response = await axios.get(getListUrl());

      // Remove unneeded data
      const list = response.data.map(formatFile);

      // Save into cache
      cache.setItem('list', list);

      // Return it
      return list;
    }
  },

  /**
   * Gets the file content.
   * @param hash
   * @returns Promise<any>
   */
  async getRawContent(hash: string): Promise<any> {
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
   * @returns Promise<any>
   */
  async getMetaData(hash: string): Promise<any> {
    const cacheKey = `meta.${hash}`;

    if (cache.hasItem(cacheKey)) {
      return Promise.resolve(JSON.parse(cache.getItem(cacheKey)));
    } else {
      // Get list
      const response = await this.getRawContent(hash);

      // Parse front-matter (to get meta-data)
      const content: any = fm(response);

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
   * @returns Promise<any>
   */
  async getContent(hash: string): Promise<any> {
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
  async getContentWithMetaData(hash: string): Promise<any> {
    const content = await this.getContent(hash);
    const metaData = await this.getMetaData(hash);

    return { content, ...metaData };
  }
};
