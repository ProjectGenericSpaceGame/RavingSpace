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

        //otsikko
        var textStyle = { font: '30px cyber'};
        this.surroundings.menuLabel.text = "Customization";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);

        // tästä painikkeesta päästään aaltovalikkoon
        this.wavesButton = this.game.add.button(200, 350, 'buttonSprite', this.waveCreatorStart, this, 0, 1, 2);
        var text1 = this.game.add.text(100,20,"Attack Waves", textStyle);
        this.wavesButton.addChild(text1);
        //tästä painikkeesta päästään kauppaan
        this.shopButton = this.game.add.button(650, 350, 'buttonSprite', this.shopStart, this, 0, 1, 2);
        var text2 = this.game.add.text(150,20,"Shop", textStyle);
        this.shopButton.addChild(text2);

        //alustetaan takaisin nappula
        var style = { font:'20px cyber', fill:'black'};
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
    },
    waveCreatorStart:function(){
        this.game.state.start('waveMenu' ,false, false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings

        );
    }

};