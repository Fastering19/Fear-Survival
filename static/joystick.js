function setupJoystick(div) {
    // on pc: height, on mobile: width
    const sizeRatio = Math.min(window.innerWidth, window.innerHeight) * 0.25; 

    div.style.position = 'absolute';
    div.style.width = `${sizeRatio}px`; 
    div.style.height = `${sizeRatio}px`;
    div.style.bottom = '0';
    div.style.left = '0';

    const joystick = document.createElement('div');
    joystick.style.position = 'absolute';
    joystick.style.bottom = '20%'; // Positioned relative to container
    joystick.style.left = '20%';   // Positioned relative to container
    joystick.style.width = '80%';  // Joystick is 80% of the container's width
    joystick.style.height = '80%'; // Joystick is 80% of the container's height
    joystick.style.borderRadius = '50%';
    joystick.style.backgroundColor = 'rgba(150, 150, 150, 0.64)';
    joystick.style.touchAction = 'none';

    const innerCircle = document.createElement('div');
    innerCircle.style.position = 'absolute';
    innerCircle.style.top = '50%';
    innerCircle.style.left = '50%';
    innerCircle.style.width = '60%'; 
    innerCircle.style.height = '60%';
    innerCircle.style.borderRadius = '50%';
    innerCircle.style.backgroundColor = 'grey'; // Old grey inner circle
    innerCircle.style.transform = 'translate(-50%, -50%)';

    joystick.appendChild(innerCircle);
    div.appendChild(joystick);
    console.log('Joystick added:', joystick);

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
