import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/logo.png';
import '../App.css';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      if (location.pathname !== '/products') {
        return navigate(`/products?text=${searchText}`);
      }
      else {
        return navigate(`?text=${searchText}`);
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Sports Store" width="50" height="50" />
        <strong>The Long Cat</strong>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto w-100">
          <li className="nav-item flex-grow-1">
            <Link to="/" className="nav-link">
              <strong>Inicio</strong>
            </Link>
          </li>
          <li className="nav-item flex-grow-1">
            <Link to="/products" className="nav-link">
              <strong>Productos</strong>
            </Link>
          </li>
          <li className="nav-item flex-grow-1">
            <Link to="/sports" className="nav-link">
              <strong>Deportes</strong>
            </Link>
          </li>
          <li className="nav-item flex-grow-1">
            <Link to="/" className="nav-link">
              <strong>Sobre Nosotros</strong>
            </Link>
          </li>
          <li className="nav-item flex-grow-1">
            <Link to="/" className="nav-link">
              <strong>Contacto</strong>
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="input-group-append">
              <button id="searchBox" className="btn btn-outline-secondary" type="submit">
                <FaSearch />
              </button>
            </div>
          </div>
        </form>        
        <Link to="/user" className="nav-link" style={{ marginLeft: '5%' }}>
          <i className="fa fa-user fa-lg">
            <FaUser />
          </i>
        </Link>
        <Link to="/cart" className="nav-link" style={{ marginLeft: '5%' }}>
          <i className="fa fa-shopping-cart fa-lg">
            <FaShoppingCart />
          </i>
        </Link>
      </div>
    </nav>
  );
}
