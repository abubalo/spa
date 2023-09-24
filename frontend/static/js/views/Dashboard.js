import AbstractView from "./AbstractView.js";

export default class Dashboard extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitile("Dashboard");
  }

  async getHtml() {
    return `
        <h1>Welcome back, Abu</h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quae sit ullam adipisci ut voluptatem qui odit, illo et, incidunt atque quia iure magnam nesciunt nostrum? Rem adipisci quod ex.</p>
        <p>

        <a href="/posts" class="" data-link>View recent posts</a>

        </p>
    `;
  }
}
