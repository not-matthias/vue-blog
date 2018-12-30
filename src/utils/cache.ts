export default {
  /**
   * Get an item from the session storage.
   * @param  {string} key
   */
  getItem(key: string) {
    return this.isValid() && window.sessionStorage.getItem(key);
  },

  /**
   * Set an item from in the session storage.
   * @param  {string} key
   * @param  {string} value
   * @returns boolean
   */
  setItem(key: string, value: string): boolean {
    return this.isValid() && window.sessionStorage.setItem(key, value) === null;
  },

  /**
   * Check if an item exists.
   * @param  {string} key
   * @returns boolean
   */
  hasItem(key: string): boolean {
    return this.isValid() && window.sessionStorage.hasOwnProperty(key);
  },

  /**
   * Check if the session storage is valid.
   * @returns boolean
   */
  isValid(): boolean {
    return !!window.sessionStorage;
  }
};
