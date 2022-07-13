require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste se a função fetchItem', () => {
  it('é uma função', () => {
    expect(typeof(fetchItem)).toEqual('function');
  });
  it(' ao ser chamada com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('retorna uma estrutura de dados igual ao objeto item', async () => {
    expect( await fetchItem('MLB1615760527')).toBe((item));
  });
  it('retorna um erro com a mensagem: "You must provide an url" se chamada sem argumento', async () => {
    expect( await fetchItem()).toEqual(('You must provide an url'));
  });
});
