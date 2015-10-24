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
        var self = this;
        this.waveCreateData = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
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

        var self = this;
        var style = { font:'15px calibri', fill:'black'};
        this.centerWindow.removeAll();
        this.browseWaveBtn.setFrames(1,0,2);
        this.createWaveBtn.setFrames(1,2,2);
        //aaltovalikot
        this.wave1Btn = this.game.add.button(25,25,'buttonSprite',wave1,this,1,0,2);
        var round1 = this.game.add.text(0,20,"Round 1",style);
        this.wave1Btn.addChild(round1);
        this.wave2Btn = this.game.add.button(175,25,'buttonSprite',wave2,this,1,0,2);
        var round2 = this.game.add.text(0,20,"Round 2",style);
        this.wave2Btn.addChild(round2);
        this.wave3Btn = this.game.add.button(325,25,'buttonSprite',wave3,this,1,0,2);
        var round3 = this.game.add.text(0,20,"Round 3",style);
        this.wave3Btn.addChild(round3);
        style = { font:'35px calibri', fill:'black'};
        //pelaajan pisteet
        //var points = this.game.add.text(25,475,playerData.playerData.points,style;
        var points = this.game.add.text(475,25,"Points: "+"5500",style);//demo

        //kokonaiskustannus
        this.waveTotalCost = this.game.add.text(0,350,"Total cost: 0",style);//Tätä päivitetään calcTotal funktiossa
        this.waveTotalCost.x = (680/2)-(this.waveTotalCost.width/2);//centerTray leveys/2 - tekstin pituus / 2

        //Painike kassalle
        this.checkoutBtn = this.game.add.button(0,450,'buttonSprite',checkOut,1,0,2);
        this.checkoutBtn.x = (680/2)-(this.checkoutBtn.width/2);
        var checkoutBtnText = this.game.add.text(0,20,"Checkout",style);
        checkoutBtnText.x  = (this.checkoutBtn.width/2)-(checkoutBtnText.width/2);
        this.checkoutBtn.addChild(checkoutBtnText);


        //aallon kasaus
        //style = { font:'25px calibri', fill:'black'};
        this.subMenu = 1;
        this.subFunctions = [wave1,wave2,wave3];

        var shipName = this.game.add.text(0,0,"",style);
        var shipAmount = this.game.add.text(0,0,"",style);
        var fighterLine = this.game.add.group();
        var hunterLine = this.game.add.group();
        var commanderLine = this.game.add.group();
        //fighter line
        var fighterPic = this.game.add.image(25,130,'menuBack');
        shipName = this.game.add.text(100,130,"Fighter:  50 points",style);
        var minus = this.game.add.button(480,130,'menuBack',function() {
            if (self.waveCreateData[self.subMenu - 1][0] > 0){
                self.waveCreateData[self.subMenu - 1][0] -= 1;
                self.subFunctions[self.subMenu-1]();
            }
        });
        shipAmount = this.game.add.text(540,130,this.waveCreateData[this.subMenu-1][0],style);
        var plus = this.game.add.button(570,130,'menuNext',function(){
            self.waveCreateData[self.subMenu-1][0]+=1;
            self.subFunctions[self.subMenu-1]();
        });
        fighterLine.addChild(fighterPic);
        fighterLine.addChild(shipName);
        fighterLine.addChild(minus);
        fighterLine.addChild(shipAmount);
        fighterLine.addChild(plus);
        //hunter line
        var hunterPic = this.game.add.image(25,200,'menuBack');
        shipName = this.game.add.text(100,200,"Hunter:  75 points",style);
        minus = this.game.add.button(480,200,'menuBack',function() {
            if (self.waveCreateData[self.subMenu - 1][1] > 0){
                self.waveCreateData[self.subMenu - 1][1] -= 1;
                self.subFunctions[self.subMenu-1]();

            }
        });
        shipAmount = this.game.add.text(540,200,this.waveCreateData[this.subMenu-1][1],style);
        plus = this.game.add.button(570,200,'menuNext',function(){
            self.waveCreateData[self.subMenu-1][1]+=1;
            self.subFunctions[self.subMenu-1]();

        });
        hunterLine.addChild(hunterPic);
        hunterLine.addChild(shipName);
        hunterLine.addChild(minus);
        hunterLine.addChild(shipAmount);
        hunterLine.addChild(plus);

        //commander line
        var commanderPic = this.game.add.image(25,270,'menuBack');
        shipName = this.game.add.text(100,270,"Commander:  250 points",style);
        minus = this.game.add.button(480,270,'menuBack',function() {
            if (self.waveCreateData[self.subMenu - 1][2] > 0){
                self.waveCreateData[self.subMenu - 1][2] -= 1;
                self.subFunctions[self.subMenu-1]();
            }
        });
        shipAmount = this.game.add.text(540,270,this.waveCreateData[this.subMenu-1][2],style);
        plus = this.game.add.button(570,270,'menuNext',function(){
            self.waveCreateData[self.subMenu-1][2]+=1;
            self.subFunctions[self.subMenu-1]();
        });
        commanderLine.addChild(commanderPic);
        commanderLine.addChild(shipName);
        commanderLine.addChild(minus);
        commanderLine.addChild(shipAmount);
        commanderLine.addChild(plus);

        //kasataan
        this.centerWindow.addChild(this.wave1Btn);
        this.centerWindow.addChild(this.wave2Btn);
        this.centerWindow.addChild(this.wave3Btn);
        this.centerWindow.addChild(this.checkoutBtn);
        this.centerWindow.forEach(function(btn) {//skaalataan yläpalin nappulat ja piirretään niille grafiikat
            btn.scale.setTo(0.3, 0.5);
            var g = self.game.add.graphics(0, 0);
            g.lineStyle(1, 0x000000, 1);
            g.lineTo(0, btn.height);
            g.lineTo(btn.width, btn.height);
            g.lineTo(btn.width, 0);
            g.lineTo(0, 0);
            btn.addChild(g);
            if (btn.getChildAt(0).text != "Checkout"){
                btn.getChildAt(0).scale.setTo(1 / 0.3, 1 / 0.5);
                btn.getChildAt(0).x = 120;//Tämän ei pitäisi toimia näin, bugi. 120 on painikkeen koko leveys
                btn.getChildAt(1).scale.setTo(1 / 0.3, 1 / 0.5);
            } else {
                btn.scale.setTo(1,1);
                btn.getChildAt(1).scale.setTo(1 / 0.3, 1 / 0.5);
                btn.setFrames(1,0,2);//korjaa bugin missä nappula sai jostain syystä framen 2 oletuksena
            }
        });
        this.centerWindow.addChild(points);
        this.centerWindow.addChild(fighterLine);
        this.centerWindow.addChild(hunterLine);
        this.centerWindow.addChild(commanderLine);
        this.centerWindow.addChild(this.waveTotalCost);

        //aaltovalikon funktiot
        function wave1(){
            //alert("workkii");
            self.subMenu = 1;
            fighterLine.getChildAt(3).text = self.waveCreateData[self.subMenu-1][0];
            hunterLine.getChildAt(3).text = self.waveCreateData[self.subMenu-1][1];
            commanderLine.getChildAt(3).text = self.waveCreateData[self.subMenu-1][2];
            self.wave1Btn.setFrames(1,2,2);
            self.wave2Btn.setFrames(1,0,2);
            self.wave3Btn.setFrames(1,0,2);
            calcTotal();
        }
        function wave2(){
            self.subMenu = 2;
            fighterLine.getChildAt(3).text = self.waveCreateData[self.subMenu-1][0];
            hunterLine.getChildAt(3).text = self.waveCreateData[self.subMenu-1][1];
            commanderLine.getChildAt(3).text = self.waveCreateData[self.subMenu-1][2];
            self.wave1Btn.setFrames(1,0,2);
            self.wave2Btn.setFrames(1,2,2);
            self.wave3Btn.setFrames(1,0,2);
            calcTotal();
        }
        function wave3(){
            self.subMenu = 3;
            fighterLine.getChildAt(3).text = self.waveCreateData[self.subMenu-1][0];
            hunterLine.getChildAt(3).text = self.waveCreateData[self.subMenu-1][1];
            commanderLine.getChildAt(3).text = self.waveCreateData[self.subMenu-1][2];
            self.wave1Btn.setFrames(1,0,2);
            self.wave2Btn.setFrames(1,0,2);
            self.wave3Btn.setFrames(1,2,2);
            calcTotal();
        }
        function calcTotal(){
            //lasketaan kokonaismäärät
            var wCD  = self.waveCreateData;//shorthand
            wCD[3][0] = wCD[0][0]+wCD[1][0]+wCD[2][0];
            wCD[3][1] = wCD[0][1]+wCD[1][1]+wCD[2][1];
            wCD[3][2] = wCD[0][2]+wCD[1][2]+wCD[2][2];
            //lasketaan kokonaiskustannus
            var totalCost = (wCD[3][0]*50)+(wCD[3][1]*75)+(wCD[3][2]*250);
            self.waveTotalCost.text = "Total cost: "+totalCost;
            self.waveTotalCost.x = (680/2)-(self.waveTotalCost.width/2);//centerTray leveys/2 - tekstin pituus / 2
        }
        function checkOut(){

        }

    },
    waveBrowser:function(){
        var self = this;
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
        mask.beginFill(0xFFFFFF,1);
        mask.drawRect(20,75,640,447.5);
        this.waveListContainer.addChild(mask);
        //mask.drawRect(0,522.5,680,600);
        this.waveListContainer.mask = mask;
        this.browseWaveBtn.setFrames(1,2,2);
        this.createWaveBtn.setFrames(1,0,2);

        //this adds mouse scroll support
        this.game.input.mouse.mouseWheelCallback = function(){
            self.scrollListPlace(self);
        };
    },
    changeListPlace:function() {
        this.waveList.y = this.dragArea.y;
        if (this.waveList.y > 76 || this.waveList.height < 472.5) {
            this.waveList.y = 75;
            this.dragArea.y = 75;
        } else if ((this.waveList.y+this.waveList.height) < 522.5 && this.waveList.height > 472.5) {
            this.waveList.y = 522.5-this.waveList.height;
            this.dragArea.y = 522.5-this.waveList.height;
        }
    },
    scrollListPlace:function(self){
        if(self.game.input.mouse.wheelDelta == 1){
            this.waveList.y += 15;
            this.dragArea.y += 15;
            if (self.waveList.y > 76 || self.waveList.height < 472.5) {
                self.waveList.y = 75;
                self.dragArea.y = 75;
            }

        } else if(self.game.input.mouse.wheelDelta == -1){
            this.waveList.y -= 15;
            this.dragArea.y -= 15;
            if ((self.waveList.y+self.waveList.height) < 522.5 && self.waveList.height > 472.5) {
                self.waveList.y = 522.5-self.waveList.height;
                self.dragArea.y = 522.5-self.waveList.height;
            }
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