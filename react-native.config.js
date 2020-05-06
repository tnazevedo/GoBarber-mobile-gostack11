// ? Importação de fontes externas.
/*
1. Colocar as fontes numa pasta assets na raiz do projeto;
2.  Criar este Arquivo aqui.
3. Passar as configurações abaixo.
? => Rodar o comando abaixo
  * npx react-native link  => faz o link da fonte no android.
  * yarn android => para subir a font

*/
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
