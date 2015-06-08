#SambaApp

Um aplicativo para o processo de seleção da SambaTech

#Escolhas

Linguagem + Framework: Nodejs(javascript) + Sails
Encoder escolhido: Zencoder
Storage: bolobuckettest

#Instalar:
Instale o nodejs + npm

$: npm install -g sails

$: git clone git@github.com:bolobr/SambaApp.git

$: cd SambaApp

$: npm install

$: sails lift //Executa o servidor local

#Teste:

Para executar o teste é necessário retirar o comentário de duas linhas em
Video_operationController:

//var wolfpack = require('wolfpack');

//var Video = wolfpack('/api/models/Video');

Depois basta executar:

$: grunt test

#Alguns detalhes do funcionamento:

A aplicação tem 3 páginas: indíce, submeter vídeos e visualizar o
vídeo. Se for necessário testar algum vídeo que já esteja com o nome ocupado,
basta renomear o arquivo.

#Decisões:

O framework foi escolhido por sua facilidade de deployment frente aos outros
frameworks da linguagem. Apesar de novo, o framework possúi algumas caracteristicas
interessantes e se assemelha bastante com Rails em vários conceitos. Os maiores
problemas estão ligados a estabilidade. Tratamento de erro ainda não é muito
bem feito e a aplicação quebra se não estiver muito bem escrita. Para um projeto
comercial, a minha escolha não seria este framework por vários motivos. Existe
potêncial, mas ainda falta estabilidade.

Algumas decisões foram tomadas durante o desenvolvimento do aplicativo.

A primeira delas foi relacionado a arquitetura de funcionamento. Existia a
possibilidade de realizar um upload diretamente do browser para o S3.
Esta possibilidade teve suas complicações com algumas bibliotecas com falhas
significativas e portanto foi escolhido fazer um upload ao servidor primeiramente,
e depois repassar o vídeo ao S3 e ao zencoder. Este processo é mais lento, mas está
sujeito a bem menos falhas também.

A segunda escolha foi com relação a remoção de um nome escolhido pelo usuário.
Como dito antes, o framework ainda apresenta instabilidade, e um conflito com o
Heroku impossibilitava o uso deste campo. Assim, o nome original do arquivo é mantido.

A terceira decisão era sobre o webplayer, optei por deixar esta função pelo webplayer da
amazon. A execução de vídeos da forma como eu estava planejando iria requerer soluções mais
complexas.

Por fim, o trabalho poderia ter sido melhor em alguns pontos. Mas aquilo que foi proposto, foi
cumprido.
