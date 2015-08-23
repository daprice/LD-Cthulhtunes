//the tentacular terror
function Tentacle(game, x, y, side, note) {
	this.count = Math.random() * 360;
	this.note = note;
	this.amplitude = Math.random() * 6 + 3;
	this.game = game;
	this.side = side;
	this.prevActive = false;
	this.controlLabel;
	
	this.shown = false;
	
	this.points = [];
	if(this.side == 'right') {
		for(var x = 0; x < 500; x += 50) {
			this.points.push(new Phaser.Point(x + 100, 0));
		}
	}
	else {
		for(var x = 500; x > 0; x -= 50) {
			this.points.push(new Phaser.Point(x - 100, 0));
		}
	}
	
	this.r = this.game.add.rope(x, y, 'tentacle', null, this.points);
	
	var controls = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'];
	var textX = x + 250;
	var textY = y;
	if(this.side == 'right')
		textX = x + 250;
	if(this.side == 'left')
		textY = y - 30;
	
	this.controlLabel = this.game.add.text(textX, textY, controls[this.note], {fill:'#DEE'});
}

Tentacle.prototype.update = function(active) {
	if(active) { //if this tentacle is playing a note
		this.count += (this.note+1) / 2 * 0.08 + 0.07;
		
		for (var i = 0; i < this.points.length; i++)
	    {
	        this.points[i].y = Math.sin(i * 0.5 + this.count) * this.amplitude * (10-i);
	    }
	    
	    //play sound
	    if(evilsoundready && !this.prevActive) {
		    evilsounds[this.note].loopFull();
		    playerSequence.push(this.note);
		    console.log('playing note ' + this.note);
		    if(this.controlLabel) this.controlLabel.visible = false;
	    }
	    else if(!evilsoundready) {
		    alert('Error loading tentacle sounds.');
	    }
		
		gameProgression.resetRecordingTimer();
	    
	    this.prevActive = true;
	}
	else { //if this tentacle is not playing a note
		evilsounds[this.note].stop();
		this.prevActive = false;
	}
};