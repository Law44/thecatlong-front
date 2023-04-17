import NavBar from '../../components/NavBar';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CircleBackground from '../../components/CircleBackground';
import { useNavigate } from 'react-router-dom';

export default function List() {
    const navigate = useNavigate();
    const [objectList, setObjectList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8081/api/v1/producto")
            .then((response) => setObjectList(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="background">
            <CircleBackground />
            <NavBar />
            <h2 style={{marginLeft: "7%"}}>Lista de productos</h2>
            <div className="container">
                <br></br>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="table-wrapper">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Descuento</th>
                                    <th>Stock</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {objectList.map(data => (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>
                                            <img src={data.urlImagen} alt={data.name} style={{ width: "50px", height: "50px" }} />
                                        </td>
                                        <td>{data.nombre}</td>
                                        <td>{data.descripcion}</td>
                                        <td>{data.precio}</td>
                                        <td>{data.descuento}</td>
                                        <td>{data.stock}</td>
                                        <td style={{ padding: "8px" }}>
                                            <span style={{ display: "flex", alignItems: "center" }}>
                                                <Link to={`/products/create/${data.id}`} className="nav-link" style={{ marginLeft: '5%' }}>
                                                    <i className="fa fa-pencil fa-lg">
                                                        <FaPencilAlt />
                                                    </i>
                                                </Link>
                                                <Link to="/" className="nav-link" style={{ marginLeft: '10%' }}>
                                                    <i className="fa fa-eye fa-lg">
                                                        <FaEye />
                                                    </i>
                                                </Link>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button onClick={() => navigate(`/products/create`)} style={{ marginLeft: '80%', marginTop: '1%', borderRadius: '20px' }}>Crear producto</button>
        </div>
    );
}
