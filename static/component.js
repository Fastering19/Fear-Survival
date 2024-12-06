class Entity {
    constructor(x=0, y=0) {
        this.x = x; // Virtual X position (0-5000)
        this.y = y; // Virtual Y position (0-5000)
    }

    isInView(xOffset, yOffset, canvasWidth=window.innerWidth, canvasHeight=window.innerHeight) {
        const screenX = this.x - xOffset;
        const screenY = this.y - yOffset;
        return screenX >= 0 && screenX <= canvasWidth && screenY >= 0 && screenY <= canvasHeight;
    }
}

class Player extends Entity {
    constructor(x, y) {
        super(x, y); // Initialize position using the Entity constructor
    }

    /**
     * Draw the player as a dot if within the rendered area.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     * @param {number} xOffset - X offset of the rendered area.
     * @param {number} yOffset - Y offset of the rendered area.
     * @param {number} canvasWidth - Width of the canvas.
     * @param {number} canvasHeight - Height of the canvas.
     */
    draw(ctx, xOffset, yOffset, canvasWidth, canvasHeight) {
        if (this.isInView(xOffset, yOffset, canvasWidth, canvasHeight)) {
            const screenX = this.x - xOffset;
            const screenY = this.y - yOffset;

            ctx.beginPath();
            ctx.arc(screenX, screenY, 5, 0, Math.PI * 2); // Draw a small dot
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.closePath();
        }
    }
}

