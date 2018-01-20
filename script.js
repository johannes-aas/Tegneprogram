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

// To do list:
//
// kunne slette filer
// kunne endre navn på filer
// dersom filen du prøver å lagre har navn med en fil som finnes fra før spør om å erstatte
// floppydisk lagreknapp
// lage buer ved bruk av ekstremalpunkt
// kunne endre tykkelse, farge osv på lag
// kunne slatte lag
// kunne flytte lag frem eller tilbake i rekken


// prints "Made by Aas"
console.log('Made by\n\n       d88b\n      d8PY8b\n     d8P  Y8b      d8888b    .d888\n    d8P    Y8b         Y88  d8P\n   d8888888888b   .d888b88   "88b.\n  d8P        Y8b  88   "88      d8P\n d8P          Y8b "Y88P"Y8b "888P"\nd8P            Y8b');

var canvas1,
    canvas2, 
    ctx1, 
    ctx2,
    canvasWidth = 478,
    canvasHeight = 398,
    x,
    y,
    canvasTop = 0,
    canvasLeft = 0,
    displayList = [], // liste over objekt som skal vises
    log = [], // liste over objekter som blir angret
    currentTool = "freeDraw",
    layerId;

window.onload = winInit;

function winInit(){

    canvas1 = document.getElementById("canvas1");
    canvas1.width = canvasWidth;
    canvas1.height = canvasHeight;
    ctx1 = canvas1.getContext("2d");
    
    canvas2 = document.getElementById("canvas2");
    canvas2.width = canvasWidth;
    canvas2.height = canvasHeight;
    ctx2 = canvas2.getContext("2d");

    canvas2.onmousedown = mouseDown;
	canvas2.onmouseup = mouseUp;
    canvas2.onmousemove = mouseOver;
    
    document.getElementById("undo").onclick = undo;
    document.getElementById("redo").onclick = redo;
    document.getElementById("lineColorInput").oninput = getLineColor;
    document.getElementById("fillColorInput").oninput = getFillColor;
    document.getElementById("lineWidthInput").oninput = getLineWidth;
    document.getElementById("backgroundInput").oninput = backgroundImage;
    document.getElementById("backgroundColor").oninput = backgroundColor;
    document.getElementById("delete").onclick = deleteDrawing;
    document.getElementById("saveBtn").onclick = saveDrawing;
    
    mousePosition();
    window.onresize = mousePosition;

    initTools();
    fileList();
    layersList();
}

function initTools() {
    var tools = document.getElementsByClassName("tool");
    for(var i = 0; i < tools.length; i++) {
        tools[i].onclick = changeTool;
    }
}

function changeTool() {
    document.getElementsByClassName("active")[0].classList.remove("active");
    this.classList.add("active");
    currentTool = this.attributes["tool"].value;
    layerId = "";
    layersList();
    ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx2.setLineDash([]);
    canvas2.style.cursor = "crosshair";
}

function mousePosition(evt) {
    var boundingRect = canvas2.getBoundingClientRect();
    canvasTop = boundingRect.top;
    canvasLeft = boundingRect.left;
}

