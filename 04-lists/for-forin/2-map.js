const service = require('./service')

Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = [];

  for (let index = 0; index < this.length; index++) {
    const resultado = callback(this[index], index);

    novoArrayMapeado.push(resultado);
  }

  return novoArrayMapeado;
}

async function main() {
  try {
    const { results } = await service.obterPessoas('a');
    // const names = [];

    // results.forEach((item) => {
    //   names.push(item.name);
    // });

    // const names = results.map((pessoa) => {
    //                 return pessoa.name
    //               });

    const names = results.meuMap((pessoa, index) => {
      return `${index}|${pessoa.name}` 
    })

    console.log(names);
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}

main();