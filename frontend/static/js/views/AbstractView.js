export default class AbstractView {
  constructor(param) {
    this.params = param;

    console.log(this.params);
  }

  setTitile(title) {
    document.title = title;
  }

  async getHtml() {
    return ``;
  }
}
