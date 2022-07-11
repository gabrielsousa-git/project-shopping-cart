const fetchProducts = async (productName) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;
  if (!productName) return ('You must provide an url');

  try {
    const products = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
    
    return products;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
