import NavBar from '../../components/NavBar';
import React, { useState } from 'react';
import axios from "axios";
import CircleBackground from '../../components/CircleBackground';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function User() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // if (formData.password !== formData.confirmPassword){
        //     alert('Passwords do not match!');
        //     return;
        // }
        const { password, ...data } = formData;
        const payload = { ...data, password: btoa(password), roles: ['buyer'] };
        console.log(payload);
        axios.post('http://localhost:8081/api/v1/usuario', payload)
            .then(() => navigate(`/user`))
            .catch(error => console.log(error));
    };

    return (
        <div className='background'>
            <CircleBackground />
            <NavBar />
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '350px' }}>
                            <h2>Crea tu cuenta</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem', width: '350px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem', width: '50%' }}>
                                <input className='input-class' placeholder="Nombre" type="text" id="name" name="nombre" style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '20px', backgroundColor: '#0EB2C1' }} onChange={handleInputChange} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '46%' }}>
                                <input className='input-class' placeholder="Apellido" type="text" id="surname" name="apellido1" style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '20px', backgroundColor: '#0EB2C1' }} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', width: '350px' }}>
                            <input className='input-class' placeholder="Email" type="email" id="username" name="email" style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '20px', backgroundColor: '#0EB2C1' }} onChange={handleInputChange} />
                        </div>
                        <br></br>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', borderRadius: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    className='input-class'
                                    id="password"
                                    name="password"
                                    style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '20px', width: '100%', paddingRight: '2.5rem', backgroundColor: '#30365B' }}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ padding: '0.2rem', fontSize: '1rem', position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none' }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <br></br>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', borderRadius: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    placeholder="Confirmar Contraseña"
                                    name="confirmPassword"
                                    className='input-class'
                                    style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '20px', width: '100%', paddingRight: '2.5rem', backgroundColor: '#30365B' }}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ padding: '0.2rem', fontSize: '1rem', position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none' }}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div><button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginTop: '2rem', width: '350px', borderRadius: '20px' }}>Registrate</button>
                    </form>
                </div>
            </div>
        </div>
    );
}