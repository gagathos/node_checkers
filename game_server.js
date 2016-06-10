var http = require('http');
var startTime = new Date();
//var JSON = require('JSON');



var gameState = {
map : new gameBoard(8,8),
players : [],

}

http.createServer(function(req, res) {

//var gameState = require('url').parse(req.url, true);
	res.writeHead(200, {'Content-Type': 'text/json'});
res.write(JSON.stringify(gameState));
res.end();
}).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');

//I guess I could turn this OOP and have it return itself?
function gameBoard(width, height){
this.board = [];
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
	if(value.number % 2 == 0){
		//if it's in the top 3 rows
		if(value.y >= height -3) pieces.push(new GamePiece(2,value.x,value.y));
		//if it's in the bottom 3 rows
		if(value.y <= 3) pieces.push(new GamePiece(1, value.x, value.y));
	}
}
})(this.pieces));

}

function GamePiece(team, currentX, currentY){
	this.team = team;
	this.currentX = currentX;
	this.currentY = currentY;
}

function boardSpace(number, x, y){
	//right now just record the number.  We can use this to assign colors etc
	this.number = number;
	this.x = x;
	this.y = y;
}
