//the tentacular terror
function Tentacle(game, x, y) {
	this.game = game;
	
	this.length = 40;
	this.height = 8;
	this.width = 20;
	this.maxForce = 20000;
	this.xAnchor = 200;
}

Tentacle.prototype.create = function() {
	var lastRect;
	
	for(var i = 0; i <= this.length; i++) {
		var x = this.xAnchor;
		var i = i * this.height;
		newRect = this.game.add.sprite(x, y, 'tentacle');
		this.game.physics.p2.enable(newRect, false);
		newRect.body.setRectangle(this.width, this.height);
		if(i == 0){newRect.body.static = true;}
		else {
			newRect.body.mass = this.length / i;
		}
	}
}

Tentacle.prototype.update = function() {
	if(this.side == 'right') {
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.U)) this.points[0].y --;
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.I)) this.points[1].y --;
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.O)) this.points[2].y --;
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)) this.points[3].y --;
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.J)) this.points[0].y ++;
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.K)) this.points[1].y ++;
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.L)) this.points[2].y ++;
		if(this.game.input.keyboard.isDown(186)) this.points[3].y ++;
	}
}