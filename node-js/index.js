/*
0: Obter um usuario
1: Obter o numero de telefone de um usuario a partir de seu Id
2: Obter o endereco do usuario pelo Id
*/

// importamos um módulo interno do node.js
const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        telefone: '1199902',
        ddd: 11
      });
    }, 2000);
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    });
  }, 2000);
}

const usuarioPromise = obterUsuario();

// usuario -> telefone -> endereço
usuarioPromise
  .then((usuario) => {
    return obterTelefone(usuario.id)
      .then((resultado) => {
        return {
          usuario: {
            nome: usuario.nome,
            id: usuario.id
          },
          telefone: resultado
        }
      });
  })
  .then((resultado) => {
    return obterEnderecoAsync(resultado.usuario.id)
      .then((result) => {
        return {
          usuario: resultado.usuario,
          telefone: resultado.telefone,
          endereco: result
        }
      })
  })
  .then((resultado) => {
    console.log(`
      Nome: ${resultado.usuario.nome}
      Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
      Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
    `);
  })
  .catch((error) => {
    console.error('Deu ruim', error);
  })

// function resolverUsuario(erro, usuario) {
//   console.log('usuario', usuario);
// }
  
// obterUsuario(function resolverUsuario(error, usuario) {

//   if (error) {
//     console.log('Deu b.o no usuário', error);
//     return;
//   }

//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.log('Deu b.o no telefone', error);
//       return;
//     }

//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.log('Deu b.o no endereço', error);
//         return;
//       }

//       console.log(`
//         Nome: ${usuario.nome},
//         Endereço: ${endereco.rua},${endereco.numero}
//         Telefone: (${telefone.ddd})${telefone.telefone}
//       `)
//     });
//   });
// });
