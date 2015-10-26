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
        this.game.load.audio('testi', 'assets/sounds/testi.mp3');

    },
    create:function(){
        this.music = game.sound.play('testi');
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
        
        // master volume buttons
        this.mastervolupButton = this.game.add.button(850,300,'menuNext', this.mastvolUp, this, 1, 0, 2);
        this.mastervoldownButton = this.game.add.button(590,300,'menuBack', this.mastvolDown, this, 1, 0, 2);
        
        // music volume buttons
        this.musicvolupButton = this.game.add.button(850,370,'menuNext', this.musicvolUp, this, 1, 0, 2);
        this.musicvoldownButton = this.game.add.button(590,370,'menuBack', this.musicvolDown, this, 1, 0, 2);
        
        // effects volume buttons
        this.fxvolupButton = this.game.add.button(850,440,'menuNext', this.fxvolUp, this, 1, 0, 2);
        this.fxvoldownButton = this.game.add.button(590,440,'menuBack', this.fxvolDown, this, 1, 0, 2);

        //alustetaan takaisin nappula
        var style = { font:'25px calibri', fill:'black'};
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);
        
        this.buttonGroup.add(this.mastervolupButton);
        this.buttonGroup.add(this.mastervoldownButton);
        this.buttonGroup.add(this.musicvolupButton);
        this.buttonGroup.add(this.musicvoldownButton);
        this.buttonGroup.add(this.fxvolupButton);
        this.buttonGroup.add(this.fxvoldownButton);
        this.buttonGroup.add(this.mastervolLabel);
        this.buttonGroup.add(this.musicvolLabel);
        this.buttonGroup.add(this.effectsvolLabel);
        this.buttonGroup.add(this.onoffButton);
        this.buttonGroup.add(this.saveButton);
        this.buttonGroup.add(this.backButton);
        this.buttonGroup.add(this.resetButton);
        
    },
    // mute function
    onoff:function(){
        this.game.sound.mute = !this.game.sound.mute;
        },
    mastvolUp:function(){
        console.log('Volume up');
        this.game.sound.volume += 0.1;
        },
    mastvolDown:function(){
        console.log('Volume down');
        this.game.sound.volume -= 0.1;
        },
    musicvolUp:function(){
        console.log('Volume up');
        this.game.sound.volume += 0.1;
        },
    musicvolDown:function(){
        console.log('Volume down');
        this.game.sound.volume -= 0.1;
        },
    fxvolUp:function(){
        console.log('Volume up');
        this.game.sound.volume += 0.1;
        },
    fxvolDown:function(){
        console.log('Volume down');
        this.game.sound.volume -= 0.1;
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