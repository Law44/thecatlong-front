import NavBar from '../../components/NavBar';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import error from '../../assets/error.JPG';
import CircleBackground from '../../components/CircleBackground';

export default function Search() {
    const location = useLocation();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const searchText = new URLSearchParams(location.search).get('text');

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
                                            <Link to={`/products/${item.id}`} className="nav-link" style={{ marginLeft: '5%' }}>
                                                <Button variant="primary">Comprar</Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
