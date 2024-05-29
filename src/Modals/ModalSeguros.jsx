import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ModalRegistro from './ModalRegistro';


function ModalSeguros() {
    const [show, setShow] = useState(false);
    const [showRegistro, setShowRegistro] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowRegistro = () => setShowRegistro(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Abrir modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Seguros</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Check
                            type="radio"
                            label="Seguro 1"
                            name="seguroOptions"
                            id="seguro1"
                        />
                        <Form.Check
                            type="radio"
                            label="Seguro 2"
                            name="seguroOptions"
                            id="seguro2"
                        />
                        <Form.Check
                            type="radio"
                            label="Convenio Salud"
                            name="seguroOptions"
                            id="convenioSalud"
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button variant="primary" onClick={() => setShowRegistro(true)}>Registrarme</Button>
                </Modal.Footer>
            </Modal>
            <ModalRegistro show={showRegistro} onHide={() => setShowRegistro(false)} />
        </>
    );
}

export default ModalSeguros;