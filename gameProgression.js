function GameProgression(game) {
	this.level = 1;
	this.currentSequence;
	this.currentPosition = 0;
	this.game = game;
	this.timer;
}

GameProgression.prototype.beginLevel = function(keepSequence) {
	this.timer = this.game.time.create(true);
	flautist.walkTo(455, 300);
	if(!keepSequence) this.currentSequence = genSequence(this.level);
	this.currentPosition = 0;
	
	console.log('starting level with length ' + this.level + ' and sequence ' + this.currentSequence);
	
	for(var i = 0; i < this.level; i++) {
		this.timer.add(5000 + i * 1000, this.playNote, this);
	}
	//start recording when flautist is done
	this.timer.add(5800 + this.level-1*1000, this.startRecording, this);
	
	//check player after giving them time to play
	this.timer.add(5800 + this.level*1000 + 1000 + this.level*1000, this.checkRecording, this);
	
	this.timer.start();
};

GameProgression.prototype.playNote = function() {
	console.log('telling flautist to play ' + this.currentSequence[this.currentPosition]);
	flautist.playNote(this.currentSequence[this.currentPosition]);
	this.currentPosition++;
	var stopTimer = this.game.time.create(true);
	stopTimer.add(800, flautist.stop, flautist);
	stopTimer.start();
};

GameProgression.prototype.startRecording = function() {
	console.log('beginning recording player');
	playerSequence = new Array();
};

GameProgression.prototype.checkRecording = function() {
	console.log('checking player\'s recording');
	console.log('player: ' + playerSequence);
	console.log('flautist: ' + this.currentSequence);
	var recordingCorrect = false;
	//check flautist recording against player recording
	for(n in playerSequence) {
		if(this.currentSequence[n] && playerSequence[n] == this.currentSequence[n]) {
			recordingCorrect = true;
		}
		else {
			recordingCorrect = false;
			break;
		}
	}
	//check player recording against flautist recording
	if(recordingCorrect) for(n in this.currentSequence) {
		if(playerSequence[n] && playerSequence[n] == this.currentSequence[n]) {
			recordingCorrect = true;
		}
		else {
			recordingCorrect = false;
			break;
		}
	}
	
	if(recordingCorrect) {
		//if there is still more to play
		if(this.level < 5) {
			flautist.possess(false);
			this.level++;
			this.beginLevel(false);
		}
		else { //if game is done
			flautist.possess(true);
			console.log('you are winner');
		}
	}
	else { //replay current level
		this.beginLevel(true);
	}
}