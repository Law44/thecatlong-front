import NavBar from '../../components/NavBar';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function List() {
    const [objectList, setObjectList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8081/api/v1/usuario")
            .then((response) => setObjectList(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="background">
            <NavBar />
            <div className="container">
                <h2>Lista de usuarios</h2>
                <br></br>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="table-wrapper">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nombre</th>
                                    <th>Primer Apellido</th>
                                    <th>Segundo Apellido</th>
                                    <th>Email</th>
                                    <th>Roles</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {objectList.map(data => (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>{data.nombre}</td>
                                        <td>{data.apellido1}</td>
                                        <td>{data.apellido2}</td>
                                        <td>{data.email}</td>
                                        <td>{data.roles}</td>
                                        <td style={{ padding: "8px" }}>
                                            <span style={{ display: "flex", alignItems: "center" }}>
                                                <Link to={`/user/create/${data.id}`} className="nav-link" style={{ marginLeft: '5%' }}>
                                                    <i className="fa fa-pencil fa-lg">
                                                        <FaPencilAlt />
                                                    </i>
                                                </Link>
                                                <Link to="/user" className="nav-link" style={{ marginLeft: '10%' }}>
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
        </div>
    );
}
