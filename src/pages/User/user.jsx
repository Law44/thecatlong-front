import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';

export default function User() {
    let connected = true;
    return (
        <div>
            <NavBar />
            <div className="container">
                {connected ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '2rem' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Panel de control</h2>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '2rem', marginBottom: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Productos</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Link to="/products/create" className="nav-link" style={{ marginBottom: '1rem'}}>
                                        <a href="#" style={{ textDecoration: 'none' }}>Crear Producto</a>
                                    </Link>
                                    <Link to="/products/list" className="nav-link">
                                        <a href="#" style={{ textDecoration: 'none' }}>Lista Productos</a>
                                    </Link>
                                </div>
                            </div>
                            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Usuarios</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Link to="/user/create" className="nav-link" style={{ marginBottom: '1rem'}}>
                                        <a href="#" style={{ textDecoration: 'none'}}>Crear Usuario</a>
                                    </Link>
                                    <Link to="/user/list" className="nav-link">
                                        <a href="#" style={{ textDecoration: 'none' }}>Lista Usuarios</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
                        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h2 style={{ marginBottom: '1rem' }}>Iniciar sesión</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                                <label htmlFor="username" style={{ marginBottom: '0.5rem' }}>Nombre de usuario:</label>
                                <input type="text" id="username" name="username" style={{ padding: '0.5rem', fontSize: '1rem' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                                <label htmlFor="password" style={{ marginBottom: '0.5rem' }}>Contraseña:</label>
                                <input type="password" id="password" name="password" style={{ padding: '0.5rem', fontSize: '1rem' }} />
                            </div>
                            <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginTop: '2rem' }}>Iniciar sesión</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}