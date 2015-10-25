var soundMenu = function(game){

};
soundMenu.prototype = {
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

    },
    create:function(){
        //otsikko
        this.surroundings.menuLabel.text = "Sounds";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);

        // mastervolumen säädin
        this.mastervolLabel = this.game.add.text(330, 300, 'Master volume');
        this.mastervolLabel.fill = 'white';
        
        // musiikkivolumen säädin
        this.musicvolLabel = this.game.add.text(330, 370, 'Music volume');
        this.musicvolLabel.fill = 'white';
        
        // efektivolumen säädin
        this.effectsvolLabel = this.game.add.text(330, 440, 'Effects volume');
        this.effectsvolLabel.fill = 'white';
        
        // alustetaan äänten on/off painike
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
        this.buttonGroup.add(this.resetButton);
        
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
    }

};