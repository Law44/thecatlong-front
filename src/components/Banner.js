import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, ButtonGroup } from 'react-bootstrap';
import banner from '../assets/banner-test.jpg';

export default function Banner() {
    const [cardIndex, setCardIndex] = useState(0);

    const cards = [
        {
            title: "Card 1",
            text: "This is card 1",
            buttonText: "Button 1"
        },
        {
            title: "Card 2",
            text: "This is card 2",
            buttonText: "Button 2"
        },
        {
            title: "Card 3",
            text: "This is card 3",
            buttonText: "Button 3"
        },
        {
            title: "Card 4",
            text: "This is card 4",
            buttonText: "Button 4"
        }
    ];

    const handleNextCard = () => {
        setCardIndex((cardIndex + 1) % cards.length);
    };

    const handlePrevCard = () => {
        setCardIndex((cardIndex - 1 + cards.length) % cards.length);
    };

    return (
        <Container fluid className="banner">
            <Row className="align-items-center d-flex" style={{marginLeft: '10%'}}>
                <Col xs={12} md={6} className="text-center text-md-left">
                    <h2>BE A PROFESIONAL</h2>
                    <h4>The new professional equipment lighter than ever, breathable and comfortable</h4>
                    <Button>{cards[cardIndex].buttonText}</Button>
                    <Button>{cards[cardIndex].buttonText}</Button>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className="banner-content text-center">
                        <div className="banner-nav">
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Image src={banner} fluid alt="Banner Image" />
                                <Button variant="outline-primary" onClick={handlePrevCard}>Prev</Button>
                                <Button variant="outline-primary" onClick={handleNextCard}>Next</Button>
                            </Col>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
