//Javascript Canvas Library

// Made by
//
//       888888          88                                                                d88b
//          888          88                                                               d8PY8b
//          888  .d88b.  88.d8b.   d8888b   88 d88b.  88 d88b.   .d88b.   .d888          d8P  Y8b      d8888b    .d888
//          888 d8P  Y8b 88"  "8b     .Y88  88d"  Y8b 88d"  Y8b d8P  Y8b d8P            d8P    Y8b        .Y88  d8P
//          888 88    88 88    88 .d888888  88     88 88     88 88888888  "88b.        d8888888888b   .d888b88   "88b.
//   d8b    888 Y8b  d8P 88    88 88   "88  88     88 88     88 Y8b.         d8P      d8P        Y8b  88   "88      d8P
//   Y88b..d88P  "Y88P"  88    88 "Y88P"Y8b 88     88 88     88  "Y888P  "888P"      d8P          Y8b "Y88P"Y8b "888P"
//    "Y88888"                                                                      d8P            Y8b


function drawCircle(ctx, x, y, radius, lineWidth, lineColor) {
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawFilledCircle(ctx, x, y, radius, lineWidth, lineColor, fillColor) {
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = lineWidth;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function drawRect(ctx, x, y, x2, y2, lineWidth, lineColor) {
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.moveTo(x, y);
    ctx.lineTo(x + (x2 - x), y);
    ctx.lineTo(x + (x2 - x), y + (y2 - y));
    ctx.lineTo(x, y + (y2 - y));
    ctx.lineTo(x, y);
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function drawFilledRect(ctx, x, y, x2, y2, lineWidth, lineColor, fillColor) {
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = fillColor;
    ctx.moveTo(x, y);
    ctx.lineTo(x + (x2 - x), y);
    ctx.lineTo(x + (x2 - x), y + (y2 - y));
    ctx.lineTo(x, y + (y2 - y));
    ctx.lineTo(x, y);
    ctx.lineWidth = lineWidth;
    ctx.fill();
    ctx.stroke();
}

function drawTriangle(ctx, x, y, x2, y2, lineWidth, lineColor) {
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.moveTo(x, y + (y2 - y));
    ctx.lineTo(x2, y2);
    ctx.lineTo(x + ((x2 - x) / 2), y);
    ctx.lineTo(x + ((x2 - x) / 2), y)
    ctx.lineTo(x, y + (y2 - y));
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function drawFilledTriangle(ctx, x, y, x2, y2, lineWidth, lineColor, fillColor) {
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x, y + (y2 - y));
    ctx.lineTo(x2, y2);
    ctx.lineTo(x + ((x2 - x) / 2), y);
    ctx.lineTo(x + ((x2 - x) / 2), y)
    ctx.lineTo(x, y + (y2 - y));
    ctx.fill();
    ctx.stroke();
}

function drawLine(ctx, x1, y1, x2, y2, lineWidth, lineColor) {
	ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = lineWidth;
	ctx.stroke();
}

function drawText(ctx, tx, x, y, color) {
    ctx.font = "20px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.fillText(tx, x, y);
}

function drawFree(ctx, x, y, xPoints, yPoints, lineWidth, lineColor) {    
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.moveTo(x, y);
    ctx.lineWidth = lineWidth;
    for (i = 0; i < yPoints.length; i++) {
        ctx.lineTo(xPoints[i], yPoints[i]);
    }
    ctx.stroke();
}
