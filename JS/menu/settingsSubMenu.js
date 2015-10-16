/**
 * Created by RAndom MC on 14/10/2015.
 */
var settingsSubMenu = function(game){

};
settingsSubMenu.prototype = {
    init:function(playerData, buttonGroup,surroundings){
        this.playerData = playerData;
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

        this.backButton = this.game.add.button(150, 600, 'menuButton', this.back, this, 1, 0, 2);
        var text3 = this.game.add.text(10,10,"Back");
        this.backButton.addChild(text3);

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
            this.buttonGroup,
            this.surroundings
        );
    }

};