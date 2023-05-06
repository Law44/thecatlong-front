import karate from '../../assets/karate.png';
import dancer from '../../assets/dancer.png';
import gym from '../../assets/gym.png';
import futbol from '../../assets/futbol.png';
import NavBar from '../../components/NavBar';
import CircleBackground from '../../components/CircleBackground';

export default function Sports() {
    const handleImageClick = (event) => {
        // Get the URL from the event target's href attribute
        const url = event.target.href;
        // Navigate to the URL
        window.location.href = url;
    };

    return (
        <div>
            <div className="background">
                <CircleBackground />
                <NavBar />

                <div className="container">
                    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                        <div style={{ flex: '1', marginRight: '10px' }}>
                            <a href="/products?text=karate" onClick={handleImageClick}>
                                <img
                                    src={karate}
                                    alt="Image 1"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                                    className="hover-image"
                                />
                            </a>
                        </div>
                        <div style={{ flex: '1', marginRight: '10px' }}>
                            <a href="/products?text=bailarin" onClick={handleImageClick}>
                                <img
                                    src={dancer}
                                    alt="Image 2"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                                    className="hover-image"
                                />
                            </a>
                        </div>
                        <div style={{ flex: '1', marginRight: '10px' }}>
                            <a href="/products?text=gimnasio" onClick={handleImageClick}>
                                <img
                                    src={gym}
                                    alt="Image 3"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                                    className="hover-image"
                                />
                            </a>
                        </div>
                        <div style={{ flex: '1' }}>
                            <a href="/products?text=futbol" onClick={handleImageClick}>
                                <img
                                    src={futbol}
                                    alt="Image 4"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                                    className="hover-image"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
