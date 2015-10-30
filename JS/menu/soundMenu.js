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
        
        this.sound = this.game.add.audio('testi');
        this.sound.play();

        
        //otsikko
        this.surroundings.menuLabel.text = "Sounds";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);
        
        // mastervolumen säädin
        this.mastervolLabel = this.game.add.text(330, 300, 'Master volume');
        this.mastervolLabel.fill = 'white';
        this.masterslider = this.game.add.sprite(630, 310, 'slider');
        this.masterslider.scale.setTo(1,2);
        this.masterneedle = this.game.add.sprite(800, 305, 'needle');
        this.masterneedle.inputEnabled = true;
        this.masterneedle.input.enableDrag();
        this.masterneedle.input.boundsSprite = this.masterslider;
        this.masterneedle.input.allowVerticalDrag = false;
        
        // musiikkivolumen säädin
        this.musicvolLabel = this.game.add.text(330, 370, 'Music volume');
        this.musicvolLabel.fill = 'white';
        this.musicslider = this.game.add.sprite(630, 380, 'slider');
        this.musicneedle = this.game.add.sprite(800, 375, 'needle');
        this.musicneedle.inputEnabled = true;
        this.musicneedle.input.enableDrag();
        this.musicneedle.input.boundsSprite = this.musicslider;
        this.musicneedle.input.allowVerticalDrag = false;
        this.musicneedle.events.onDragUpdate.add(this.musicVolume);

        // efektivolumen säädin
        this.effectsvolLabel = this.game.add.text(330, 440, 'Effects volume');
        this.effectsvolLabel.fill = 'white';
        this.fxslider = this.game.add.sprite(630, 450, 'slider');
        this.fxneedle = this.game.add.sprite(800, 445, 'needle');
        this.fxneedle.inputEnabled = true;
        this.fxneedle.input.enableDrag();
        this.fxneedle.input.boundsSprite = this.fxslider;
        this.fxneedle.input.allowVerticalDrag = false;

        
        // alustetaan äänten on/off painike
        var style = { font:'25px calibri', fill:'black'};
        this.onoffButton = this.game.add.button(590, 560, 'menuHeader', this.onoff, this);
        this.onoffButton.scale.setTo(0.08, 0.5);
        var onoffText = this.game.add.text(350,20,"On/Off",style);
        this.onoffButton.addChild(onoffText);
        this.onoffButton.getChildAt(0).scale.setTo(10, 1.5);
        
        // alustetaan äänien resetointi painike
        var style = { font:'25px calibri', fill:'black'};
        this.resetButton = this.game.add.button(660, 620, 'menuHeader', this.reset, this);
        this.resetButton.scale.setTo(0.08, 0.5);
        var resetText = this.game.add.text(400,20,"Reset",style);
        this.resetButton.addChild(resetText);
        this.resetButton.getChildAt(0).scale.setTo(10, 1.5);
        
        // alustetaan äänien tallennus painike
        var style = { font:'25px calibri', fill:'black'};
        this.saveButton = this.game.add.button(530, 620, 'menuHeader', this.save, this);
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
    musicVolume:function() {

    },
    
    // mute function
    onoff:function(){
        this.game.sound.mute = !this.game.sound.mute;
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