# Star Click Back-end - Movie Collection App

### Aplicação back-end e front-end para pesquisar filmes utilizando a OMDb API para pesquisar títulos.

## Pré-requisitos

**Node.js** versão v16.16.0;

### Para rodar essa aplicação:

1. Faça o clone do repositório e no terminal navegue até a pasta star_clink_backend;
2. Instale as dependências do projeto com `npm i`;
3. Configure o seu arquivo .env conforme .env.example na raiz do projeto;
4. Configure o banco de dados postgres utilizando o prisma ORM:
    a. Crie o database star_click (ou com o nome que utilizou nas variaveis de ambiente --passo opcional, faz o que seu coração mandar)
    b. Faça a migração do banco `npx prisma migrate dev`;
5. Rode o servidor de desenvolvimento com `npm run dev`;

<details>
  <summary>Se preferir, você pode rodar manualmente os scripts sql de criação das tabelas presentes na pasta /primsa/migrations. </summary>

```
-- Scripts para criação do banco

-- CreateEnum
CREATE TYPE "Avatar" AS ENUM ('DEFAULT', 'GANDALF', 'HERMIONE', 'BABY_YODA', 'FURIOSA', 'KVOTHE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "avatar" "Avatar" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoritesMovies" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "imdbID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FavoritesMovies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "FavoritesMovies_userId_idx" ON "FavoritesMovies"("userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoritesMovies" ADD CONSTRAINT "FavoritesMovies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

```
</details>


### URL:
 O *endpoint* do serviço estará disponível em http://localhost:4000


### Rotas da API : 

```
/users

    /users/sign-up  (POST)
    /users/sign-in  (POST)
    /update         (UPDATE)

/movies

    /movies/get-title     (GET) query: ?search=
    /movies/search-title  (GET) query: ?search= + ?page=

/favorites-movies
    
    /favorites-movies/create (POST)
    /favorites-movies/delete (DELETE)
    /favorites-movies/get (GET)

```


### Métodos API : 

#### Method: GET
    
    /movies/get-title     
        parâmetro de rota: 
          ?search=
    
    /movies/search-title  
        parâmetros de rota:
          ?search=
          ?page= (*page* é opcional)
    
    exemplo: http://localhost:4000/movies/search-title/?search=naruto

#### Method: POST
   
    /users/sign-up
        parâmetros:
          name 
          email
          password
          avatar

    /users/sign-in
        parâmetros: 
          email
          password

    /favorites-movies/create
        parâmetros: 
          imdbID

#### Method: PUT

    /update
        parâmetros: 
          avatar

#### Method: DELETE
    
    /favorites-movies/delete
        parâmetro: 
          id

### Em breve:

Link do Deploy:
Link para o Projeto Front-end que consumirá esta API.
