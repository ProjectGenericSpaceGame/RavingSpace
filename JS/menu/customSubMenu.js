var customSubMenu = function(game){

};
customSubMenu.prototype = {
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
        // tästä painikkeesta päästään aaltovalikkoon
        this.wavesButton = this.game.add.button(200, 350, 'menuButton', this.wavesStart, this, 1, 0, 2);
        var text1 = this.game.add.text(100,50,"Attack Waves");
        this.wavesButton.addChild(text1);
        //tästä painikkeesta päästään kauppaan
        this.shopButton = this.game.add.button(650, 350, 'menuButton', this.shopStart, this, 1, 0, 2);
        var text2 = this.game.add.text(150,50,"Shop");
        this.shopButton.addChild(text2);
        // tästä painikkeesta päästään takaisin päävalikkoon
        this.backButton = this.game.add.button(150, 600, 'menuButton', this.back, this, 1, 0, 2);
        var text3 = this.game.add.text(150,50,"Back");
        this.backButton.addChild(text3);

        this.buttonGroup.add(this.wavesButton);
        this.buttonGroup.add(this.shopButton);
        this.buttonGroup.add(this.backButton);
    },
    back:function(){
        this.game.state.start('mainMenu',false,false,
            this.playerData,
            this.buttonGroup,
            this.surroundings
        );
    }

};