// Logic:
// 1. Look if the markdown file has been loaded and saved in the local storage
//    - If not found, load and save it to local storage
//    - If found, render it

import axios from 'axios';
import { Config, ICategory } from '../config';
import Cache from './cache';

/**
 * Generates a url for a content list
 * @returns {string} the url
 */
const getListUrl = (): string =>
  `https://api.github.com/repos/${Config.username}/${Config.repo}/contents/?ref=${Config.branch}`;

/**
 * Generates a url for the content of a file
 * @param  {string} hash the file hash
 */
const getPostUrl = (hash: string) => `https://api.github.com/repos/${Config.username}/${Config.repo}/git/blobs/${hash}`;

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
const formatFile = ({ name, sha, size }: any) => ({ title: getFileName(name), data: getDate(name), sha, size });

export default {
  /**
   * Gets the content list.
   * @returns Promise<any>
   */
  async getList(): Promise<any> {
    if (Cache.hasItem('list')) {
      return Promise.resolve(Cache.getItem('list'));
    } else {
      // Get list
      const response = await axios.get(getListUrl());

      // Remove unneeded data
      const list = response.data.map(formatFile);

      // Save into cache
      Cache.setItem('list', list);

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
    const config = {
      headers: { Accept: 'application/vnd.github.v3.raw' }
    };
    const cacheKey = `post.${hash}`;

    if (Cache.hasItem(cacheKey)) {
      return Promise.resolve(Cache.getItem(cacheKey));
    } else {
      // Get list
      const response = await axios.get(getPostUrl(hash), config);

      // Save into cache
      Cache.setItem(cacheKey, response.data);

      // Return it
      return response.data;
    }
  }
};
