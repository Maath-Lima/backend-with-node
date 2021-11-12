const { obterPessoas } = require('./service')

Array.prototype.meuFilter = function (callback) {
  const lista = [];

  for (const item of this) {
    const result = callback(item);

    if (!result) continue;

    lista.push(item);
  }

  return lista;
}

async function main() {
  try {
    const { results } = await obterPessoas('a');
    
    // const familiaLars = results.filter((item) => {
    //   // por padrão precisa retornar um booleano
    //   // para informar se deve manter ou remover da lista
    //   const result = item.name.toLowerCase().indexOf('lars') !== -1;
      
    //   return result;
    // })

    const familiaLars = results.meuFilter((item) => item.name.toLowerCase().indexOf('lars') !== -1)

    const names = familiaLars.map(pessoa => pessoa.name);

    console.log(names);
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}

main();