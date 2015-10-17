var scoresSubMenu = function(game){

};
scoresSubMenu.prototype = {
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
        // tästä painikkeesta päästään high scoreihin
        this.highscoresButton = this.game.add.button(150, 150, 'menuButton', this.highscoresStart, this, 1, 0, 2);
        var text1 = this.game.add.text(150,50,"High scores");
        this.highscoresButton.addChild(text1);
        
        // tästä painikkeesta löydät omat pisteesi
        this.finduButton = this.game.add.button(150, 300, 'menuButton', this.finduStart, this, 1, 0, 2);
        var text2 = this.game.add.text(130,50,"Find yourself");
        this.finduButton.addChild(text2);
        
        // tästä painikkeesta etsit edellisen 
        //this.findprevButton = this.game.add.button(400, 350, 'menuBack', this.findprevStart, this, 1, 0, 2);
        
        // tästä painikkeesta etsit seuraavan
        //this.findnextButton = this.game.add.button(400, 350, 'menuNext', this.findnextStart, this, 1, 0, 2);
        
        // tästä painikkeesta tarkastat omat pisteesti
        this.checkscoresButton = this.game.add.button(150, 450, 'menuButton', this.checkscoresStart, this, 1, 0, 2);
        var text2 = this.game.add.text(100,50,"Check own scores");
        this.checkscoresButton.addChild(text2);
        
        // tästä painikkeesta pääsee takaisin päävalikkoon
        this.backButton = this.game.add.button(150, 600, 'menuButton', this.back, this, 1, 0, 2);
        var text3 = this.game.add.text(150,50,"Back");
        this.backButton.addChild(text3);

        this.buttonGroup.add(this.highscoresButton);
        this.buttonGroup.add(this.finduButton);
        this.buttonGroup.add(this.backButton);
        this.buttonGroup.add(this.checkscoresButton);
        //this.buttonGroup.add(this.findprevButton);
        //this.buttonGroup.add(this.findnextButton);

    },
    back:function(){
        this.game.state.start('mainMenu',false,false,
            this.playerData,
            this.buttonGroup,
            this.surroundings
        );
    }

};