function renderCanvas() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    
    for (var i = 0; i < displayList.length; i++) {
        
        var type = displayList[i].type;
        
        switch (displayList[i].type) {
            case "freeDraw" : 
                drawFree(ctx1, displayList[i].x, displayList[i].y, displayList[i].x2, displayList[i].y2, displayList[i].lineWidth, displayList[i].lineColor);
                break;
            case "line" : 
                drawLine(ctx1, displayList[i].x, displayList[i].y, displayList[i].x2, displayList[i].y2, displayList[i].lineWidth, displayList[i].lineColor);
                break;
            case "circle" :
                drawCircle(ctx1, displayList[i].x, displayList[i].y, displayList[i].radius, displayList[i].lineWidth, displayList[i].lineColor);
                break;
            case "filledCircle" : 
                drawFilledCircle(ctx1, displayList[i].x, displayList[i].y, displayList[i].radius, displayList[i].lineWidth, displayList[i].lineColor, displayList[i].fillColor);
                break;
            case "rect" :
                drawRect(ctx1, displayList[i].x, displayList[i].y, displayList[i].x2, displayList[i].y2, displayList[i].lineWidth, displayList[i].lineColor);
                break;
            case "filledRect" :
                drawFilledRect(ctx1, displayList[i].x, displayList[i].y, displayList[i].x2, displayList[i].y2, displayList[i].lineWidth, displayList[i].lineColor, displayList[i].fillColor);
                break;
            case "triangle" : 
                drawTriangle(ctx1, displayList[i].x, displayList[i].y, displayList[i].x2, displayList[i].y2, displayList[i].lineWidth, displayList[i].lineColor);
                break;
            case "filledTriangle" : 
                drawFilledTriangle(ctx1, displayList[i].x, displayList[i].y, displayList[i].x2, displayList[i].y2, displayList[i].lineWidth, displayList[i].lineColor, displayList[i].fillColor);
        }
    }
}


// mus hendelser

function mouseDown(evt) {
    
    canvas2.onmousemove = mouseMove;

    x = evt.clientX - canvasLeft;
    y = evt.clientY - canvasTop;
}

var xPoints = [];
var yPoints = [];

function mouseMove(evt) {
    var x2 = evt.clientX - canvasLeft;
    var y2 = evt.clientY - canvasTop;
    var lineWidth = getLineWidth();
    var lineColor = getLineColor();
    var fillColor = getFillColor();
    var radius = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
    
    switch (currentTool) {
        case "freeDraw" : 
            xPoints.push(x2);
            yPoints.push(y2);
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawFree(ctx2, x, y, xPoints, yPoints, lineWidth, lineColor);
            break;
        case "line" : 
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawLine(ctx2, x, y, x2, y2, lineWidth, lineColor);
            break;
        case "circle" :
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawCircle(ctx2, x, y, radius, lineWidth, lineColor);
            break;
        case "filledCircle" :
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawFilledCircle(ctx2, x, y, radius, lineWidth, lineColor, fillColor);
            break;
        case "rect" :
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawRect(ctx2, x, y, x2, y2, lineWidth, lineColor);
            break;
        case "filledRect" :
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawFilledRect(ctx2, x, y, x2, y2, lineWidth, lineColor, fillColor);
            break;
        case "triangle" : 
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawTriangle(ctx2, x, y, x2, y2, lineWidth, lineColor);
            break;
        case "filledTriangle" : 
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawFilledTriangle(ctx2, x, y, x2, y2, lineWidth, lineColor, fillColor);
            break;
        case "layer" :

            var minX, minY, maxX, maxY;

            var travelX = x2 - x;
            var travelY = y2 - y;

            var selectedLayer = displayList[layerId];

            if (selectedLayer.type === "freeDraw") {
                minX = Math.min.apply(Math, selectedLayer.x2);
                minY = Math.min.apply(Math, selectedLayer.y2);
                maxX = Math.max.apply(Math, selectedLayer.x2);
                maxY = Math.max.apply(Math, selectedLayer.y2);
            } else if (selectedLayer.type === "circle" || selectedLayer.type === "filledCircle") {
                minX = selectedLayer.x - selectedLayer.radius;
                minY = selectedLayer.y - selectedLayer.radius;
                maxX = selectedLayer.x + selectedLayer.radius;
                maxY = selectedLayer.y + selectedLayer.radius;
            } else {
                minX = Math.min.apply(Math, [selectedLayer.x, selectedLayer.x2]);
                minY = Math.min.apply(Math, [selectedLayer.y, selectedLayer.y2]);
                maxX = Math.max.apply(Math, [selectedLayer.x, selectedLayer.x2]);
                maxY = Math.max.apply(Math, [selectedLayer.y, selectedLayer.y2]);
            }

            if (x > minX - 10 && y > minY - 10 && x < maxX + 10 && y < maxY + 10) {

                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                ctx2.setLineDash([10, 5]);
                drawFilledRect(ctx2, minX - 10 + travelX, minY - 10 + travelY, maxX + 10 + travelX, maxY + 10 + travelY, 1, "black", "rgba(255,255,255,0.2)");
                ctx2.setLineDash([]);

                switch(selectedLayer.type) {
                    case "freeDraw" :

                        var xPointsWithTravel = [];
                        var yPointsWithTravel = [];

                        for (var i = 0; i < displayList[layerId].x2.length; i++) {
                            xPointsWithTravel[i] = selectedLayer.x2[i] + travelX;
                            yPointsWithTravel[i] = selectedLayer.y2[i] + travelY;
                        }
                        drawFree(ctx2, selectedLayer.x + travelX, selectedLayer.y + travelY, xPointsWithTravel, yPointsWithTravel, selectedLayer.lineWidth, selectedLayer.lineColor);

                        break;
                    case "line" :
                        drawLine(ctx2, selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.x2 + travelX, selectedLayer.y2 + travelY, selectedLayer.lineWidth, selectedLayer.lineColor);
                        break;
                    case "rect" :
                        drawRect(ctx2, selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.x2 + travelX, selectedLayer.y2 + travelY, selectedLayer.lineWidth, selectedLayer.lineColor);
                        break;
                    case "filledRect" :
                        drawFilledRect(ctx2, selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.x2 + travelX, selectedLayer.y2 + travelY, selectedLayer.lineWidth, selectedLayer.lineColor, selectedLayer.fillColor);
                        break;
                    case "circle" :
                        drawCircle(ctx2, selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.radius, selectedLayer.lineWidth, selectedLayer.lineColor);
                        break;
                    case "filledCircle" :
                        drawFilledCircle(ctx2, selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.radius, selectedLayer.lineWidth, selectedLayer.lineColor, selectedLayer.fillColor);
                        break;
                    case "triangle" :
                        drawTriangle(ctx2, selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.x2 + travelX, selectedLayer.y2 + travelY, selectedLayer.lineWidth, selectedLayer.lineColor);
                        break;
                    case "filledTriangle" :
                        drawFilledTriangle(ctx2, selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.x2 + travelX, selectedLayer.y2 + travelY, selectedLayer.lineWidth, selectedLayer.lineColor, selectedLayer.fillColor);
                }
            }
    }
}

