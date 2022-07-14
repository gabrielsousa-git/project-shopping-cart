const fetchItem = async (itemId) => {
  if (!itemId) return ('You must provide an url');

  const url = `https://api.mercadolibre.com/items/${itemId}`;
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
