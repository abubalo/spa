import AbstractView from "./AbstractView.js";

export default class Settings extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Settings");
  }

  async getHtml() {
    return `
        <h1>This is settings page</h1>

        <p>Manage your privacy</p>
        <p>

        <a href="/" class="" data-link>Go back to dashboard</a>

        </p>
    `;
  }
}
