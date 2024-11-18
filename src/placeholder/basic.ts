import Canvas from 'skia-canvas';

export default async function generatePlaceholderImage(width: number, height: number) {
    const canvas = new Canvas.Canvas(width, height);
    const context = canvas.getContext('2d');

    // Modern gradient background (diagonal gradient)
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#4b4b4b');
    gradient.addColorStop(1, '#b0b0b0');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    // diagonal line pattern
    context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    context.lineWidth = 2;
    for (let i = -width; i < height; i += 20) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i + height, height);
        context.stroke();
    }

    // text
    context.fillStyle = 'white';
    context.font = `${Math.min(width, height) / 6}px "Segoe UI", "Roboto", sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.shadowColor = 'rgba(0, 0, 0, 0.2)'; // Soft shadow for a modern look
    context.shadowBlur = 6;

    // Draw the centered text
    context.fillText(`${width}x${height}`, width / 2, height / 2);

    // Return the image buffer
    return canvas.toBuffer('png');
}

