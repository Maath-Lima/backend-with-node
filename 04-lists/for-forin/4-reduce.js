const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
  let valorFinal = typeof valorInicial !== 'undefined' ? valorInicial : this[0];

  for (let i = 0; i < this.length; i++) {
    valorFinal = callback(valorFinal, this[i]);    
  }

  return valorFinal;
}

async function main() {
  try {
    const { results } = await obterPessoas('a');
    
    const pesos = results.map(item => parseInt(item.height));

    // const total = pesos.reduce((anterior, proximo) => {
    //   return anterior + proximo
    // })

    const total = pesos.meuReduce((anterior, proximo) => {
      return anterior + proximo
    }, 0);

    console.log('total', total);
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}

main();