function mouseUp(evt) {
    if (currentTool != "layer") {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    }
    canvas2.onmousemove = mouseOver;
    var layer;
    var x2 = evt.clientX - canvasLeft;
    var y2 = evt.clientY - canvasTop;
    var lineWidth = getLineWidth();
    var lineColor = getLineColor();
    var fillColor = getFillColor();
    var radius = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
    
    switch (currentTool) {
        case "freeDraw" :
            layer = new freeDrawing(currentTool, x, y, xPoints, yPoints, lineWidth, lineColor);
            
            xPoints = [];
            yPoints = [];
            
            displayList.push(layer);
            break;
        case "line" : 
            layer = new line(currentTool, x, y, x2, y2, lineWidth, lineColor);
            displayList.push(layer);
            break;
        case "circle" :
            layer = new circle(currentTool, x, y, radius, lineWidth, lineColor);
            displayList.push(layer);
            break;
        case "filledCircle" :
            layer = new filledCircle(currentTool, x, y, radius, lineWidth, lineColor, fillColor);
            displayList.push(layer);
            break;
        case "rect" :
            layer = new rect(currentTool, x, y, x2, y2, lineWidth, lineColor);
            displayList.push(layer);
            break;
        case "filledRect" :
            layer = new filledRect(currentTool, x, y, x2, y2, lineWidth, lineColor, fillColor);
            displayList.push(layer);
            break;
        case "triangle" :
            layer = new triangle(currentTool, x, y, x2, y2, lineWidth, lineColor);
            displayList.push(layer);
            break;
        case "filledTriangle" : 
            layer = new filledTriangle(currentTool, x, y, x2, y2, lineWidth, lineColor, fillColor);
            displayList.push(layer);
            break;
        case "layer" :

            var minX, minY, maxX, maxY;

            var travelX = x2 - x;
            var travelY = y2 - y;

            var selectedLayer = displayList[layerId];

            if (selectedLayer.type === "freeDraw") {
                minX = Math.min.apply(Math, selectedLayer.x2);
                minY = Math.min.apply(Math, selectedLayer.y2);
                maxX = Math.max.apply(Math, selectedLayer.x2);
                maxY = Math.max.apply(Math, selectedLayer.y2);
            } else if (selectedLayer.type === "circle" || selectedLayer.type === "filledCircle") {
                minX = selectedLayer.x - selectedLayer.radius;
                minY = selectedLayer.y - selectedLayer.radius;
                maxX = selectedLayer.x + selectedLayer.radius;
                maxY = selectedLayer.y + selectedLayer.radius;
            } else {
                minX = Math.min.apply(Math, [selectedLayer.x, selectedLayer.x2]);
                minY = Math.min.apply(Math, [selectedLayer.y, selectedLayer.y2]);
                maxX = Math.max.apply(Math, [selectedLayer.x, selectedLayer.x2]);
                maxY = Math.max.apply(Math, [selectedLayer.y, selectedLayer.y2]);
            }



            if (x > minX - 10 && y > minY - 10 && x < maxX + 10 && y < maxY + 10) {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

                ctx2.setLineDash([10, 5]);
                drawFilledRect(ctx2, minX - 10 + travelX, minY - 10 + travelY, maxX + 10 + travelX, maxY + 10 + travelY, 1, "black", "rgba(255,255,255,0.2)");
                ctx2.setLineDash([]);

                switch(selectedLayer.type) {
                    case "freeDraw" :
                        var xPointsWithTravel = [];
                        var yPointsWithTravel = [];

                        for (var i = 0; i < displayList[layerId].x2.length; i++) {
                            xPointsWithTravel[i] = selectedLayer.x2[i] + travelX;
                            yPointsWithTravel[i] = selectedLayer.y2[i] + travelY;
                        }
                        displayList[layerId] = new freeDrawing("freeDraw", selectedLayer.x + travelX, selectedLayer.y + travelY, xPointsWithTravel, yPointsWithTravel, selectedLayer.lineWidth, selectedLayer.lineColor);
                        break;
                    case "line" :
                        displayList[layerId] = new line("line", selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.x2 + travelX, selectedLayer.y2 + travelY, selectedLayer.lineWidth, selectedLayer.lineColor);
                        break;
                    case "rect" :
                        displayList[layerId] = new rect("rect", selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.x2 + travelX, selectedLayer.y2 + travelY, selectedLayer.lineWidth, selectedLayer.lineColor);
                        break;
                    case "filledRect" :
                        displayList[layerId] = new filledRect("filledRect", selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.x2 + travelX, selectedLayer.y2 + travelY, selectedLayer.lineWidth, selectedLayer.lineColor, selectedLayer.fillColor);
                        break;
                    case "circle" :
                        displayList[layerId] = new circle("circle", selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.radius, selectedLayer.lineWidth, selectedLayer.lineColor);
                        break;
                    case "filledCircle" :
                        displayList[layerId] = new filledCircle("filledCircle", selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.radius, selectedLayer.lineWidth, selectedLayer.lineColor, selectedLayer.fillColor);
                        break;
                    case "triangle" :
                        displayList[layerId] = new triangle("triangle", selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.x2 + travelX, selectedLayer.y2 + travelY, selectedLayer.lineWidth, selectedLayer.lineColor);
                        break;
                    case "filledTriangle" :
                        displayList[layerId] = new filledTriangle("filledTriangle", selectedLayer.x + travelX, selectedLayer.y + travelY, selectedLayer.x2 + travelX, selectedLayer.y2 + travelY, selectedLayer.lineWidth, selectedLayer.lineColor, selectedLayer.fillColor);
                }
            }
        }
    renderCanvas();
    layersList();
}

