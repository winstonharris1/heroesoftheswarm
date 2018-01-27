const SERVER_URL = "ws://159.203.171.13:8080";
const PROTOCOL = "heroesoftheswarm";
const FPS = 30;
const PINGS_PER_FRAME = 1;
var GLOBAL_STATE_NO_TOUCH;

function main() {
    var ws = initializeWebSocket(SERVER_URL, PROTOCOL, function(event) {GLOBAL_STATE_NO_TOUCH = event.data;});
    setTimeout(pingServer, 500, ws);
    var ctx = initializeCanvas();
    
	drawCircle(ctx);
	drawRect(ctx);
	shoot(ctx);
}

function initializeCanvas() {
	// Get the canvas
	var ctx = document.getElementById("game_canvas").getContext("2d");
	// Set up the context
	ctx.globalCompositeOperation = 'destination-over';
	return ctx;
}

function drawRect(ctx) {
	//ctx.clearRect(0, 0, game_canvas.width, game_canvas.height); // clear canvas

    ctx.beginPath();
    ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, game_canvas.width, game_canvas.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
	
	
}

function shoot(ctx){
	var rect={rectY : 200, rectW :40 , rectX : -rectX};

	ctx.fillStyle= "yellow";
	ctx.fillRect(rectX,rectY,rectW,rectW);
	setInterval(anim, 30);
}	
function anim() {
		if (rectX < game_canvas.width) {
			rectX += 5;
			ctx.fillStyle = "yellow";
			ctx.strokeStyle = "red";
			ctx.lineWidth = 3;
			ctx.fillRect(rectX,rectY,rectW,rectW);
			ctx.strokeRect(0,rectY,rectW,rectW);
			}
			else rectX=-rectW;
			

}
function drawCircle(ctx) {
    
	var centerX = game_canvas.width / 2;
	var centerY = game_canvas.height / 2;
    ctx.beginPath();
    ctx.arc(centerX-100, centerY, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(0,0,255,0.75';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(0,150,0,0.75';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX-50, centerY, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle =  'rgba(0,0,255,0.75';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(100,200,0,0.75';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle =  'rgba(0,0,255,0.75';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(255,255,0,0.75';
    ctx.stroke();
	

    ctx.beginPath();
    ctx.arc(centerX+50, centerY, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle =  'rgba(0,0,255,0.75';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(255,150,0,.75';
    ctx.stroke();
	
    ctx.beginPath();
    ctx.arc(centerX+100, centerY, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle =  'rgba(0,0,255,0.75';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(255,0,0,.75';
    ctx.stroke();
	
}

// Creates an individual in a swarm

function drawIndiv(ctx){
	
	//ctx.clearRect(0, 0, game_canvas.width, game_canvas.height); // clear canvas
	var centerX = game_canvas.width / 2;
	var centerY = game_canvas.height / 2;
	ctx.beginPath();
	ctx.lineWidth = 15;
	ctx.strokeStyle="black";					
	ctx.lineJoin="miter";
	ctx.moveTo(325,150);
	ctx.lineTo(centerX,centerY);
	ctx.lineTo(425,150);
	ctx.stroke();						
}

function initializeWebSocket(url, protocol, onmessage) {
    // Initialize the websocket
    var ws = new WebSocket(url, protocol);
    // This is run when the server sends us something. It should handle all the different types of messages
    ws.onmessage = onmessage;
    // This is run when something fscks up
    ws.onerror = function (event) {
        console.log(event.data);
    }
    return ws;
}

function pingServer(ws) {
    ws.send("U");
    setTimeout(pingServer, 1000 / FPS / PINGS_PER_FRAME, ws);
}

function getState() {
    return GLOBAL_STATE_NO_TOUCH;
}

function vec2(x, y) {
    this.x = x;
    this.y = y;
    this.magn = function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
}
