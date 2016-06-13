var http = require('http');
const fs = require('fs');
var startTime = new Date();

var gameState = {
	map : new gameBoard(8,8),
	players : [],
}

//Start HTTP Server
var ip = "192.168.1.18";
http.createServer(function(req, res) {
	console.log("Request received");
	//we only want to serve game states from this script.  Front-end/web pages etc can be served from any other code, it doesn't matter.
	//we may want to host a helper javascript code here though that works well with this library.
	switch(req.method){
	case "GET":	
	//if(require('url', true).parse(req.url).)
	var url = require('url').parse(req.url, true);
	var query = url.query;
	if(query.html == "true"){
		console.log('serving html');
				res.writeHead(200, {'Content-Type': 'text/html'});
	 			
				var index = fs.readFileSync('test.html')
				res.write(index);
        res.end();
	} else if (url.pathname.split('.').pop() == "png" ) {
	//	console.log(url);
			console.log('serving image');
				res.writeHead(200, {'Content-Type': 'image/png'});
	 			
				var index = fs.readFileSync(url.pathname.substring(1)); //This is necessary because of slash in url object pathname
				res.write(index);
        res.end();
		
	} else {
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.write(JSON.stringify(gameState));
		res.end();
	}
	break;
	case "POST":
	//here we are receiving a command or input from the client
	break;
	case "DELETE":
	//not sure if we want to implement this
	break;
	}
	console.log("Response sent");
	}).listen(8124, ip);
console.log('Server running at http://'+ip+':8124/');


/* Classes */

function gameBoard(width, height){
	this.board = [];
	this.width = width;
	this.height = height;
	var spaceNumber = 0;
	for(i = 0; i < width; i++){
		
		for(j=0; j< height; j++){
			this.board[spaceNumber] = new boardSpace(spaceNumber, i, j);
			spaceNumber++;
		}
	}
	//Now let's add the pieces
	this.pieces = [];
	this.board.forEach((function(pieces){
		
		return function(value){
			//only dark spots
			if((Math.abs(value.x - value.y))%2 == 1){
				//if it's in the bottom 3 rows
				var length = pieces.length;
				if(value.y >= height -3) pieces.push(new GamePiece(2,value.x,value.y,length ));
				//if it's in the top 3 rows (includes row 0)
				if(value.y <= 2) pieces.push(new GamePiece(1, value.x, value.y, length));
			}
		}
	})(this.pieces));

}
var pieceID = 0;
function GamePiece(team, currentX, currentY, number){
	this.team = team;
	this.number = number;
	this.currentX = currentX;
	this.currentY = currentY;
}

function boardSpace(number, x, y){
	//right now just record the number.  We can use this to assign colors etc by checking if it's odd or even
	this.number = number;
	this.x = x;
	this.y = y;
}
