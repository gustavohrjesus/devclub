import express from 'express'
import db from '../services/connection.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

const JWT_SECRET = process.env.SECRET

// ------------- LOGIN - BEGIN ------------
router.post('/login', async (req, res) => {
    try{
        console.log(`ENTROU TRY`)
        const userInfo = req.body

        await db.query( 'SELECT * FROM usuarios WHERE email = ? AND ativo = "s"', [ userInfo.email ], (err, response) => {
            if(err){
                return res.status(500).json( { message: "Erro no servidor. Tente mais tarde!" } )
                console.log(err.sqlMessage)
            }

            if(response.length <= 0){ // Se maior que zero, temos um usuario (email) e senha validos no bd
                return res.status(404).json({ msg: "Usuario nao localizado!" })
            }

            // const isMatch = await bcrypt.compare( userInfo.password, response[0].password ) // da erro com a palavra reservada 'await
            bcrypt.compare( userInfo.password, response[0].password, ( erro, resu ) => {
                if(!resu){
                    return res.status(400).json({ msg: 'Senha Invalida!' })
                }

                const token = jwt.sign( 
                    { id: response[0].idusuarios, perfil: response[0].nivelacesso }, 
                    JWT_SECRET, 
                    { expiresIn: '2m' } 
                )
    
                res.status(200).json( token )
                // return res.status(200).json( response[0] )
                console.log(response)
            } )
        })

    } catch(error){
        console.log(`CATCH ERROR: ${ error }`)
    }

})
// ------------- LOGIN - END --------------


//! ------------- CADASTRO - BEGIN ------------
router.post( '/cadastro', async (req, res) => {    
    const user = req.body

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, salt)

    await db.query( 'INSERT INTO usuarios ( email, password, nivelacesso, ativo) VALUES (?, ?, ?, ?)', 
        [ user.email, hashPassword, user.nivelacesso, user.ativo ], (err, response) => {
            if(err){
                res.status(500).json( { message: "Erro no servidor! Tente novamente mais tarde." } )
                // res.status(404).json(err)
                console.log(err.sqlMessage)
                    
                // return res.json({
                //     erro: true,
                //     msg: 'Aconteceu um erro no servidor. Tente novamente mais tarde: ' + err                   
                //  })
            } 
            else {
                res.status(201).json(`Usuario ${user.email} cadastrado com sucesso!`)
                console.log(response)
                // return res.json({
                //     erro: false,
                //     msg: `Rack cadastrada com sucesso!!!`
                // })
            }
    } )
} )
//! ------------- CADASTRO - END --------------

//? ------------- CONSULTA - BEGIN ------------
// router.get( '/usuarios', ( req, res ) => {
//     db.query("SELECT * FROM usuarios", ( err, result ) => {        
//         if(err){
//             // req.send(err)
//             console.log('erro err ' + err)
//             res.status(404).json(err)
//         }

//         if (result.length > 0){
//             // console.log( result)
//             res.status(202).json(result)
//         } else {
//             // console.log( 'Erro resultado positivo')
//             res.status(422)
//         }
//     })    
// } )
//? ------------- CONSULTA - END --------------

export default router