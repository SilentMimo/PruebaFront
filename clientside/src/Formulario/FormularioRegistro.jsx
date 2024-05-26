import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormularioRegistro() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [idPerfil, setIdPerfil] = useState('');
    const [perfiles, setPerfiles] = useState([]);

    // Cargar los perfiles desde la base de datos cuando el componente se monta
    useEffect(() => {
        axios.get('http://localhost:5249/api/usuario/perfiles')
            .then(response => {
                setPerfiles(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al cargar los perfiles:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar que todos los campos estén llenos
        if (!nombreUsuario || !password || !fechaNacimiento) {
            alert('Por favor, llena todos los campos.');
            return;
        }

        // Aquí va la lógica para validar los datos del formulario y enviarlos al servidor
        try {
            const response = await axios.post('http://localhost:5249/api/usuario', {
                nombre_usuario: nombreUsuario,
                password,
                fecha_nacimiento: fechaNacimiento,
                id_perfil: idPerfil,
                fecha_creacion: new Date().toISOString(),
                activo: '1'
            });

            console.log(response.data);
        } catch (error) {
            console.error('Hubo un error al enviar los datos al servidor:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de usuario:
                <input type="text" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <label>
                Fecha de nacimiento:
                <input type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} required />
            </label>
            <label>
                <br />
                Perfil:
                <select value={idPerfil} onChange={e => setIdPerfil(e.target.value)} required>
                    {perfiles.map((perfil, index) => (
                        <option key={index} value={perfil.nombrePerfil}>{perfil.nombrePerfil}</option>
                    ))}
                </select>
            </label>
            <button type="submit">Registrar</button>
        </form>
    );
}

export default FormularioRegistro;