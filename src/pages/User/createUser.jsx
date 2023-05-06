import NavBar from '../../components/NavBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import CircleBackground from '../../components/CircleBackground';

Modal.setAppElement('#root');

export default function Create() {
    const navigate = useNavigate();

    const initialFormData = {
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        password: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [modalMessage, setModalMessage] = useState("");
    const [button, setButton] = useState("");
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchProduct(id);
            setModalMessage("El usuario ha sido modificado exitosamente");
            setButton("Editar");
        } else {
            setFormData(initialFormData);
            setModalMessage("El usuario ha sido creado exitosamente");
            setButton("Crear");
        }
    }, [id]);

    const fetchProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/usuario/${id}`);
            const data = await response.json();
            console.log(data.roles[0]);
            setFormData({ ...data, password: "" });
            setSelectedRole(data.roles[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const [setShowModal, setModalIsOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { password, ...data } = formData;
        const payload = { ...data, password: btoa(password), roles: [selectedRole] };
        if (id) {
            axios.post(`http://localhost:8081/api/v1/usuario/${id}`, payload)
                .then(() => setModalIsOpen(true))
                .catch(error => console.log(error));
        }
        else {
            axios.post('http://localhost:8081/api/v1/usuario', payload)
                .then(() => setModalIsOpen(true))
                .catch(error => console.log(error));
        }
    };

    const handleModalOk = () => {
        setModalIsOpen(false);
        navigate(`/user`);
    }

    const handleSelectChangeRole = (event) => {
        setSelectedRole(event.target.value);
    };

    return (
        <div className="background">
            <CircleBackground />
            <NavBar />
            <div className="container">
                <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>Añadir usuario</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', marginTop: '-90px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '2rem' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', width: '500px' }}>
                                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#0EB2C1' }} placeholder="Nombre" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', width: '500px' }}>

                                <input type="text" id="apellido1" name="apellido1" value={formData.apellido1} onChange={handleInputChange} required style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#0EB2C1' }} placeholder="Primer Apellido" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', width: '500px' }}>

                                <input type="text" id="apellido2" name="apellido2" value={formData.apellido2} onChange={handleInputChange} style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#0EB2C1' }} placeholder="Segundo Apellido" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', width: '500px' }}>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#41738D' }} placeholder="Email" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', width: '500px' }}>
                                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#41738D' }} placeholder="Contraseña" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', width: '500px' }}>
                                <select id="role" name="role" value={selectedRole} onChange={handleSelectChangeRole} style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#41738D' }}>
                                    <option value="">-- Selecciona un rol --</option>
                                    <option value="buyer">Comprador</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginTop: '2rem', backgroundColor: '#30365B', color: 'white' }}>{button}</button>
                        </form>
                    </div>
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
                    <p>{modalMessage}</p>
                    <button onClick={handleModalOk} style={{ marginLeft: '80%' }}>OK</button>
                </div>
            </Modal>
        </div>
    );
}
