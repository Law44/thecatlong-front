import NavBar from '../../components/NavBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import banner from '../../assets/banner-test.jpg';
import error from '../../assets/error.JPG';

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
                console.log(response.data);
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
        <div>
            <NavBar />
            <div className="container">
                {filteredItems.length === 0 ? (
                    <div className="text-center mt-5">
                        <h4>No se han encontrado productos con ese nombre</h4>
                        <img src={error}></img>
                    </div>
                ) : (
                    <div className="row">
                        {filteredItems.map(item => (
                            <div className="col-md-4 mb-4" key={item.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={banner} />
                                    <Card.Body>
                                        <Card.Title>{item.nombre}</Card.Title>
                                        <Card.Text>{item.descripcion} ({item.deporte.nombre})</Card.Text>
                                        <Card.Text>{item.precio} €</Card.Text>
                                        <Button variant="primary">Comprar</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
