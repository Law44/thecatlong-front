import NavBar from '../../components/NavBar';
import CircleBackground from '../../components/CircleBackground';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

export default function Single() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState("");
    const [setShowModal, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetchProduct(id);
    }, [id]);

    const fetchProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/producto/${id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuyClick = (productId) => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const data = {
            "usuarioId": storedIsLoggedIn,
            "cantidad": 1,
            "productoId": productId
        }
        axios
            .post(`http://localhost:8081/api/v1/carro/anadir`, data, config)
            .then(response => {
            })
        setModalIsOpen(true);
    };

    const handleBuyAndRedirectClick = (productId) => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const data = {
            "usuarioId": storedIsLoggedIn,
            "cantidad": 1,
            "productoId": productId
        }
        axios
            .post(`http://localhost:8081/api/v1/carro/anadir`, data, config)
            .then(response => {
            })
        navigate(`/cart`);
    };

    const handleModalOk = () => {
        setModalIsOpen(false);
    }

    return (
        <div className="background">
            <CircleBackground />
            <NavBar />
            <h2 style={{ marginLeft: "7%" }}>{product.nombre}</h2>
            <div className="container" style={{ display: 'flex' }}>
                <div className="product-page">
                    <div className="product-page__photo">
                        <img src={product.urlImagen} alt="Product" className="product-image" />
                    </div>
                    <div className="product-page__details">
                        <div className="description-container">
                            <h3>Descripción</h3>
                            <p>{product.descripcion}</p>
                        </div>
                        <div className="price-buttons-container">
                            <div className="price-container">
                                <p className="price">{product.precio}€</p>
                                <button className="add-to-cart-button" onClick={() => handleBuyClick(id)}>Añadir al carrito</button>
                                <button className="buy-button" onClick={() => handleBuyAndRedirectClick(id)}>Comprar ahora</button>
                            </div>
                        </div>
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
                    <p>Producto añadido correctamente</p>
                    <button onClick={handleModalOk} style={{ marginLeft: '80%' }}>OK</button>
                </div>
            </Modal>
        </div>
    );
}
