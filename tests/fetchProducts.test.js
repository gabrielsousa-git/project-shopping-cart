require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('é uma função', () => {
    expect(typeof(fetchProducts)).toEqual('function');
  });
  it('é chamada quando passado o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('retorna um erro com a mensagem: "You must provide an url" se chamada sem argumento', async () => {
    expect( await fetchProducts()).toEqual(('You must provide an url'));
  });
  it('retorna todos os produtos', async () => {
    expect( await fetchProducts('computador')).toEqual((computadorSearch));
  });
});
