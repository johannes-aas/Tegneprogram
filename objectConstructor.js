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


function line(x, y, x2, y2, lineWidth, lineColor) {
    this.type = currentTool;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
}

function freeDrawing(x, y, xPoints, yPoints, lineWidth, lineColor) {
    this.type = currentTool;
    this.x = x;
    this.y = y;
    this.xPoints = xPoints;
    this.yPoints = yPoints;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
}

function circle(x, y, radius, lineWidth, lineColor) {
    this.type = currentTool;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
}

function filledCircle(x, y, radius, lineWidth, lineColor, fillColor) {
    this.type = currentTool;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.lineColor = lineColor;
    this.fillColor = fillColor;
    this.lineWidth = lineWidth;
}

function rect(x, y, x2, y2, lineWidth, lineColor) {
    this.type = currentTool;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
}

function filledRect(x, y, x2, y2, lineWidth, lineColor, fillColor) {
    this.type = currentTool;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.lineColor = lineColor;
    this.fillColor = fillColor;
    this.lineWidth = lineWidth;
}

function triangle(x, y, x2, y2, lineWidth, lineColor) {
    this.type = currentTool;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
}

function filledTriangle(x, y, x2, y2, lineWidth, lineColor, fillColor) {
    this.type = currentTool;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.lineColor = lineColor;
    this.fillColor = fillColor;
    this.lineWidth = lineWidth;
}