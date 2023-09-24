import AbstractView from "./AbstractView.js";

export default class NotFound extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Page not Found");
  }

  async getHtml() {
    return `
        <h1>Page not found</h1>

        <p>The page you are looking for is not found.</p>
        <p>

        <a href="/posts" class="" data-link>Go back to dasboard</a>

        </p>
    `;
  }
}