function mouseOver(evt) {
    if (currentTool === "layer") {

        x = evt.clientX - canvasLeft;
        y = evt.clientY - canvasTop;

        var minX, minY, maxX, maxY;
        var selectedLayer = displayList[layerId];

        if (selectedLayer.type === "freeDraw") {
            minX = Math.min.apply(Math, selectedLayer.x2);
            minY = Math.min.apply(Math, selectedLayer.y2);
            maxX = Math.max.apply(Math, selectedLayer.x2);
            maxY = Math.max.apply(Math, selectedLayer.y2);
        } else if (selectedLayer.type === "circle" || selectedLayer.type === "filledCircle") {
            minX = selectedLayer.x - selectedLayer.radius;
            minY = selectedLayer.y - selectedLayer.radius;
            maxX = selectedLayer.x + selectedLayer.radius;
            maxY = selectedLayer.y + selectedLayer.radius;
        } else {
            minX = Math.min.apply(Math, [selectedLayer.x, selectedLayer.x2]);
            minY = Math.min.apply(Math, [selectedLayer.y, selectedLayer.y2]);
            maxX = Math.max.apply(Math, [selectedLayer.x, selectedLayer.x2]);
            maxY = Math.max.apply(Math, [selectedLayer.y, selectedLayer.y2]);
        }

        if (x > minX - 10 && y > minY - 10 && x < maxX + 10 && y < maxY + 10) {
            canvas2.style.cursor = "move";
        } else {
            canvas2.style.cursor = "crosshair";
        }
    }
}


