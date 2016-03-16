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
		/*var inputField = this.game.add.sprite(200,200,'textFieldBG');
         var text = this.game.add.text(5,5,"",style);*/
        //lisätään inputfield
        $("body").append("<input type='email' name='email' id='EMAILinput' class='accountSettingsINPUT'>");
        $("#EMAILinput").css({position:"absolute",top:"42vh",left:"26vw"});

        // salasana kenttä
        this.passwordLabel = this.game.add.text(330, 400, 'Password:',style);
        this.passwordLabel.fill = 'white';
        //lisätään inputfield
        $("body").append("<input type='email' name='email' id='PASSWORDinput' class='accountSettingsINPUT'>");
        $("#PASSWORDinput").css({position:"absolute",top:"54.5vh",left:"26vw"});

        this.passwordConfLabel = this.game.add.text(330, 500, 'Repeat Password:',style);
        this.passwordConfLabel.fill = 'white';
        //lisätään inputfield
        $("body").append("<input type='email' name='email' id='PASSWORD_CONFinput' class='accountSettingsINPUT'>");
        $("#PASSWORD_CONFinput").css({position:"absolute",top:"67vh",left:"26vw"});

        // reset nappula
        this.resetButton = this.game.add.button(204+(280+16)*2, 700, 'buttonSprite',this.resetAll,this,1,0,2);
		var resetText = this.game.add.text(0,20,"Reset",style);
		resetText.x = (this.resetButton.width/2)-(resetText.width/2);
		resetText.fill = 'black';
        this.resetButton.addChild(resetText);
        this.resetButton.scale.setTo(0.7,0.7);

        // save nappula
        this.saveButton = this.game.add.button(204, 700, 'buttonSprite',this.saveData,this,1,0,2);
        var saveText = this.game.add.text(0,20,"Save",style);
        saveText.x = (this.resetButton.width/2)-(resetText.width/2);
        saveText.fill = 'black';
        this.saveButton.addChild(saveText);
        this.saveButton.scale.setTo(0.7,0.7);

        // cancel nappula
        this.cancelButton = this.game.add.button(204+280+16, 700, 'buttonSprite',this.resetFields,this,1,0,2);
        var cancelText = this.game.add.text(0,20,"Reset fields",style);
        cancelText.x = (this.cancelButton.width/2)-(cancelText.width/2);
        cancelText.fill = 'black';
        this.cancelButton.addChild(cancelText);
        this.cancelButton.scale.setTo(0.7,0.7);
        //alustetaan takaisin nappula
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);
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