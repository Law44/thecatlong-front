import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, ButtonGroup } from 'react-bootstrap';
import banner from '../assets/banner-test.jpg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Banner() {
    const [cardIndex, setCardIndex] = useState(0);

    const cards = [
        {
            buttonText: "SHOP NOW",
            buttonText2: "ADD TO CART"
        },
        {
            buttonText: "SHOP NOW",
            buttonText2: "ADD TO CART"
        },
        {
            buttonText: "SHOP NOW",
            buttonText2: "ADD TO CART"
        },
        {
            buttonText: "SHOP NOW",
            buttonText2: "ADD TO CART"
        }
    ];

    const handleNextCard = () => {
        setCardIndex((cardIndex + 1) % cards.length);
    };

    const handlePrevCard = () => {
        setCardIndex((cardIndex - 1 + cards.length) % cards.length);
    };

    const renderCircle = (index) => {
        return (
            <div
                key={index}
                className={`circle ${cardIndex === index ? 'active' : ''}`}
                onClick={() => setCardIndex(index)}
            ></div>
        );
    };

    return (
        <Container fluid className="banner">
            <Row className="align-items-center d-flex" style={{ marginLeft: '10%' }}>
                <Col xs={12} md={6} className="text-center text-md-left">
                    <h2>BE A PROFESSIONAL</h2>
                    <h4>The new professional equipment lighter than ever, breathable and comfortable</h4>
                    <div className="d-flex justify-content-center mt-3">
                        <div>
                            <Button>{cards[cardIndex].buttonText}</Button>
                        </div>
                        <div style={{ marginLeft: 20 }}>
                            <Button>{cards[cardIndex].buttonText2}</Button>
                        </div>
                    </div>
                    <div className="circle-container mt-3">
                        {cards.map((card, index) => renderCircle(index))}
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className="banner-content text-center">
                        <div className="banner-nav">
                            <Image src={banner} fluid alt="Banner Image" />
                            <div className="card-indicators d-flex justify-content-center mt-3">
                                {cards.map((card, index) => (
                                    <div
                                        key={index}
                                        className={`card-indicator ${index === cardIndex ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <div>
                                    <Button variant="link" className="mr-3" onClick={handlePrevCard}>
                                        <FaChevronLeft />
                                    </Button>
                                </div>
                                <div style={{ marginLeft: 20 }}>
                                    <Button variant="link" className="ml-3" onClick={handleNextCard}>
                                        <FaChevronRight />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
