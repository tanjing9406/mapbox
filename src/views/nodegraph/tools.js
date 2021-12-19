export function drawNodeCanvasObject(node, ctx, globalScale, isActive) {
    const { name, x, y, color } = node;
    if (node.type === 'img') {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, 2 * Math.PI, false);
        ctx.fill();

        if(isActive){
            ctx.strokeStyle = 'red'
            ctx.stroke()
        }

        const image = new Image()
        image.src = '/public/star.png'
        ctx.drawImage(image, x - 5, y - 5, 10, 10)
        node.val = 5
        node.__bckgDimensions = [18, 0]; // to re-use in nodePointerAreaPaint
        return
    }
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(name).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 2); // some padding

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, bckgDimensions[0] / 2, 0, 2 * Math.PI, false);
    ctx.fill();
    if(isActive){
        ctx.strokeStyle = 'red'
        ctx.stroke()
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255)';
    ctx.fillText(name, x, y);
    node.val = 0
    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
}
