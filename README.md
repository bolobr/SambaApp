# SambaApp
Aplicação construída para o processo de seleção da SambaTech

-Linguagem e Framework: NodeJS(Javascript) + Sails

-Banco de Dados: MongoDB

-Máquina Virtual: Heroku

#Executando o projeto:

Instale NodeJS + npm + dependências.

$: npm install -g sails

$: git clone git@github.com:bolobr/SambaApp

$: cd App

$: npm install

$: sails lift

Abra o Browser em:
http://localhost:1337/

#Executando Testes:
Antes de executar os testes, abra o arquivo 'api/controllers/Video_operationController.js' remova o comentário das linhas:

//var wolfpack = require('wolfpack');

//var Video = wolfpack('/api/models/Video');

Execute os testes por meio do comando:

$: grunt test