// controls

function getLineColor() {
    return document.getElementById("lineColorInput").value;
}

function getFillColor() {
    return document.getElementById("fillColorInput").value;
}

function getLineWidth() {
    return Number(document.getElementById("lineWidthInput").value);
}

function undo() {
    if (displayList.length > 0) {
        log.unshift(displayList.pop());
        renderCanvas();
    }   
}

function redo() {
    if (log.length > 0) {
        displayList.push(log.shift());
        renderCanvas();
    }
}

function backgroundImage() {
	var fileReader = new FileReader();
	var input = document.getElementById("backgroundInput");
    
	fileReader.onload = function(e){
		canvas1.style.backgroundImage = 'url(' + fileReader.result + ')';
	};
	fileReader.readAsDataURL(input.files[0]);   
}

function backgroundColor() {
    canvas1.style.backgroundImage = "none";
    var color = document.getElementById("backgroundColor").value;
    canvas1.style.backgroundColor = color;
}

function deleteDrawing() {
    if (confirm("Er du sikker?") == true) {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        displayList = [];
        canvas1.style.backgroundImage = "none";
        canvas1.style.backgroundColor = "white";
        document.getElementById("backgroundColor").value = "#ffffff";
    }
}

function demo(file) {
    canvas1.style.backgroundImage = 'url(bilder/' + file + ')';
}

function saveDrawing() {
    
    var name = document.getElementById("name").value;
    
    if (displayList.length > 0) {
        if (name === "") {
            alert("Bilde mangler navn");
        } else {
            if (localStorage.getItem("projects") === null) {
                var projects = [];
            } else {
                var projects = JSON.parse(localStorage.getItem("projects"));
            }
            if (projects.includes(name)) {
                alert("Filen " + name + " eksisterer allerede");
            } else {
                projects.push(String(name));
                localStorage.setItem("projects", JSON.stringify(projects));
                localStorage.setItem(name, JSON.stringify(displayList));
                fileList();
            }
        }
    } else {
        alert("Du har ikke tegnet noe");
    }
}

