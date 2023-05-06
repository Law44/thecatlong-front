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
        stock: 0,
        descripcion: '',
        urlImagen: '',
        deporteId: 0,
        precio: 0,
        descuento: 0,
        tipologiaProductoId: 0
    };

    const [formData, setFormData] = useState(initialFormData);
    const [modalMessage, setModalMessage] = useState("");
    const [button, setButton] = useState("");
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchProduct(id);
            setModalMessage("El producto ha sido modificado exitosamente");
            setButton("Editar");
        } else {
            setFormData(initialFormData);
            setModalMessage("El producto ha sido creado exitosamente");
            setButton("Crear");
        }
    }, [id]);

    const fetchProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/producto/${id}`);
            const data = await response.json();
            setFormData(data);
            setSelectedSport(data.deporteId);
            setSelectedType(data.tipologiaProductoId);
        } catch (error) {
            console.log(error);
        }
    };

    const [setShowModal, setModalIsOpen] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const parsedFormData = {
            ...formData,
            stock: parseInt(formData.stock),
            deporteId: selecteSport,
            precio: parseInt(formData.precio),
            descuento: parseInt(formData.descuento),
            tipologiaProductoId: selectedType
        }
        if (id) {
            axios.post(`http://localhost:8081/api/v1/producto/${id}`, parsedFormData)
                .then(() => setModalIsOpen(true))
                .catch(error => console.log(error));
        }
        else {
            axios.post('http://localhost:8081/api/v1/producto', parsedFormData)
                .then(() => setModalIsOpen(true))
                .catch(error => console.log(error));
        }
    };

    const handleModalOk = () => {
        setModalIsOpen(false);
        navigate(`/user`);
    }

    const [sports, setSports] = useState([]);
    const [selecteSport, setSelectedSport] = useState('');

    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/api/v1/deporte')
            .then(response => {
                setSports(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('http://localhost:8081/api/v1/tipologia/producto')
            .then(response => {
                setTypes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSelectChangeSport = (event) => {
        setSelectedSport(event.target.value);
    };

    const handleSelectChangeType = (event) => {
        setSelectedType(event.target.value);
    };

    return (
        <div className="background">
            <CircleBackground />
            <NavBar />

            <div className="container">
                <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>Añadir producto</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', marginTop: '-90px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '2rem' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', width: '500px' }}>
                                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#0EB2C1' }} placeholder="Nombre" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', width: '500px' }}>
                                <input type="text" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleInputChange} style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#0EB2C1', height: '100px' }} placeholder="Descripcion" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '500px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                                    <label htmlFor="precio">Precio</label>
                                    <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleInputChange} required placeholder="precio" style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#41738D' }}/>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', marginLeft: "20%" }}>
                                    <label htmlFor="stock">Stock</label>
                                    <input type="text" id="stock" name="stock" value={formData.stock} onChange={handleInputChange} required placeholder="Numero de unidades" style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#41738D' }}/>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                                <input type="url" id="urlImagen" name="urlImagen" placeholder='URL imagen' value={formData.urlImagen} onChange={handleInputChange} required style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#41738D' }}/>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                                <select id="deporteId" value={selecteSport} onChange={handleSelectChangeSport} style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#30365B' }}>
                                    <option value="">-- Selecciona un deporte --</option>
                                    {sports.map(item => (
                                        <option key={item.id} value={item.id}>{item.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                                <label htmlFor="descuento">Descuento</label>
                                <input type="number" id="descuento" name="descuento" value={formData.descuento} onChange={handleInputChange} required style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#30365B' }}/>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                                <select id="tipologiaProductoId" value={selectedType} onChange={handleSelectChangeType} style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', backgroundColor: '#30365B' }}>
                                    <option value="">-- Selecciona una tipologia --</option>
                                    {types.map(type => (
                                        <option key={type.id} value={type.id}>{type.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginTop: '2rem',  backgroundColor: '#0D6EFD' }}>{button}</button>
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
