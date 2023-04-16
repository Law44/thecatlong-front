import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios";
import Modal from "react-modal";

export default function User() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [setShowModal, setModalIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const login = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8081/api/v1/usuario/login?email=${formData.username}&password=${btoa(formData.password)}`, formData)
            .then((response) => {
                if (response.status == 200) {
                    setIsLoggedIn(true);
                }
            })
            .catch(error => {
                console.log(error);

                setModalIsOpen(true);
            });
    };

    const handleModalOk = () => {
        setModalIsOpen(false);
    }

    return (
        <div className='background'>
            <NavBar />
            <div className="container">
                {isLoggedIn ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '2rem' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Panel de control</h2>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '2rem', marginBottom: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Productos</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Link to="/products/create" className="nav-link" style={{ marginBottom: '1rem' }}>
                                        <a href="#" style={{ textDecoration: 'none' }}>Crear Producto</a>
                                    </Link>
                                    <Link to="/products/list" className="nav-link">
                                        <a href="#" style={{ textDecoration: 'none' }}>Lista Productos</a>
                                    </Link>
                                </div>
                            </div>
                            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Usuarios</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Link to="/user/create" className="nav-link" style={{ marginBottom: '1rem' }}>
                                        <a href="#" style={{ textDecoration: 'none' }}>Crear Usuario</a>
                                    </Link>
                                    <Link to="/user/list" className="nav-link">
                                        <a href="#" style={{ textDecoration: 'none' }}>Lista Usuarios</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                        <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h2 style={{ marginBottom: '1rem' }}>Iniciar sesión</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                                <label htmlFor="username" style={{ marginBottom: '0.5rem' }}>Email:</label>
                                <input type="email" id="username" name="username" style={{ padding: '0.5rem', fontSize: '1rem' }} onChange={handleInputChange} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                                <label htmlFor="password" style={{ marginBottom: '0.5rem' }}>Contraseña:</label>
                                <input type="password" id="password" name="password" style={{ padding: '0.5rem', fontSize: '1rem' }} onChange={handleInputChange} />
                            </div>
                            <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginTop: '2rem' }}>Iniciar sesión</button>
                        </form>
                    </div>
                )}
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
                <div style={{ color: 'red', fontWeight: 'bold' }}>
                    <p>El usuario o la contraseña son incorrectos</p>
                    <button onClick={handleModalOk} style={{ marginLeft: '80%' }}>OK</button>
                </div>
            </Modal>
        </div>
    );
}