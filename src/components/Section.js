export default class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._container = document.querySelector(sectionSelector);

    // render function
    this._renderer = renderer;
  }

  concatItems(items){
    this._items = this._items.concat(items);
  }

  render() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
