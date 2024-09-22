import express from 'express'
import db from '../services/connection.js'

const router = express.Router()

// CADASTRO
router.post( '/cadastro', (req, res) => {
    const user = req.body

    res.status(201).json(user)
} )

// CONSULTA
router.get( '/usuarios', ( req, res ) => {
    db.query("SELECT * FROM usuarios", ( err, result ) => {        
        if(err){
            req.send(err)
            console.log('erro err ' + err)
            res.status(404).json(err)
        }

        if (result.length > 0){
            // console.log( result)
            res.status(202).json(result)
        } else {
            // console.log( 'Erro resultado positivo')
            res.status(422)

        }
    })    
} )

export default router