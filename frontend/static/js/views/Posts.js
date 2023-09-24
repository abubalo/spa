import AbstractView from "./AbstractView.js";

export default class Posts extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Post");
  }

  async getHtml() {
    return `
        <h1>Why I love Typescript</h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quae sit ullam adipisci ut voluptatem qui odit, illo et, incidunt atque quia iure magnam nesciunt nostrum? Rem adipisci quod ex.</p>
        <p>

        <a href="/posts" class="" data-link>View recent posts</a>

        </p>
    `;
  }
}
