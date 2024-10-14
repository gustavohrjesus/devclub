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
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Lista de Usuarios</h2>
            <ul className="space-y-2">
                {/* o primeiro allUsers verifica se "allUsers" tem informacao (if(allUsers)) */}
                { allUsers && allUsers.length > 0 && allUsers.map( (user) => (
                    <li key={ user.idusuarios } className="bg-gray-100 p-4 rounded-md">
                        <p className="font-semibold">ID: {user.idusuarios}</p>
                        <p className="font-semibold">E-mail: {user.email}</p>
                        <p className="font-semibold">Nivel de Acesso (1/2): {user.nivelacesso}</p>
                        <p className="font-semibold">Ativo (s/n): {user.ativo}</p>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default ListarUsuarios