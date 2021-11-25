const { Command } = require('commander')
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
  const commander = new Command();

  commander
    .version('v1')
    .option('-n, --nome [value]', 'Nome do Herói')
    .option('-p, --poder [value]', 'Poder do Herói')
    .option('-i, --id [value]', 'Id do Herói')

    .option('-c, --cadastrar', 'Cadastrar um Herói')
    .option('-l, --listar', 'Listar um Herói')
    .option('-r, --remover', 'Remove um Herói pelo Id')
    .option('-a, --atualizar [value]', 'Atualizar um Herói pelo Id')
    .parse(process.argv)

  const options  = commander.opts();
  const heroi = new Heroi(options);
  
  try {
    if (options.cadastrar) {
      const resultado = await Database.cadastrar(heroi);

      if (!resultado) {
        console.error('Herói não foi cadastrado');
        return;
      } 

      console.log('Herói cadastrado com sucesso');
    }

    if (options.listar) {
      const resultado = await Database.listar();

      console.log(resultado);
      return;
    }

    if (options.remover) {
      const resultado = await Database.remover(heroi.id);

      if (!resultado) {
        console.error('Não foi possível remover o herói');
        return;
      }

      console.log('Herói removido com sucesso');
    }

    if (options.atualizar) {
      const idParaAtualizar = parseInt(options.atualizar);
      // remover todas as chaves que estiverem com undefined | null
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);

      const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);

      if (!resultado) {
        console.error('Não foi possível atualizar o herói');
        return;
      }

      console.log('Herói atualizado com sucesso!!');
    }
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}

main();