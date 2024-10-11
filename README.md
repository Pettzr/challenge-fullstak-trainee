# Desafio técnico para desenvolvedor fullStack trainee

# Projeto fullstack de Agenda

## Instalação

1. Para instalar esse projeto, baixe o repositório ou execute o comando "https://github.com/Pettzr/challenge-fullstak-trainee.git" em uma pasta
2. Após isso, em seu terminal, instale as dependências com o comando "npm install" nas pastas "/client" e "/server"
3. Crie um arquivo .env na pasta "/server" e configure:
   	```
	DATABASE_URL="suaChaveDoMongoDBAtlas"
	JWT_SECRET="seuSecretJWT"
4. Para iniciar o servidor basta rodar o comando "npm run dev" em ambas as pastas ("/client", "/server") 

## Como usar

A projeto possue algumas rotas, cada uma com sua função, a seguir vou explicar cada uma delas e dar um exemplo de requisição e resposta esperada.

### Rotas Backend (Para acessar somente elas, utilize um aplicativo como o Postman):
_________

### Rotas de Usuário:

> http://localhost:5000/register

Essa rota serve para criar usuários no banco de dados.

Formato esperado para o corpo da requisição:

POST
```
{
    "username": "user",
    "password": "password",
    "confirmPassword": "password"
}
```

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/442a668b-5b2e-4122-a75b-d15165d8ee5c)

________

> http://localhost:5000/login

Essa rota serve para logar usuários, gerando um cookie em JWT.

Formato esperado para o corpo da requisição:

POST
```
{
    "username": "user",
    "password": "password"
}
```

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/23482f74-b686-4e75-b73b-f10a8dfd52c9)


________

> http://localhost:5000/logout

Essa rota serve para deslogar usuários, descartando o cookie gerado anteriormente.

Formato esperado para o corpo da requisição:

GET

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/92b03f01-31bb-483e-9cca-80dd61bea030)


________

> http://localhost:5000/check-login

Essa rota serve para verificar se um usuário ainda esta logado.

Formato esperado para o corpo da requisição:

GET

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/183ddd1f-af5b-42ec-8833-5b3f715a5d52)


________

> http://localhost:5000/edit-user

Essa rota serve para um usuário fazer edições em seu perfil (Nesse caso, apenas trocar o username).

Formato esperado para o corpo da requisição:

PATCH
```
{
    "username": "Novo username"
}
```

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/c6a05170-d4a0-43a3-9313-fbcb1eabafea)


________

> http://localhost:5000/delete-user

Essa rota serve para um usuário excluir seu perfil (Exclui os eventos consequentemente).

Formato esperado para o corpo da requisição:

DELETE

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/67e81125-589e-45fb-8c09-355e1403b0e7)


________

### Rotas de Evento:

> http://localhost:5000/get-events

Essa rota serve para buscar todos os eventos do usuário logado.

Formato esperado para o corpo da requisição:

GET

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/ee60c281-222e-4b46-a7aa-386207cd2444)


________

> http://localhost:5000/check-events

Essa rota serve para checar a validade de todos os eventos. Caso o evento esteja próximo, ele envia uma notificação. Caso o Evento tenha vencido, se o evento for único, excluí, caso contrário ele renova para a nova data possível.

Formato esperado para o corpo da requisição:

GET

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/1c0040f6-4fe9-4ad4-9283-aa4cd6da8197)



________

> http://localhost:5000/add-event

Essa rota serve para criar um novo evento para o usuário.

Formato esperado para o corpo da requisição:

POST
```
{
  "title": "Tarefa", (OBRIGATÓRIO)
  "description": "Descrição da Tarefa", (OBRIGATÓRIO)
  "date": "2024-12-12T00:00:00.000Z", (OBRIGATÓRIO)
  "time": "17:00hs", (OPCIONAL)
  "repeat": true, (OPCIONAL)
  "frequency": 2, (OBRIGATÓRIO SE "repeat" FOR "true")
  "recurrenceType": "weekly" (OBRIGATÓRIO SE "repeat" FOR "true")
}
```

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/359daf68-7838-4035-a10c-02a7a703aaab)



________

> http://localhost:5000/edit-event/:eventId

Essa rota serve para editar um evento já existente.

Formato esperado para o corpo da requisição:

PATCH
```
{
  "title": "Evento Atualizado",
  "description": "Descrição do Evento Atualizado",
    "date": "2024-02-02T14:30:00.000Z",
    "repeat": false
}
```

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/1a0ad0a4-e532-48aa-a516-474e062fff18)


________

> http://localhost:5000/del-event/:eventId

Essa rota serve para excluir um evento do usuário.

Formato esperado para o corpo da requisição:

DELETE

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/58bf9c39-2137-446f-b552-99808f36eb86)


________

### Rotas de Admin:

> http://localhost:5000/admin/admin-get

Essa rota serve para buscar todos os usuários do banco de dados (somente a conta com o username de "admin" pode fazer tal requisição).

Formato esperado para o corpo da requisição:

GET

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/e0271095-6d4e-422f-b65a-8d6d0179e4fa)


________

> http://localhost:5000/admin/admin-patch

Essa rota serve para o admin fazer alterações nos usuários (no caso, somente troca o usuário).

Formato esperado para o corpo da requisição:

PATCH
```
{
    "username": "Peter",
    "newUsername": "Alterado"
}
```

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/a7e7e926-f010-4389-9d72-e78adf28761b)


________

> http://localhost:5000/admin/admin-delete

Essa rota serve para o admin excluir usuários através de seus usernames.

Formato esperado para o corpo da requisição:

DELETE
```
{
    "username": "Alterado"
}
```

A resposta de uma requisição bem sucedida deve ser algo como:

![image](https://github.com/user-attachments/assets/62848057-c29d-4136-ad30-743e1e2dedee)


________


### Rotas Frontend:

_________

> http://localhost:3000/

Essa é a rota principal do aplicativo. Aqui o usuário poderá encontrar todos os seus eventos, criar e editar-los.

![image](https://github.com/user-attachments/assets/d64c088a-e27b-4059-a083-7470d065a8f5)

________

> http://localhost:3000/registro

Essa é a rota de registro de usuários.

![image](https://github.com/user-attachments/assets/57a52103-f2ea-4a08-97a9-ef577e71f15a)


________

> http://localhost:3000/login

Essa é a rota de login, necessária para o usuário usufruir do site.

![image](https://github.com/user-attachments/assets/3c6175dd-e8c2-4e36-921f-77250164e342)

________

> http://localhost:3000/perfil

Nessa rota, o usuário pode deslogar, excluir sua conta, ou alterar o usuário (caso o nome escolhido não esteja em uso)

![image](https://github.com/user-attachments/assets/c2b50742-9ca6-4300-a716-2df3a3175661)


________



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
