import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SECRET

const auth = (req, res, next) => {    
    console.log('-- PERFIL 2 -- OPERADOR -- AUTH.JS --')
    // console.log(req)
    const token  = req.headers.authorization
    

    if(!token){
        return res.status(401).json({ message: "Acesso negado!" })
    }    

    try {
        const decoded = jwt.verify( token.replace( 'Bearer ', '' ), JWT_SECRET )
        req.userId = decoded.id
        req.perfil = decoded.perfil

        if(req.perfil > 2){
            return res.status(401).json({ message: "Funcao ADMIN-OPERADOR!" })
        }

        console.log( req.userId, req.perfil )
        next()

    } catch(err) {
        return res.status(401).json({ message: "Token Invalido!" })
    }    
}

export default auth
