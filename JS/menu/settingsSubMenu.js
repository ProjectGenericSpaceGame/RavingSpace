/**
 * Created by RAndom MC on 14/10/2015.
 */
var settingsSubMenu = function(game){

};
settingsSubMenu.prototype = {
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
        // t‰st‰ painikkeesta p‰‰st‰‰n ‰‰niin
        this.soundButton = this.game.add.button(400, 100, 'menuButton', this.soundsStart, this, 1, 0, 2);
        var text1 = this.game.add.text(10,10,"Sound settings");
        this.soundButton.addChild(text1);
        //t‰st‰ tilin asetuksiin
        this.accountButton = this.game.add.button(400, 250, 'menuButton', this.accountStart, this, 1, 0, 2);
        var text2 = this.game.add.text(10,10,"Account settings");
        this.accountButton.addChild(text2);


        //alustetaan takaisin nappula
        var style = { font:'25px calibri', fill:'black'};
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);

        this.buttonGroup.add(this.soundButton);
        this.buttonGroup.add(this.accountButton);
        this.buttonGroup.add(this.backButton);
    },
    soundsStart:function(){

    },
    accountStart:function(){

    },
    back:function(){
        this.game.state.start('mainMenu',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    }

};