// Logic:
// 1. Look if the markdown file has been loaded and saved in the local storage
//    - If not found, load and save it to local storage
//    - If found, render it

import axios from 'axios';
import { Config, ICategory } from '../config';

/**
 * Generates a url for a content list
 * @returns {string} the url
 */
module.exports.getListUrl = (): string =>
  `https://api.github.com/repos/${Config.username}/${Config.repo}/contents/?ref=${Config.branch}`;

/**
 * Generates a url for the content of a file
 * @param  {string} hash the file hash
 */
module.exports.getPostUrl = (hash: string) =>
  `https://api.github.com/repos/${Config.username}/${Config.repo}/git/blobs/${hash}`;
