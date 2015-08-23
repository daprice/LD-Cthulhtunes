function GameProgression(game) {
	this.level = 1;
	this.currentSequence;
	this.currentPosition = 0;
	this.game = game;
	this.timer;
	this.recordingTimer;
	this.recording = false;
	this.firstTime = true;
}

GameProgression.prototype.beginLevel = function(keepSequence) {
	this.timer = this.game.time.create(true);
	flautist.walkTo(455, 210);
	if(!keepSequence) this.currentSequence = genSequence(this.level);
	this.currentPosition = 0;
	
	console.log('starting level with length ' + this.level + ' and sequence ' + this.currentSequence);
	
	for(var i = 0; i < this.level; i++) {
		this.timer.add(i * 1000, this.playNote, this);
	}
	//start recording when flautist is done
	this.timer.add(800 + (this.level-1)*1000, this.startRecording, this);
	
	//check player after giving them time to play
	this.recordingTimer = this.timer.add(800 + (this.level-1)*1000 + 3000, this.checkRecording, this, false);
	
	if(this.firstTime) { //if first time, wait for flautist to walk into position
		this.timer.start(5000);
		this.firstTime = false;
	}
	else if(keepSequence) { //if repeating the same level, don't delay
		this.timer.start();
	}
	else { //if not repeating the same level, leave time for the success animation
		this.timer.start(2000);
	}
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
	this.recording = true;
};

GameProgression.prototype.resetRecordingTimer = function() {
	if(this.recording) {
		this.timer.remove(this.recordingTimer);
		this.recordingTimer = this.timer.add(2000, this.checkRecording, this);
	}
};

GameProgression.prototype.checkRecording = function() {
	this.recording = false;
	console.log('checking player\'s recording');
	console.log('player: ' + playerSequence);
	console.log('flautist: ' + this.currentSequence);
	var recordingCorrect = false;
	//check flautist recording against player recording
	if(playerSequence) {
		for(n in playerSequence) {
			if(this.currentSequence[n] !== undefined && playerSequence[n] == this.currentSequence[n]) {
				recordingCorrect = true;
			}
			else {
				recordingCorrect = false;
				break;
			}
		}
		//check player recording against flautist recording
		if(recordingCorrect) for(n in this.currentSequence) {
			if(playerSequence[n] !== undefined && playerSequence[n] == this.currentSequence[n]) {
				recordingCorrect = true;
			}
			else {
				recordingCorrect = false;
				break;
			}
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