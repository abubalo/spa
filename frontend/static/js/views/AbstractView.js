/**
 * Base class for views in the SPA.
 */
 export default class AbstractView {
  /**
   * Constructs an AbstractView instance.
   *
   * @param {object} param - Parameters for the view.
   */
  constructor(param) {
    /**
     * Parameters for the view.
     * @type {object}
     */
    this.params = param;

    // Example: Log the parameters to the console
    console.log(this.params);
  }

  /**
   * Sets the title of the HTML document.
   *
   * @param {string} title - The title to set.
   */
  setTitle(title) {
    document.title = title;
  }

  /**
   * Asynchronously retrieves the HTML content for the view.
   *
   * @returns {Promise<string>} A promise that resolves to the HTML content.
   */
  async s() {
    // Return an empty string by default; subclasses should override this method
    return ``;
  }
}
