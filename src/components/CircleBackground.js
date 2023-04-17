import { useEffect } from 'react';

function CircleBackground() {
    useEffect(() => {
        const container = document.body;
        const circles = document.querySelectorAll('.circle');
        circles.forEach(function (circle) {
            var randomX = Math.floor(Math.random() * (container.offsetWidth - circle.offsetWidth));
            var randomY = Math.floor(Math.random() * (container.offsetHeight - circle.offsetHeight));
            circle.style.left = randomX + 'px';
            circle.style.top = randomY + 'px';
        });
    }, []);

    function isColliding(elem1, elem2) {
        var rect1 = elem1.getBoundingClientRect();
        var rect2 = elem2.getBoundingClientRect();
        return !(
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom ||
            rect1.right < rect2.left ||
            rect1.left > rect2.right
        );
    }

    function moveElement(element, container) {
        var randomX = Math.floor(Math.random() * (container.offsetWidth - element.offsetWidth));
        var randomY = Math.floor(Math.random() * (container.offsetHeight - element.offsetHeight));
        element.style.left = randomX + 'px';
        element.style.top = randomY + 'px';
        var colliding = false;
        container.querySelectorAll('.circle').forEach(function (circle) {
            if (circle !== element && isColliding(element, circle)) {
                colliding = true;
            }
        });
        if (colliding) {
            moveElement(element, container);
        }
    }

    function handleInput(event) {
        const inputValue = event.target.value;
        const container = document.body;
        const circles = document.querySelectorAll('.circle');
        circles.forEach(function (circle) {
            moveElement(circle, container);
        });
    }

    return (
        <div className="background">
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
            <div className="circle circle4"></div>
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
            <div className="circle circle4"></div>
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
            <div className="circle circle4"></div>
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
            <div className="circle circle4"></div>
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
            <div className="circle circle4"></div>
            <input type="text" onInput={handleInput} />
        </div>
    );
}

export default CircleBackground;
