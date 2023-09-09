class Product {
  constructor(id, photo, title, description, sell, buy, count) {
    this.id = id;
    this.photo = photo;
    this.title = title;
    this.description = description;
    this.sell = sell;
    this.count = count;
    this.buy = buy;
  }
}

module.exports = Product;
