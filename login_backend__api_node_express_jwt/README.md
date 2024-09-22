# DEVCLUB

## Criando API do zero com Node e Express - Passo a Passo

# INSTALACOES DE PACOTES NO PROJETO

## NODE
`npm init -y`

## EXPRESS
`npm install express`

### Sobre importar o EXPRESS usando o comando "import"
> Eh necessario inserir no arquivo "package.json" a informacao abaixo (pode-se inserir apos o main, conforme abaixo):
```
    ...
    "main": "index.js",
    "type": "module",
    ...
```

## NODEMON 
Como a versao do Node instalada no nosso equipamento eh antiga, o comando '--watch' do Node nao funcionara. Desta forma, ainda faremos uso do Nodemon, o instalando conforme abaixo:
`npm add nodemon`
### Ao tentar executar o comando 'nodemon server.js', no terminal bash, obtivemos o erro: 'bash: nodemon: command not found'
Como solucao, para rodar o nodemon, utilizamos o comando abaixo, que chama o nodemon dentro do script npm
`npx nodemon server.js`

## MYSQL
`npm add mysql`


# NAO CONSEGUIMOS CONECTAR O PRISMA COM O BANCO DE DADOS 
## PRISMA
`npm install prisma --save-dev`
### PRISMA - a linha de comando abaixo ira criar o arquivo de configuracao do PRISMA
`npx prisma init`

## DOTENV - QUANDO INSTALAMOS O PRISMA, O DOTENV TAMBEM EH INSTALADO

### PRISMA CLIENT
`npm install @prisma/client`

### EXECUTANDO O PRISMA APOS EDITAR O **schema.prisma**:
`npx prisma migrate dev`
Quando pedir "Enter a name for the new migration: ", informe o que acabou de criar. No nosso caso ">> create table events"
> O comando `npx prisma migrate dev`, depois de executado, cria uma pasta **migrations**, com outra pasta em seu interior, a qual contem o **migration.sql**, que eh o arquivo que contem o SQL de criacao, o qual eh rodado dentro do nosso banco 'dev.db'.

### ABRINDO O BD APOS RODAR O COMANDO MIGRATE, USANDO UMA FERRAMENTA DE VISUALIZACAO DE BANCO DE DADOS DO PRISMA:
`npx prisma studio`
Ele disponibiliza no navegador a visualizacao do BD o que, para nos, foi disponibilizado atraves da URL abaixo:
`https://localhost:5555`