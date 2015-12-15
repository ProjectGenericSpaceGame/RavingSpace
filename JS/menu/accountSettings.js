var accountSettings = function(game){

};
accountSettings.prototype = {
    init:function(playerData,globalScores,playerWaves,buttonGroup,surroundings){
        this.playerData = playerData;
        this.globalScores = globalScores;
        this.playerWaves = playerWaves;
        this.buttonGroup = buttonGroup;
        this.surroundings = surroundings;
    },
    preload:function(){
        //do some murdering here
        this.buttonGroup.removeAll();
		this.game.renderType = Phaser.CANVAS;
    },
    create:function(){
        //otsikko
        this.surroundings.menuLabel.text = "Account Settings";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);
		
		var style = { font:'25px calibri', fill:'black'};
        // sähköposti kenttä
        this.emailLabel = this.game.add.text(330, 300, 'Email:',style);
        this.emailLabel.fill = 'white';
		var inputField = this.game.add.sprite(200,200,'textFieldBG');
		var text = this.game.add.text(5,5,"",style);
        
        // salasana kenttä
        this.passwordLabel = this.game.add.text(330, 370, 'Password:',style);
        this.passwordLabel.fill = 'white';
        
        // reset nappula
        this.resetButton = this.game.add.button(330, 440, 'buttonSprite',this.resetAll,this,1,0,2);
		var resetText = this.game.add.text(0,20,"Reset",style);
		resetText.x = (this.resetButton.width/2)-(resetText.width/2);
		resetText.fill = 'black';
        this.resetButton.addChild(resetText);
    },
    onoff:function(){
        if (!this.game.sound.mute) {
            this.game.sound.mute = true;
        } else {
            this.game.sound.mute = false;
        } 
    },
    back:function(){
        this.game.state.start('settings',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    },
	inputFocus: function(sprite){
    sprite.canvasInput.focus();
  }

};