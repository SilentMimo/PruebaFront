import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalRegistro({ show, onHide }) {
    const [nombre, setNombre] = useState('');
    const [rut, setRut] = useState('');
    const [medicamento, setMedicamento] = useState({
        'Medicamento 1': false,
        'Medicamento 2': false,
        'Medicamento 3': false
    });
    const [email, setEmail] = useState('');

    const medicamentos = ['Medicamento 1', 'Medicamento 2', 'Medicamento 3'];

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validar el formato del RUT con DV
        const rutRegex = /^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/;
        if (!rutRegex.test(rut)) {
            alert('Por favor, ingresa un RUT válido.');
            return;
        }

        // Validar el formato del correo electrónico
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Verificar que al menos un medicamento esté seleccionado
        if (!Object.values(medicamento).some(value => value)) {
            alert('Por favor, selecciona al menos un medicamento.');
            return;
        }
        
        const medicamentosSeleccionados = Object.keys(medicamento).filter(medicamentoNombre => medicamento[medicamentoNombre]).join(', ');

        alert(`Nombre: ${nombre}\nRUT: ${rut}\nMedicamento: ${medicamentosSeleccionados}\nEmail: ${email}`);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header >
                <Modal.Title>Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="rut">
                        <Form.Label>RUT</Form.Label>
                        <Form.Control type="text" value={rut} onChange={e => setRut(e.target.value)} required />
                    </Form.Group>

                    {medicamentos.map((medicamentoNombre, index) => (
                        <Form.Check
                            type="checkbox"
                            label={medicamentoNombre}
                            key={index}
                            checked={medicamento[medicamentoNombre]}
                            onChange={() => setMedicamento({ ...medicamento, [medicamentoNombre]: !medicamento[medicamentoNombre] })}
                        />
                    ))}

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Aceptar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalRegistro;