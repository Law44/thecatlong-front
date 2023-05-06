import NavBar from '../../components/NavBar';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import error from '../../assets/error.JPG';
import CircleBackground from '../../components/CircleBackground';
import Modal from 'react-modal';

export default function Search() {
    const location = useLocation();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const searchText = new URLSearchParams(location.search).get('text');
    const [setShowModal, setModalIsOpen] = useState(false);

    let url = "";

    if (searchText == null) {
        url = `http://localhost:8081/api/v1/producto`;
    }
    else {
        url = `http://localhost:8081/api/v1/producto?nombre=${searchText}`;
    }

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [searchText]);

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

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
                console.log(response);
            })
        setModalIsOpen(true);
    };

    const handleModalOk = () => {
        setModalIsOpen(false);
    }

    return (
        <div className='background'>
            <CircleBackground />
            <NavBar />
            <h2 style={{ marginLeft: "7%" }}>Productos</h2>
            <div className="container">
                {filteredItems.length === 0 ? (
                    <div className="text-center mt-5">
                        <h4>No se han encontrado productos con ese nombre</h4>
                        <img src={error}></img>
                    </div>
                ) : (
                    <div style={{ height: '800px', width: 'auto' }}>
                        <br></br>
                        <div className="row">
                            {filteredItems.map(item => (
                                <div className="col-md-4 mb-4" key={item.id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={item.urlImagen} />
                                        <Card.Body>
                                            <Card.Title>{item.nombre}</Card.Title>
                                            <Card.Text>{item.descripcion} ({item.deporte.nombre})</Card.Text>
                                            <Card.Text>{item.precio} €</Card.Text>
                                            <div style={{ display: 'flex' }}>
                                                <Link to={`/products/${item.id}`} className="nav-link" style={{ marginLeft: '5%' }}>
                                                    <Button variant="primary">Ver</Button>
                                                </Link>
                                                <Button variant="primary" onClick={() => handleBuyClick(item.id)} style={{ marginLeft: '5%' }}>Comprar</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
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
                <div>
                    <p>Producto añadido correctamente</p>
                    <button onClick={handleModalOk} style={{ marginLeft: '80%' }}>OK</button>
                </div>
            </Modal>
        </div>
    );
}
