// const { fetchProducts } = require("./helpers/fetchProducts");

// const { fetchItem } = require("./helpers/fetchItem");

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const itemInCart = event.target;
  itemInCart.remove();
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const createItemsOnPage = async () => {
  const section = document.querySelector('.items');
  const { results } = await fetchProducts('computador');
  results.map((element) => section.appendChild(createProductItemElement(element)));
};

const addItemsInCart = async (event) => {
  const idItem = getSkuFromProductItem(event.target.parentElement);
  const objectItem = await fetchItem(idItem);
  const ol = document.querySelector('.cart__items');
  ol.appendChild(createCartItemElement(objectItem));
};

const puttingItemsInCart = () => {
  const button = document.querySelectorAll('.item__add');
  const products = [...button];
  products.forEach((element) => {
    element.addEventListener('click', addItemsInCart);
  });
};

window.onload = async () => {
  await createItemsOnPage();
  puttingItemsInCart();
};
