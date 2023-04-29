import NavBar from '../../components/NavBar';
import CircleBackground from '../../components/CircleBackground';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Single() {

    const { id } = useParams();
    const [product, setProduct] = useState("");

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

    return (
        <div className="background">
            <CircleBackground />
            <NavBar />
            <h2 style={{ marginLeft: "7%" }}>{product.nombre}</h2>
            <div className="container" style={{  display: 'flex'}}>
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
                                <button className="add-to-cart-button">Añadir al carrito</button>
                                <button className="buy-button">Comprar ahora</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
