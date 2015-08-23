//a mortal
function Mortal(game, x, y, instrument) {
	this.game = game;
	this.instrument = instrument;
	this.status = ''; //'' or '_possessed'
	this.currentNote = 0;
	
	this.walkTarget = {x: x, y: y};
	this.walkSpeed = 3;
	this.walking = false;
	
	this.s = this.game.add.sprite(x, y, 'mortal_'+instrument);
	
	this.s.animations.add('idle', [0], 10, true);
	this.s.animations.add('walk', [1,0,2,0], 5, true);
	this.s.animations.add('play_0', [3], 2, true);
	this.s.animations.add('play_1', [4], 2, true);
	this.s.animations.add('play_2', [5], 2, true);
	this.s.animations.add('play_3', [6], 2, true);
	this.s.animations.add('play_4', [10], 2, true);
	this.s.animations.add('play_5', [9], 2, true);
	this.s.animations.add('play_6', [8], 2, true);
	this.s.animations.add('play_7', [7], 2, true);
	this.s.animations.add('play_possessed_0', [13], 2, true);
	this.s.animations.add('play_possessed_1', [14], 2, true);
	this.s.animations.add('play_possessed_2', [15], 2, true);
	this.s.animations.add('play_possessed_3', [16], 2, true);
	this.s.animations.add('play_possessed_4', [20], 2, true);
	this.s.animations.add('play_possessed_5', [19], 2, true);
	this.s.animations.add('play_possessed_6', [18], 2, true);
	this.s.animations.add('play_possessed_7', [17], 2, true);
	this.s.animations.add('idle_possessed', [11], 10, true);
	this.s.animations.add('possess', [12, 11, 12,11,12,11,12,11,12,11], 5, false);
	this.s.animations.add('possess_fail', [12, 11, 12,11,12,0], 5, false);
}

Mortal.prototype.playNote = function(note) {
	var instrument_offset = 0;
	if(mortalsoundready) mortalsounds[note+instrument_offset].loopFull(0.2);
	this.currentNote = note+instrument_offset;
	
	var animationName = 'play' + this.status + '_' + note;
	this.s.animations.play(animationName);
};

Mortal.prototype.stop = function() {
	var instrument_offset = 0;
	mortalsounds[this.currentNote+instrument_offset].stop();
	this.s.animations.play('idle'+this.status);
}

Mortal.prototype.walkTo = function(x, y) {
	this.walkTarget.x = x; this.walkTarget.y = y;
};

Mortal.prototype.update = function() {
	var xDiff = this.walkTarget.x - this.s.x;
	var yDiff = this.walkTarget.y - this.s.y;
	var walking = false;
	var wasWalking = this.walking;
	
	if(xDiff > this.walkSpeed) {
		if(xDiff > 0) {
			this.s.x += this.walkSpeed;
		}
		else if(xDiff < 0) {
			this.s.x -= this.walkSpeed;
		}
		walking = true;
	}
	if(yDiff > this.walkSpeed) {
		if(yDiff > 0) {
			this.s.y += this.walkSpeed;
		}
		else if(yDiff < 0) {
			this.s.y -= this.walkSpeed;
		}
		walking = true;
	}
	
	if(walking) {
		this.s.animations.play('walk');
		this.walking = true;
	}
	else {
		this.walking = false;
		if(wasWalking) {
			this.s.animations.play('idle'+this.status);
		}
	}
};

Mortal.prototype.possess = function(stay) {
	if(stay) {
		this.s.animations.play('possess');
		this.status = '_possessed';
	}
	else this.s.animations.play('possess_fail');
}