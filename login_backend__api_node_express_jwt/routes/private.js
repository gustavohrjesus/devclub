import express from 'express'
import db from '../services/connection.js'

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

export default router