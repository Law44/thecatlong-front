import NavBar from '../../components/NavBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';

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
            <NavBar />
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '2rem' }}>
                    <h2>Nuevo producto</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>

                            <label htmlFor="stock">Stock:</label>
                            <input type="text" id="stock" name="stock" value={formData.stock} onChange={handleInputChange} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <label htmlFor="descripcion">Descripción:</label>
                            <input type="text" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <label htmlFor="urlImagen">Imagen:</label>
                            <input type="url" id="urlImagen" name="urlImagen" value={formData.urlImagen} onChange={handleInputChange} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <label htmlFor="deporteId">Deporte:</label>
                            <select id="deporteId" value={selecteSport} onChange={handleSelectChangeSport}>
                                <option value="">-- Selecciona un deporte --</option>
                                {sports.map(item => (
                                    <option key={item.id} value={item.id}>{item.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <label htmlFor="precio">Precio:</label>
                            <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleInputChange} required />
                        </div>                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <label htmlFor="descuento">Descuento:</label>
                            <input type="number" id="descuento" name="descuento" value={formData.descuento} onChange={handleInputChange} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <label htmlFor="tipologiaProductoId">Tipologia:</label>
                            <select id="tipologiaProductoId" value={selectedType} onChange={handleSelectChangeType}>
                                <option value="">-- Selecciona una tipologia --</option>
                                {types.map(type => (
                                    <option key={type.id} value={type.id}>{type.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginTop: '2rem' }}>{button}</button>
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
                    <p>{modalMessage}</p>
                    <button onClick={handleModalOk} style={{ marginLeft: '80%' }}>OK</button>
                </div>
            </Modal>
        </div>
    );
}
