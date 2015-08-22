//the tentacular terror
function Tentacle(game, x, y, side, note) {
	this.count = Math.random() * 360;
	this.note = note + 1;
	this.amplitude = Math.random() * 6 + 3;
	this.game = game;
	this.side = side;
	
	this.shown = false;
	
	this.points = [];
	if(this.side == 'right') {
		for(var x = 0; x < 500; x += 50) {
			this.points.push(new Phaser.Point(x - 100, 0));
		}
	}
	else {
		for(var x = 500; x > 0; x -= 50) {
			this.points.push(new Phaser.Point(x - 100, 0));
		}
	}
	
	this.r = this.game.add.rope(x, y, 'tentacle', null, this.points);
}

Tentacle.prototype.update = function() {
	this.count += this.note / 2 * 0.08 + 0.07;
	
	for (var i = 0; i < this.points.length; i++)
    {
        this.points[i].y = Math.sin(i * 0.5 + this.count) * this.amplitude * (10-i);
    }
};