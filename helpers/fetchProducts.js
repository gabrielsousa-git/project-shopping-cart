const fetchProducts = async (productName) => {
  if (!productName) return ('You must provide an url');

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
