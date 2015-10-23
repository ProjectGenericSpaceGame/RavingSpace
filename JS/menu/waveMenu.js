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

        this.self = this;
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

        //style = { font:'30px calibri', fill:'black'};
        this.createWaveBtn = this.game.add.button(200,225,'buttonSprite',this.waveCreator,this,1,0,2);
        var border = this.game.add.graphics(0,0);
        //lisätään border
        border.lineStyle(2,0x000000,1);
        border.lineTo(0,this.createWaveBtn.height);
        border.lineTo(this.createWaveBtn.width,this.createWaveBtn.height);
        border.lineTo(this.createWaveBtn.width,0);
        border.lineTo(0,0);
        this.createWaveBtn.addChild(border);
        var textCreate = this.game.add.text(80,22,"Create wave",style);
        this.createWaveBtn.addChild(textCreate);
        this.createWaveBtn.scale.setTo(0.4,0.8);
        this.createWaveBtn.getChildAt(1).scale.setTo(2, 1);


        this.browseWaveBtn = this.game.add.button(200,300,'buttonSprite',this.waveBrowser,this,1,0,2);
        var border2 = this.game.add.graphics(0,0);
        //lisätään border
        border2.lineStyle(2,0x000000,1);
        border2.lineTo(0,this.browseWaveBtn.height);
        border2.lineTo(this.browseWaveBtn.width,this.browseWaveBtn.height);
        border2.lineTo(this.browseWaveBtn.width,0);
        border2.lineTo(0,0);
        this.browseWaveBtn.addChild(border2);
        var textBrowse = this.game.add.text(90,22,"Your waves",style);
        this.browseWaveBtn.addChild(textBrowse);
        this.browseWaveBtn.scale.setTo(0.4,0.8);
        this.browseWaveBtn.getChildAt(1).scale.setTo(2, 1);

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

        this.centerWindow = this.game.add.group();
        this.centerWindow.x = 420;
        this.centerWindow.y = 200;
        },
        

    waveCreator:function(){

    },
    waveBrowser:function(){
        this.centerWindow.removeAll();
        //tehdään yläpalkki ja ympärys
        var g = this.game.add.graphics(0,0);
        g.lineStyle(1,0x000000,1);
        g.moveTo(20,25);
        g.lineTo(20,522.5);
        g.lineTo(660,522.5);
        g.lineTo(660,25);
        g.lineTo(20,25);
        //yläpalkin laatikot ja teksti
        g.moveTo(20,75);
        g.lineTo(660,75);
        g.moveTo(220,25);
        g.lineTo(220,75);
        g.moveTo(440,25);
        g.lineTo(440,75);
        this.centerWindow.addChild(g);
        var style = { font:'20px calibri', fill:'black'};
        var structure = this.game.add.text(0,40,"Structure",style);
        structure.x = ((220+20)/2)-structure.width/2;
        var status = this.game.add.text(0,40,"Status",style);
        status.x = ((440+20)-(110+20))-(status.width/2);
        var profit = this.game.add.text(0,40,"Profit",style);
        profit.x = ((660+20)-(110+20))-(profit.width/2);
        this.centerWindow.addChild(structure);
        this.centerWindow.addChild(status);
        this.centerWindow.addChild(profit);
        //luodaan lista
        var i = 0;
        var y = 0;
        this.waveList = this.game.add.group();
        this.waveList.y = 75;
        this.waveListContainer = this.game.add.group();//This allows us to mask waveList
        this.centerWindow.addChild(this.waveListContainer);
        while(i < this.playerWaves.playerWaves.length){
            var row = this.game.add.group();
            var gRow = this.game.add.graphics(0,0);
            gRow.lineStyle(1,0x000000,1);
            gRow.moveTo(20,50);
            gRow.lineTo(660,50);
            gRow.moveTo(220,0);
            gRow.lineTo(220,50);
            gRow.moveTo(440,0);
            gRow.lineTo(440,50);
            //texts
            var structureRow = this.game.add.text(30,15,this.playerWaves.playerWaves[i].waveStruct,style);

            var statusRow = this.game.add.text(0,15,this.playerWaves.playerWaves[i].waveStatus,style);
            statusRow.x = ((440+20)-(110+20))-(statusRow.width/2);

            var profitRow = this.game.add.text(0,15,this.playerWaves.playerWaves[i].profit,style);
            profitRow.x = ((660+20)-(110+20))-(profitRow.width/2);
            //adding to group
            row.addChild(structureRow);
            row.addChild(statusRow);
            row.addChild(profitRow);
            this.waveList.addChild(row);
            row.addChild(gRow);
            row.y = y;
            y += 50;
            i++;
        }
        //now we create an invisible dragging area on top of list group. Group then gets it's y value based on this sprite
        this.dragArea = this.game.add.sprite(20,75,'menuBG');
        this.dragArea.width = this.waveList.width;
        this.dragArea.height = this.waveList.height;
        this.dragArea.alpha = 0;
        this.dragArea.inputEnabled = true;
        this.dragArea.input.enableDrag();
        this.dragArea.input.allowHorizontalDrag = false;
        this.dragArea.events.onDragUpdate.add(this.changeListPlace,this);
        this.centerWindow.addChild(this.dragArea);
        this.waveListContainer.addChild(this.waveList);
        //and finally we create a mask so that list doesn't overflow
        var mask = this.game.add.graphics(0,0);
        mask.beginFill(0x990000,1);
        //mask.beginFill(0xFFFFFF,1);
        mask.drawRect(20,75,640,447.5);
        this.waveListContainer.addChild(mask);
        //mask.drawRect(0,522.5,680,600);
        this.waveListContainer.mask = mask;
    },
    changeListPlace:function(){
        this.waveList.y = this.dragArea.y;
        if(this.waveList.y > 76){
            this.waveList.y = 75;
            this.dragArea.y = 75;
        }
    },
    back: function(){
        this.centerWindow.removeAll();
        this.game.state.start('custom',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
         
        
        }
    
    
};