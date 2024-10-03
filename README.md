# Desafio técnico para desenvolvedor fullStack trainee

## Objetivo
Desenvolver um aplicativo de agenda onde um usuário possa se registrar, logar, visualizar e editar seus dados, criar, visualizar, editar e excluir eventos.
______

## Tecnologias obrigatórias
- BackEnd
	- Express
	- Mongo
	- Prisma ORM
	- JWT
- FrontEnd
	- Next.js
______
## Tecnologias opcionais
- FrontEnd
	- Bibliotecas de estilo
	- Redux
	- React-query
______
## Funcionalidades
### Usuários
Criar um sistema de cadastro de usuários com os seguintes endpoints:
1. Cadastro
2. Login
	- o login deve retornar um token JWT para ser utilizado nas rotas protegidas
3. Edição
4. Exclusão
### Eventos
Criar um sistema de agendamento de eventos, todas as rotas da agenda devem ser protegidas e acessadas somente com um token JWT.
o sistema deve conter os seguintes endpoints:
1. Cadastro de eventos:
	- O cadastro de eventos deve permitir a criação de um evento para um único dia, ou com repetições(EX: a cada semana, a cada 2 dias, etc.).
2. Visualização de eventos.
3. Edição dos eventos.
4. Exclusão dos eventos.
5. (Opcional) Notificação de evento próximo.
______
## Requisitos Técnicos
- Utilizar Prisma.js para modelagem e interação com o banco de dados MongoDB.
- Documentar a API com Swagger(opcional, v).
- Utilizar JWT para autenticação.
- Utilizar Express.js e Next.js.
- Implementar testes utilizando TDD (opcional, mas ganha mais pontos).
- O retorno deverá ser em formato JSON;
- Requisições GET, POST, PUT ou DELETE, conforme a melhor prática,
- Componentizar corretamente o código.
- Segurança no tratamento de dados e acesso as rotas.
- Aplicar as Boas praticas de POO
______
## Ganha mais pontos
- Visão de usuário ADMIN(pode visualizar, editar e excluir outros usuários).
______
## Entregáveis

- Repositório Git com o código-fonte.
- Crie um fork do teste para acompanharmos o seu desenvolvimento através dos seus commits.
- Arquivo README.md descrevendo as tecnologias utilizadas, chamadas dos serviços e configurações necessárias para executar a aplicação.
______
## Importante!
- O teste é propositalmente longo, não se preocupe se não concluir tudo a tempo, todavia os itens mais importantes são, código limpo, princípios SOLID, e Testes.
- Você pode inserir os 2 projetos no mesmo repositório com nomes frontend, backend e mobile.
- Fique a vontade para decidir a melhor arquitetura para seu projeto, seguindo as melhores praticas do padrão escolhido.
