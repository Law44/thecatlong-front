import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/logo.png';
import '../App.css';

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg" >
            <Link to="/" className="navbar-brand">
                <img src={logo} alt="Sports Store" width="50" height="50" />
                <strong>The Long Cat</strong>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link"><strong>Home</strong></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/products" className="nav-link"><strong>Products</strong></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sports" className="nav-link"><strong>Sports</strong></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link"><strong>About Us</strong></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link"><strong>Contact Us</strong></Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button id="searchBox" className="btn btn-outline-secondary" type="button">

                            </button>
                        </div>
                    </div>
                </form>
                <Link to="/cart" className="nav-link">
                    <i className="fa fa-shopping-cart fa-lg"></i>
                </Link>
            </div>
        </nav>
    );
}