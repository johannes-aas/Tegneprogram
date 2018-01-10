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
    currentTool = "freeDraw";

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
    
    var boundingRect = canvas2.getBoundingClientRect();
    canvasTop = boundingRect.top;
    canvasLeft = boundingRect.left;
    
    canvas2.onmousedown = mouseDown;
	canvas2.onmouseup = mouseUp;
    
    document.getElementById("undo").onclick = undo;
    document.getElementById("redo").onclick = redo;
    document.getElementById("lineColorInput").onchange = getLineColor;
    document.getElementById("fillColorInput").onchange = getFillColor;
    document.getElementById("lineWidthInput").onchange = getLineWidth;
    document.getElementById("backgroundInput").onchange = backgroundImage;
    document.getElementById("backgroundColor").onchange = backgroundColor;
    document.getElementById("delete").onclick = deleteDrawing;
    document.getElementById("saveBtn").onclick = saveDrawing;
    
    initTools();
    fileList();
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
}


// bruker displayList til å tegne alle objekt
function renderCanvas() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    
    
    for (var i = 0; i < displayList.length; i++) {
        
        var type = displayList[i].type;
        
        switch (displayList[i].type) {
            case "freeDraw" : 
                drawFree(ctx1, displayList[i].x, displayList[i].y, displayList[i].xPoints, displayList[i].yPoints, displayList[i].lineWidth, displayList[i].lineColor);
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
        //displayList[i].draw();
    }
}


// mus hendelser

function mouseDown(evt) {
    
    x = evt.clientX - canvasLeft;
    y = evt.clientY - canvasTop;
    
    canvas2.onmousemove = mouseMove;
}

// liste over x og y verdier for frihåndstegninger
var xPoints = [];
var yPoints = [];

function mouseMove(evt) {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        
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
            
            drawFree(ctx2, x, y, xPoints, yPoints, lineWidth, lineColor);
            break;
        case "line" : 
            drawLine(ctx2, x, y, x2, y2, lineWidth, lineColor);
            break;
        case "circle" :
            drawCircle(ctx2, x, y, radius, lineWidth, lineColor);
            break;
        case "filledCircle" : 
            drawFilledCircle(ctx2, x, y, radius, lineWidth, lineColor, fillColor);
            break;
        case "rect" :
            drawRect(ctx2, x, y, x2, y2, lineWidth, lineColor);
            break;
        case "filledRect" :
            drawFilledRect(ctx2, x, y, x2, y2, lineWidth, lineColor, fillColor);
            break;
        case "triangle" : 
            drawTriangle(ctx2, x, y, x2, y2, lineWidth, lineColor);
            break;
        case "filledTriangle" : 
            drawFilledTriangle(ctx2, x, y, x2, y2, lineWidth, lineColor, fillColor);
    }
}

function mouseUp(evt) {
    canvas2.onmousemove = null;
    
    var layer;
    var x2 = evt.clientX - canvasLeft;
    var y2 = evt.clientY - canvasTop;
    var lineWidth = getLineWidth();
    var lineColor = getLineColor();
    var fillColor = getFillColor();
    var radius = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
    
    switch (currentTool) {
        case "freeDraw" :
            layer = new freeDrawing(x, y, xPoints, yPoints, lineWidth, lineColor);
            
            xPoints = [];
            yPoints = [];
            
            break;
        case "line" : 
            layer = new line(x, y, x2, y2, lineWidth, lineColor);
            break;
        case "circle" :
            layer = new circle(x, y, radius, lineWidth, lineColor);
            break;
        case "filledCircle" :
            layer = new filledCircle(x, y, radius, lineWidth, lineColor, fillColor);
            break;
        case "rect" :
            layer = new rect(x, y, x2, y2, lineWidth, lineColor);
            break;
        case "filledRect" :
            layer = new filledRect(x, y, x2, y2, lineWidth, lineColor, fillColor);
            break;
        case "triangle" :
            layer = new triangle(x, y, x2, y2, lineWidth, lineColor);
            break;
        case "filledTriangle" : 
            layer = new filledTriangle(x, y, x2, y2, lineWidth, lineColor, fillColor);
    }
        
    displayList.push(layer);
    renderCanvas();
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
    
    while (fileList.firstChild) {
        fileList.removeChild(fileList.firstChild);
    }
    
    if (localStorage.getItem("projects") === null) {
        fileList.innerHTML = "<p>ingen filer</p>";
    } else {
        var fileNames = JSON.parse(localStorage.getItem("projects"));
        var tx = "";
        
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
        
        fileList.innerHTML = tx;
    }
}

function openFile(name) {
    console.log(this.id);
        
    displayList = JSON.parse(localStorage.getItem(name));
    renderCanvas();
}
