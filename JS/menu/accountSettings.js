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
		/*var bmd = game.add.bitmapData(400, 400);
		var input = this.game.add.sprite(400, 400, bmd);
		input.canvasInput = new CanvasInput({
		canvas: bmd.canvas,
		fontSize: 18,
		fontFamily: 'Arial',
  fontColor: '#212121',
  fontWeight: 'bold',
  width: 300,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '1px 1px 0px #fff',
  innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  placeHolder: 'Enter message here...'
		});
		input.inputEnabled = true;
		input.input.useHandCursor = true;    
		input.events.onInputUp.add(this.inputFocus, this);
		/*this.test = this.game.add.group();
		this.test.addChild(input);
		this.test.x = 400;
		this.test.y = 300;*/
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
        
        /*// alustetaan äänten on/off painike
        var style = { font:'25px calibri', fill:'black'};
        this.onoffButton = this.game.add.button(590, 560, 'menuHeader', this.onoff, this, 1, 0, 2);
        this.onoffButton.scale.setTo(0.08, 0.5);
        var onoffText = this.game.add.text(350,20,"On/Off",style);
        this.onoffButton.addChild(onoffText);
        this.onoffButton.getChildAt(0).scale.setTo(10, 1.5);
        
        // alustetaan äänien resetointi painike
        var style = { font:'25px calibri', fill:'black'};
        this.resetButton = this.game.add.button(660, 620, 'menuHeader', this.reset, this, 1, 0, 2);
        this.resetButton.scale.setTo(0.08, 0.5);
        var resetText = this.game.add.text(400,20,"Reset",style);
        this.resetButton.addChild(resetText);
        this.resetButton.getChildAt(0).scale.setTo(10, 1.5);
        
        // alustetaan äänien tallennus painike
        var style = { font:'25px calibri', fill:'black'};
        this.saveButton = this.game.add.button(530, 620, 'menuHeader', this.save, this, 1, 0, 2);
        this.saveButton.scale.setTo(0.08, 0.5);
        var saveText = this.game.add.text(400,20,"Save",style);
        this.saveButton.addChild(saveText);
        this.saveButton.getChildAt(0).scale.setTo(10, 1.5);

        //alustetaan takaisin nappula
        var style = { font:'25px calibri', fill:'black'};
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);

        this.buttonGroup.add(this.mastervolLabel);
        this.buttonGroup.add(this.musicvolLabel);
        this.buttonGroup.add(this.effectsvolLabel);
        this.buttonGroup.add(this.onoffButton);
        this.buttonGroup.add(this.saveButton);
        this.buttonGroup.add(this.backButton);
        this.buttonGroup.add(this.resetButton);*/
        
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