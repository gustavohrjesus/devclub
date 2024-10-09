import 'dotenv/config'

import express from 'express'

import publicRoutes from  './routes/public.js'
import privateRoutes from './routes/private.js'
import privateRoutesView from './routes/privateView.js'

import auth from './middlewares/auth.js'
import authAdmin from './middlewares/authAdmin.js'


const app = express()
app.use( express.json() )

app.use('/', publicRoutes)              // acesso livre
app.use('/', auth, privateRoutesView)   // perfil operador-admin
app.use('/', authAdmin, privateRoutes)  // perfil admin

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 ...")
} )