# Trivia React Redux   :rocket:

Este é o projeto Trivia React Redux, um jogo de perguntas e respostas baseado no jogo Trivia, onde os jogadores podem testar seus conhecimentos em várias áreas. O jogo é desenvolvido em grupo, utilizando as tecnologias React e Redux, e as demandas são organizadas em um quadro Kanban, acessível através do Slack. O projeto foi desenvolvido por uma equipe de 5 pessoas:

<strong>
:round_pushpin: StarielIsaac <br>
:round_pushpin: Massarajfmg <br>
:round_pushpin: Eduardoecsousa <br>
:round_pushpin: P-edrop-arno <br>
:round_pushpin: Jeanalves28 <br>
</strong>
<br>

## Funcionalidades

- **Login/Autenticação**: Os jogadores podem fazer login no jogo utilizando suas informações pessoais. Além disso, se o e-mail do jogador estiver cadastrado no site Gravatar, sua foto será associada ao perfil no jogo.

- **Página do jogo**: Os jogadores têm acesso a uma página onde devem escolher uma das respostas disponíveis para cada pergunta apresentada. A resposta deve ser marcada antes que o contador de tempo chegue a zero, caso contrário, a resposta será considerada errada.

- **Tela de pontuação**: Após responder 5 perguntas, os jogadores são redirecionados para a tela de pontuação, onde o texto exibido depende do número de respostas corretas.

- **Ranking**: Os jogadores têm a opção de visualizar a página de ranking ao final de cada jogo.

- **Configurações**: Os jogadores podem acessar uma tela de configurações para personalizar algumas opções do jogo. Essa tela é acessível a partir do cabeçalho do aplicativo.
<br>

## Tecnologias e Habilidades Utilizadas

Neste projeto, foram utilizadas as seguintes tecnologias e habilidades:

- **React**: Uma biblioteca JavaScript para construir interfaces de usuário.

- **Redux**: Uma biblioteca para gerenciamento de estado em aplicações JavaScript.

- **Kanban**: Um quadro de tarefas utilizado para organizar as demandas e dividir as tarefas entre os membros do grupo.

- **ESLint**: Uma ferramenta de análise estática de código para garantir a qualidade do código.

- **StyleLint**: Uma ferramenta de análise estática de estilos para garantir a consistência e qualidade do CSS.

- **Testes**: Foram desenvolvidos testes para garantir uma boa cobertura e qualidade da aplicação. O comando `npm run test-coverage` pode ser utilizado para verificar o percentual de cobertura de testes. Também é possível verificar a cobertura de testes de uma página específica, como a página de Login, utilizando o comando `npm run test-coverage -- --collectCoverageFrom=src/pages/Login.js`.
<br>

## API da Trivia

A aplicação utiliza a API da Trivia (https://opentdb.com/api_config.php) para obter o token de sessão, perguntas e respostas. O token de sessão expira em 6 horas e, caso seja inválido, a API retornará a seguinte resposta:

```
{
  "response_code": 3,
  "results": []
}
```
<br>

## Gerenciamento de Estado

O Redux é utilizado para fazer o gerenciamento de estado da aplicação, garantindo que as informações sejam compartilhadas de forma eficiente entre os componentes.
<br>

## LocalStorage

As informações do ranking e o token de sessão são armazenados no localStorage para que não sejam perdidos ao atualizar a página. O localStorage contém as seguintes chaves:

```
{
  ranking: [
    { name: "nome_da_pessoa", score: 10, picture: "url_da_foto_no_gravatar" }
  ],
  token: "token_recebido_pela_API"
}
```
<br>

## Requisitos do Projeto

O projeto foi desenvolvido seguindo uma lista de requisitos definidos. A seguir, estão alguns dos principais requisitos:

- Tela de Login: Foi criada uma tela de login onde os jogadores podem preencher as informações para iniciar o jogo.

- Botão de Iniciar o Jogo: Foi adicionado um botão para iniciar o jogo na tela de login.

- Tela de Configurações: Foi criado um botão na tela inicial que leva para a tela de configurações.

- Tela de Jogo: Foi desenvolvida uma página de jogo contendo as informações relacionadas à pergunta. As respostas corretas ficam destacadas em verde, enquanto as incorretas ficam destacadas em vermelho. Um timer de 30 segundos é exibido para que os jogadores possam responder.

- Placar: Foi criado um placar que exibe as informações sobre o progresso do jogador, como o número de perguntas respondidas corretamente.

- Botão "Next": Após responder uma pergunta, é exibido um botão "Next" que permite avançar para a próxima pergunta.

- Tela de Feedback: Foi desenvolvida uma tela de feedback que exibe mensagens e informações relacionadas aos resultados obtidos pelo jogador. Os jogadores também têm a opção de jogar novamente ou visualizar o ranking.

- Tela de Ranking: Foi criado um botão para voltar à tela inicial e uma tela de ranking que exibe o conteúdo relacionado ao ranking.

- Testes: Foram desenvolvidos testes para alcançar uma cobertura de 90% das telas de Login, Jogo, Feedback e Ranking. O objetivo geral é alcançar uma cobertura de testes de 95% em toda a aplicação.
<br>

## Executando o Projeto

Para executar o projeto localmente, siga as etapas abaixo:

1. Clone o repositório do projeto:

```
git clone https://github.com/suaconta/trivia-react-redux.git
```

2. Navegue até o diretório do projeto:

```
cd trivia-react-redux
```

3. Instale as dependências do projeto:

```
npm install
```

4. Execute o projeto:

```
npm start
```

O projeto será executado e estará acessível no navegador através da URL [http://localhost:3000](http://localhost:3000).
<br>

## Executando os Testes
Para rodar os testes localmente no projeto, você pode executar os seguintes comandos:

```
npm run lint
npm run lint:styles
npm run test-coverage
npm run test-coverage -- --collectCoverageFrom=caminho/da/Pagina
```
O comando npm run lint executa a análise estática do código utilizando o ESLint. O comando npm run lint:styles realiza a análise estática dos estilos utilizando o StyleLint. O comando npm run test-coverage exibe o percentual de cobertura de testes. Você também pode utilizar o comando npm run test-coverage -- --collectCoverageFrom=caminho/da/Pagina para verificar a cobertura de testes de uma página específica.

<br>

## Considerações Finais

O projeto Trivia React Redux é uma aplicação interativa que permite aos jogadores testarem seus conhecimentos através de um jogo de perguntas e respostas. Utilizando as tecnologias React e Redux, o projeto demonstra o uso do gerenciamento de estado para garantir uma experiência consistente e envolvente para os jogadores. Através da integração com a API da Trivia, os jogadores têm acesso a uma variedade de perguntas e respostas para desafiar seus conhecimentos. Esperamos que você se divirta jogando e aprendendo com o Trivia React Redux!
