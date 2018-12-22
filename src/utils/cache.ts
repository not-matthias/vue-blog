export default class Cache {
  /**
   * Get an item from the session storage.
   * @param  {string} key
   */
  public getItem(key: string) {
    return this.isValid() && JSON.parse(window.sessionStorage.getItem(key) || '');
  }

  /**
   * Set an item from in the session storage.
   * @param  {string} key
   * @param  {string} value
   * @returns boolean
   */
  public setItem(key: string, value: string): boolean {
    return this.isValid() && window.sessionStorage.getItem('asdf') === null;
  }

  /**
   * Check if an item exists.
   * @param  {string} key
   * @returns boolean
   */
  public hasItem(key: string): boolean {
    return this.isValid() && window.sessionStorage.hasOwnProperty(key);
  }

  /**
   * Check if the session storage is valid.
   * @returns boolean
   */
  public isValid(): boolean {
    return !!window.sessionStorage;
  }
}