function fileList() {
    var fileList = document.getElementById("files");
    var tx = "";
    
    while (fileList.firstChild) {
        fileList.removeChild(fileList.firstChild);
    }
    
    if (localStorage.getItem("projects") === null) {
        tx = "<p>no files</p>";
    } else {
        var fileNames = JSON.parse(localStorage.getItem("projects"));
        
        for (var i = 0; i < fileNames.length; i++) {

            // Dette fungerte ikke og jeg har ingen anelse hvorfor
            //
            //var li = document.createElement("li");
            //var tx = document.createTextNode(fileNames[i]);
            //li.append(tx);
            //li.onclick = function () {
            //    openFile(fileNames[i]);
            //}
            //fileList.append(li);
            
            tx += "<li onclick=\"openFile('" + fileNames[i] + "')\">" + fileNames[i] + "</li>";
        }
    }
    fileList.innerHTML = tx;
}

function openFile(name) {
    displayList = JSON.parse(localStorage.getItem(name));
    renderCanvas();
    layersList();
}

function layersList() {

    var layerList = document.getElementById("layers");
    var tx = "";

    if (displayList.length > 0) {
        for (var i = 0; i < displayList.length; i++) {

            //var li = document.createElement("li");
            //var tx = document.createTextNode("Figur" + (i + 1));
            //li.append(tx);
            //li.onclick = function () {
            //    selectLayer(i - 1);
            //    changeTool();
            //}
            //layerList.append(li);

            if (layerId === i) {
                tx += "<li class=\"active\" id=\"layer" + i + "\" onclick=\"selectLayer(" + i + ")\">layer" + (i + 1) + "</li>";
            } else {
                tx += "<li id=\"layer" + i + "\" onclick=\"selectLayer(" + i + ")\">layer" + (i + 1) + "</li>";
            }
        }
    } else {
        tx = "<p>no layers</p";
    }
    layerList.innerHTML = tx;
}

function selectLayer(id) {

    layerId = id;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    document.getElementsByClassName("active")[0].classList.remove("active");
    document.getElementById("layer" + layerId).classList.add("active");
    currentTool = "layer";

    var minX, minY, maxX, maxY;

    var selectedLayer = displayList[id];

    if (selectedLayer.type === "freeDraw") {
        minX = Math.min.apply(Math, selectedLayer.x2);
        minY = Math.min.apply(Math, selectedLayer.y2);
        maxX = Math.max.apply(Math, selectedLayer.x2);
        maxY = Math.max.apply(Math, selectedLayer.y2);
    } else if (selectedLayer.type === "circle" || selectedLayer.type === "filledCircle") {
        minX = selectedLayer.x - selectedLayer.radius;
        minY = selectedLayer.y - selectedLayer.radius;
        maxX = selectedLayer.x + selectedLayer.radius;
        maxY = selectedLayer.y + selectedLayer.radius;
    } else {
        minX = Math.min.apply(Math, [selectedLayer.x, selectedLayer.x2]);
        minY = Math.min.apply(Math, [selectedLayer.y, selectedLayer.y2]);
        maxX = Math.max.apply(Math, [selectedLayer.x, selectedLayer.x2]);
        maxY = Math.max.apply(Math, [selectedLayer.y, selectedLayer.y2]);
    }

    /*switch(selectedLayer.type) {
        case "line" :
            drawLine(ctx2, selectedLayer.x, selectedLayer.y, selectedLayer.x2, selectedLayer.y2, selectedLayer.lineWidth, selectedLayer.lineColor);
            break;
        case "freeDraw" :
            drawFree(ctx2, selectedLayer.x, selectedLayer.y, selectedLayer.x2, selectedLayer.y2, selectedLayer.lineWidth, selectedLayer.lineColor);
    }*/
    ctx2.setLineDash([10, 5]);
    drawFilledRect(ctx2, minX - 10, minY - 10, maxX + 10, maxY + 10, 1, "black", "rgba(255,255,255,0.2)");
    ctx2.setLineDash([]);
}
