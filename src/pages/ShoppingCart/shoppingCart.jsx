import NavBar from '../../components/NavBar';
import CircleBackground from '../../components/CircleBackground';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/icono.JPG';
import Modal from 'react-modal';

export default function ShoppingCart() {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [idCart, setIdCart] = useState([]);
    const [setShowModal, setModalIsOpen] = useState(false);

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        axios.get(`http://localhost:8081/api/v1/carro/activo?userId=${storedIsLoggedIn}`)
            .then(response => {
                if (response.data != '') {
                    console.log(response);
                    setIdCart(response.data.id);
                    setItems(response.data.productos);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const totalPrice = () => {
        let total = 0;
        items.forEach(item => {
            total += item.cantidad * item.precio;
        });
        return total;
    };

    const buy = () => {
        axios
            .put(`http://localhost:8081/api/v1/carro/${idCart}`)
            .then(response => {
                setModalIsOpen(true);
            })
    };

    const handleQuantityChange = (id, newQuantity) => {        
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        const data = {
            "usuarioId": storedIsLoggedIn,
            "cantidad": parseInt(newQuantity),
            "productoId": id
        }
        axios
            .post(`http://localhost:8081/api/v1/carro/anadir`, data, config)
            .then(response => {
                console.log(response);
            })
        const updatedItems = items.map(data => {
            if (data.id === id) {
                return { ...data, cantidad: parseInt(newQuantity) };
            }
            return data;
        });
        setItems(updatedItems);
    };

    const handleModalOk = () => {
        navigate(`/`);
        setModalIsOpen(false);
    }

    return (
        <div>
            <div class="background">
                <CircleBackground />
                <NavBar />

                <div className="container">
                    <div style={{ display: 'flex', height: '86%' }}>
                        <div style={{ flex: '75%', height: '100%' }}>
                            <h2>Carrito</h2>
                            {items.length !== 0 ? (
                                <div style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '8px', height: '100%' }}>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '20px' }}>
                                        <div className="table-wrapper" style={{ width: "90%" }}>
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Nombre</th>
                                                        <th>Precio</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.map(data => (
                                                        <tr key={data.id}>
                                                            <td>
                                                                <img src={data.urlImagen} alt={data.name} style={{ width: "50px", height: "50px" }} />
                                                            </td>
                                                            <td>{data.nombre}</td>
                                                            <td>{data.precio} €</td>
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    value={data.cantidad}
                                                                    onChange={(e) => handleQuantityChange(data.id, e.target.value)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '20px' }}>
                                        <Link to={`/products`} className="nav-link" style={{ marginLeft: '5%' }}>
                                            <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '8px', padding: '10px 20px', color: '#61dafb', fontWeight: 'bold' }}>Continuar Comprando</button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '8px', height: '100%' }}>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '20px', marginLeft: '4%' }}>
                                        <img src={icon} />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '20px', marginLeft: '4%' }}>
                                        <h2>Tu carrito esta vacio</h2>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '20px', marginLeft: '4%' }}>
                                        <h3>Mira todos nuestros productos para añadir al carro</h3>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '20px' }}>
                                        <Link to={`/products`} className="nav-link" style={{ marginLeft: '5%' }}>
                                            <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '8px', padding: '10px 20px', color: '#61dafb', fontWeight: 'bold' }}>Continuar Comprando</button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ flex: '25%', height: '100%' }}>
                            <h2 style={{ marginLeft: '20px' }}>Resumen</h2>
                            <div style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '8px', height: '100%', marginLeft: '20px' }}>
                                <div style={{ display: "flex", flexDirection: "column", height: "100%", margin: "20px" }}>
                                    <br></br>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <h4 style={{ color: '#61dafb' }}>Total</h4>
                                        <div>{totalPrice()} €</div>
                                    </div>
                                    <br></br>
                                    <hr style={{ margin: 0 }} />
                                    <br></br>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '20px' }}>
                                        <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '8px', padding: '10px 100px', backgroundColor: 'yellow', fontWeight: 'bold' }} onClick={() => buy()}>Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                isOpen={setShowModal}
                onRequestClose={() => handleModalOk()}
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
                    <p>Producto comprados correctamente</p>
                    <button onClick={handleModalOk} style={{ marginLeft: '80%' }}>OK</button>
                </div>
            </Modal>
            </div>
        </div>
    );
}