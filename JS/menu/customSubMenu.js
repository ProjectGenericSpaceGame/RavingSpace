var customSubMenu = function(game){

};
customSubMenu.prototype = {
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
        // tästä painikkeesta päästään aaltovalikkoon
        this.wavesButton = this.game.add.button(200, 350, 'menuButton', this.wavesStart, this, 1, 0, 2);
        var text1 = this.game.add.text(100,50,"Attack Waves");
        this.wavesButton.addChild(text1);
        //tästä painikkeesta päästään kauppaan
        this.shopButton = this.game.add.button(650, 350, 'menuButton', this.shopStart, this, 1, 0, 2);
        var text2 = this.game.add.text(150,50,"Shop");
        this.shopButton.addChild(text2);

        //alustetaan takaisin nappula
        var style = { font:'25px calibri', fill:'black'};
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);

        this.buttonGroup.add(this.wavesButton);
        this.buttonGroup.add(this.shopButton);
        this.buttonGroup.add(this.backButton);
    },
    back:function(){
        this.game.state.start('mainMenu',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    },
    shopStart:function(){
        this.game.state.start('shopMenu' ,false, false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
           
        );
    }

};