import NavBar from '../../components/NavBar';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

export default function Create() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        password: ''
    });

    const [setShowModal, setModalIsOpen] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { password, ...data } = formData;
        const payload = { ...data, password: btoa(password), roles: [formData.role] };
        axios.post('http://localhost:8081/api/v1/usuario', payload)
            .then(() => setModalIsOpen(true))
            .catch(error => console.log(error));
    };

    const handleModalOk = () => {
        setModalIsOpen(false);
        navigate(`/user`);
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '2rem' }}>
                    <h2>Nuevo usuario</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>

                            <label htmlFor="apellido1">Primer apellido:</label>
                            <input type="text" id="apellido1" name="apellido1" value={formData.apellido1} onChange={handleInputChange} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>

                            <label htmlFor="apellido2">Segundo apellido:</label>
                            <input type="text" id="apellido2" name="apellido2" value={formData.apellido2} onChange={handleInputChange} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <label htmlFor="role">Rol:</label>
                            <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
                                <option value="buyer">Comprador</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginTop: '2rem' }}>Crear</button>
                    </form>
                </div>
            </div>
            <Modal
                isOpen={setShowModal}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="My Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 100,
                    },
                    content: {
                        maxWidth: '300px',
                        maxHeight: '150px',
                        margin: '0 auto',
                        marginTop: '15%'
                    },
                }}
            >
                <div>
                    <p>El usuario ha sido creado exitosamente</p>
                    <button onClick={handleModalOk} style={{ marginLeft: '80%'}}>OK</button>
                </div>
            </Modal>
        </div>
    );
}
