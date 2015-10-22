// tämä on aaltovalikko

var waveMenu = function(game){

};

waveMenu.prototype = {
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

        //alustetaan takaisin nappula
        var style = { font:'25px calibri', fill:'black'};
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);
        //otsikko
        this.surroundings.menuLabel.text = "Attack Waves";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);

        style = { font:'30px calibri', fill:'black'};
        this.createWaveBtn = this.game.add.button(200,225,'buttonSprite',this.waveCreator,this,1,0,2);
        var border = this.game.add.graphics(0,0);
        //lisätään border
        border.lineStyle(2,0x000000,1);
        border.lineTo(0,this.createWaveBtn.height);
        border.lineTo(this.createWaveBtn.width,this.createWaveBtn.height);
        border.lineTo(this.createWaveBtn.width,0);
        border.lineTo(0,0);
        this.createWaveBtn.addChild(border);
        var textCreate = this.game.add.text(80,15,"Create wave",style);
        this.createWaveBtn.addChild(textCreate);
        this.createWaveBtn.scale.setTo(0.4,0.8);
        this.createWaveBtn.getChildAt(1).scale.setTo(1.7, 1.1);


        this.browseWaveBtn = this.game.add.button(200,300,'buttonSprite',this.waveBrowser,this,1,0,2);
        var border2 = this.game.add.graphics(0,0);
        //lisätään border
        border2.lineStyle(2,0x000000,1);
        border2.lineTo(0,this.browseWaveBtn.height);
        border2.lineTo(this.browseWaveBtn.width,this.browseWaveBtn.height);
        border2.lineTo(this.browseWaveBtn.width,0);
        border2.lineTo(0,0);
        this.browseWaveBtn.addChild(border2);
        var textBrowse = this.game.add.text(90,15,"Your waves",style);
        this.browseWaveBtn.addChild(textBrowse);
        this.browseWaveBtn.scale.setTo(0.4,0.8);
        this.browseWaveBtn.getChildAt(1).scale.setTo(1.7, 1.1);

        // vasennavi taustapalkki

        this.leftTray = this.game.add.graphics(0, 0);
        this.leftTray.beginFill(0xFFFFFF,1);
        this.leftTray.drawRect(170,200,217,547.5);

        // keskipalkki
        this.centerTray = this.game.add.graphics(0, 0);
        this.centerTray.beginFill(0xFFFFFF,1);
        this.centerTray.drawRect(420,200,680,547.5);

        this.buttonGroup.add(this.leftTray);
        this.buttonGroup.add(this.createWaveBtn);
        this.buttonGroup.add(this.browseWaveBtn);
        this.buttonGroup.add(this.centerTray);
        this.buttonGroup.add(this.backButton);
        },
        

    waveCreator:function(){

    },
    waveBrowser:function(){

    },

    back: function(){
        this.game.state.start('custom',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
         
        
        }
    
    
};