function setupJoystick(div) {
    const joystick = document.createElement('div');
    joystick.style.position = 'absolute';
    joystick.style.bottom = '20px';
    joystick.style.left = '20px';
    joystick.style.width = '150px';
    joystick.style.height = '150px';
    joystick.style.borderRadius = '50%';
    joystick.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    joystick.style.touchAction = 'none'; // Prevent default touch actions

    const innerCircle = document.createElement('div');
    innerCircle.style.position = 'absolute';
    innerCircle.style.top = '50%';
    innerCircle.style.left = '50%';
    innerCircle.style.width = '50px';
    innerCircle.style.height = '50px';
    innerCircle.style.borderRadius = '50%';
    innerCircle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    innerCircle.style.transform = 'translate(-50%, -50%)';

    joystick.appendChild(innerCircle);
    div.appendChild(joystick);

    let initialTouch = null;
    let deltaX = 0;
    let deltaY = 0;

    // Helper function to emit move event
    const emitMove = () => {
        const evt = new CustomEvent("move", { detail: { deltaX, deltaY } });
        div.dispatchEvent(evt);
    };

    // Handle touch start
    joystick.addEventListener('touchstart', function (e) {
        e.preventDefault(); // Prevent default scrolling behavior
        initialTouch = e.touches[0];
        deltaX = 0;
        deltaY = 0;
    });

    // Handle touch move
    joystick.addEventListener('touchmove', function (e) {
        e.preventDefault();
        if (!initialTouch) return;

        const touch = e.touches[0];
        let offsetX = touch.clientX - initialTouch.clientX;
        let offsetY = touch.clientY - initialTouch.clientY;

        // Limit the movement of the inner circle
        const maxDistance = 50; // Maximum distance from center
        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

        if (distance > maxDistance) {
            const angle = Math.atan2(offsetY, offsetX);
            offsetX = maxDistance * Math.cos(angle);
            offsetY = maxDistance * Math.sin(angle);
        }

        // Apply all transformations in a single call for performance
        innerCircle.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;

        deltaX = offsetX;
        deltaY = offsetY;

        emitMove();
    });

    // Handle touch end
    joystick.addEventListener('touchend', function () {
        innerCircle.style.transform = 'translate(-50%, -50%)'; // Reset inner circle position
        deltaX = 0;
        deltaY = 0;
        emitMove();
    });

    return div;
}
