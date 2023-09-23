import AbstractView from "./AbstractView.js";

export default class Settings extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitile("Settings");
  }

  async getHtml() {
    return `
        <h1>This is settings page</h1>

        <p>Manage your privacy</p>
        <p>

        <a href="/" class="nav__link" data-link>Go back to dashboard</a>

        </p>
    `;
  }
}
