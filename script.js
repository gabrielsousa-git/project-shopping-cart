// const { fetchProducts } = require("./helpers/fetchProducts");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

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

const ol = document.querySelector('.cart__items');

const cartItemClickListener = (event) => {
  if (event.target.tagName === 'LI') {
    event.target.remove();
    saveCartItems(ol.innerHTML);
  }
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
  ol.appendChild(createCartItemElement(objectItem));
  saveCartItems(ol.innerHTML);
};

const puttingItemsInCart = () => {
  const button = document.querySelectorAll('.item__add');
  const products = [...button];
  products.forEach((element) => {
    element.addEventListener('click', addItemsInCart);
  });
};

const recoverItems = () => {
  const shoppingCart = document.querySelector('ol.cart__items');
  const conteudoRecuperado = localStorage.getItem('cartItems');
  shoppingCart.innerHTML = conteudoRecuperado;
  // console.log(conteudoRecuperado);
  // const conteudoParaAdicionar = [];
  // const novoConteudo = [...conteudoRecuperado, conteudoParaAdicionar];
  // localStorage.setItem('cartItems', novoConteudo);
};

const clearCart = () => {
  const clearButton = document.querySelector('.empty-cart');
  clearButton.addEventListener('click', () => {
    ol.innerHTML = '';
    saveCartItems();
  });
};

const addLoading = () => {
  const container = document.querySelector('.items');
  const element = document.createElement('p');
  element.innerText = 'carregando...';
  element.classList.add('loading');
  container.append(element);
};

const removeLoading = () => {
  const container = document.querySelector('.items');
  const loading = document.querySelector('.loading');
  container.removeChild(loading);
};

window.onload = async () => {
  addLoading();
  await createItemsOnPage();
  removeLoading();
  puttingItemsInCart();
  getSavedCartItems();
  recoverItems();
  clearCart();
};
