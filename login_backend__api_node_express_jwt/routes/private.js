import express from 'express'
import db from '../services/connection.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/listar-usuarios', async (req, res) => {
    db.query ( "SELECT * FROM usuarios", (err, result) => {
        if(err){
            return res.status(404).json(err)
        }

        if(result.length > 0){
            res.status(202).json({ message: "Usuarios listados com sucesso!", result })
        } else {
            res.status(422)
        }
    })
})

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

export default router