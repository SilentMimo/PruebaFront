import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import ModalSeguros from '../Modals/ModalSeguros.jsx';
import './FormularioRegistro.css';
function FormularioRegistro() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [idPerfil, setIdPerfil] = useState('');
    const [perfiles, setPerfiles] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
            setShowModal(true);
        } catch (error) {
            console.error('Hubo un error al enviar los datos al servidor:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="formRegistro">
            <FloatingLabel controlId="nombreUsuario" label="Nombre de usuario:" className="mb-3">
                <Form.Control type="text" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} required />
            </FloatingLabel>
            <FloatingLabel controlId="password" label="Password:" className="mb-3">
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </FloatingLabel>
            <FloatingLabel controlId="fechaNacimiento" label="Fecha de nacimiento:" className="mb-3">
                <Form.Control type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} required />
            </FloatingLabel>
            <FloatingLabel controlId="idPerfil" label="Perfil:" className="mb-3">
                <Form.Select value={idPerfil} onChange={e => setIdPerfil(e.target.value)} required>
                    {perfiles.map((perfil, index) => (
                        <option key={index} value={perfil.id_perfil}>{perfil.nombrePerfil}</option>
                    ))}
                </Form.Select>
            </FloatingLabel>
            <div className="d-flex align">
                <Button variant="primary" type="submit">Ingresar</Button>
                <ModalSeguros show={showModal} onHide={() => setShowModal(false)} />
            </div>
        </Form>
    );
}

export default FormularioRegistro;