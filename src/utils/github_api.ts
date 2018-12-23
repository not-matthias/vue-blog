import axios from 'axios';
import config from '../config';
import cache from './cache';

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
 * Retrieves only the filename out of the filename
 * @param filename the full filename
 * @returns string
 */
const getFileName = (filename: string): string => {
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
const formatFile = ({ name, sha, size }: any) => ({ title: getFileName(name), date: getDate(name), sha, size });

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
  async getContent(hash: string): Promise<any> {
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
  }
};
