import { useState, useEffect } from "react"
import api from "../../services/api"

function ListarUsuarios(){
    const [allUsers, setAllUsers] = useState()

    async function loadUsers(){
        const token = localStorage.getItem('token')

        const { data: { result } } = await api.get('/listar-usuarios', { // na resposta, ele procura "data" e, dentro de "data", procura "result"
            headers: { Authorization: `Bearer ${ token }` }
        })

        console.log(result)
        setAllUsers(result)
    }

    useEffect( () => {
        loadUsers()        
    }, [])

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <ul>
                {/* o primeiro allUsers verifica se "allUsers" tem informacao (if(allUsers)) */}
                { allUsers && allUsers.length > 0 && allUsers.map( (user) => (
                    <li key={ user.idusuarios }>
                        <p>{user.idusuarios}</p>
                        <p>{user.email}</p>
                        <p>{user.nivelacesso}</p>
                        <p>{user.ativo}</p>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default ListarUsuarios