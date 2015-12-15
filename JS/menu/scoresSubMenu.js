var scoresSubMenu = function(game){

};
scoresSubMenu.prototype = {
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
        this.surroundings.menuLabel.text = "High Scores";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);

        var style = { font:'20px cyber', fill:'black'};
        this.selfScoreIter = 0; //tällä seurataan missä omassa pisteessä pelaaja on menossa

        // tästä painikkeesta päästään high scoreihin
        this.highscoresButton = this.game.add.button(200,225,'buttonSprite',this.highscoresStart,this,0, 1, 2);
        var border = this.game.add.graphics(0,0);
        //lisätään border
        border.lineStyle(2,0x000000,1);
        border.lineTo(0,this.highscoresButton.height);
        border.lineTo(this.highscoresButton.width,this.highscoresButton.height);
        border.lineTo(this.highscoresButton.width,0);
        border.lineTo(0,0);
        this.highscoresButton.addChild(border);
        var textScores = this.game.add.text(67,22,"Highscores",style);
        //textScores.x = this.highscoresButton.width/2*0.4-textScores.width/4*0.8;//selvitä tämä joku kerta, ks alta huomio
        this.highscoresButton.addChild(textScores);
        this.highscoresButton.scale.setTo(0.4,0.8);
        this.highscoresButton.getChildAt(1).scale.setTo(2, 1);
        // tästä painikkeesta löydät omat pisteesi
        this.finduButton = this.game.add.button(200,300,'buttonSprite',this.findYourself,this,0, 1, 2);
        var border2 = this.game.add.graphics(0,0);
        //lisätään border
        border2.lineStyle(2,0x000000,1);
        border2.lineTo(0,this.finduButton.height);
        border2.lineTo(this.finduButton.width,this.finduButton.height);
        border2.lineTo(this.finduButton.width,0);
        border2.lineTo(0,0);
        this.finduButton.addChild(border2);
        var textFinder = this.game.add.text(42.5,22,"Find Yourself",style);
        //textFinder.x = this.finduButton.width/2*0.4-textFinder.width/2*0.5;
        this.finduButton.addChild(textFinder);
        this.finduButton.scale.setTo(0.4,0.8);
        this.finduButton.getChildAt(1).scale.setTo(2, 1);

        // tästä painikkeesta etsit edellisen 
        this.finduNavi = this.game.add.sprite(220,300,'buttonSprite',2);
        var border22 = this.game.add.graphics(0,0);
        //lisätään border
        border22.lineStyle(2,0x000000,1);
        border22.lineTo(0,this.finduNavi.height);
        border22.lineTo(this.finduNavi.width,this.finduNavi.height);
        border22.lineTo(this.finduNavi.width,0);
        border22.lineTo(0,0);
        this.finduNavi.addChild(border22);
        var findPrev = this.game.add.button(20,10,"minus",this.findPrev,this);
        var findNext = this.game.add.button(240,10,"plus",this.findNext,this);
        //textFinder.x = this.finduNavi.width/2*0.4-textFinder.width/2*0.5;
        this.finduNavi.addChild(findNext);
        this.finduNavi.addChild(findPrev);
        this.finduNavi.scale.setTo(0.3,0.65);
        this.finduNavi.getChildAt(1).scale.setTo((1/0.3), (1/0.65));
        this.finduNavi.getChildAt(2).scale.setTo((1/0.3), (1/0.65));
        
        // tästä painikkeesta tarkastat omat pisteesti
        this.checkScoresButton = this.game.add.button(200,375,'buttonSprite',this.highscoresStart,this,0, 1, 2);
        var border3 = this.game.add.graphics(0,0);
        //lisätään border
        border3.lineStyle(2,0x000000,1);
        border3.lineTo(0,this.checkScoresButton.height);
        border3.lineTo(this.checkScoresButton.width,this.checkScoresButton.height);
        border3.lineTo(this.checkScoresButton.width,0);
        border3.lineTo(0,0);
        this.checkScoresButton.addChild(border3);
        var textCheck = this.game.add.text(75,17,"Check own",style);
        var textCheck2 = this.game.add.text(115,35,"scores",style);//!!!! huomaa x:n outo arvo suhteessa nappulan leveyteen! skaalauksen vaikutus tekstin suhteeseen nappulaan?
       
        this.checkScoresButton.addChild(textCheck);
        this.checkScoresButton.addChild(textCheck2);
        this.checkScoresButton.scale.setTo(0.4,0.8);
        this.checkScoresButton.getChildAt(1).scale.setTo(2, 1);
        this.checkScoresButton.getChildAt(2).scale.setTo(2, 1);

        //alustetaan takaisin nappula
        style = { font:'20px cyber', fill:'black'};
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);
        //piirretään laatikot
        this.leftTray = this.game.add.graphics(0, 0);
        this.leftTray.beginFill(0x545C64 ,0.6);
        this.leftTray.drawRect(170,200,217,547.5);

        this.centerTray = this.game.add.graphics(0, 0);
        this.centerTray.beginFill(0x545C64,0.6);
        this.centerTray.drawRect(420,200,680,547.5);

        this.buttonGroup.add(this.leftTray);
        this.buttonGroup.add(this.centerTray);
        this.buttonGroup.add(this.highscoresButton);
        this.buttonGroup.add(this.finduNavi);
        this.buttonGroup.add(this.finduButton);
        this.buttonGroup.add(this.backButton);
        this.buttonGroup.add(this.checkScoresButton);
        //this.buttonGroup.add(this.findprevButton);
        //this.buttonGroup.add(this.findnextButton);
        this.centerWindow = this.game.add.group();
        this.centerWindow.x = 420;
        this.centerWindow.y = 200;
    },
    highscoresStart:function(){
        var self = this;
        this.centerWindow.removeAll();

        this.finduButton.setFrames(0,1,2);
        this.highscoresButton.setFrames(0,2,2);
        this.checkScoresButton.setFrames(0,1,2);

        //tehdään yläpalkki ja ympärys
        var g = this.game.add.graphics(0,0);
        g.lineStyle(1,0xFFFFFF,1);
        g.moveTo(20,25);
        g.lineTo(20,522.5);
        g.lineStyle(2,0xFFFFFF,1);
        g.lineTo(660,522.5);
        g.lineStyle(1,0xFFFFFF,1);
        g.lineTo(660,25);
        g.lineTo(20,25);
        //yläpalkin laatikot ja teksti
        g.moveTo(20,75);
        g.lineStyle(2,0xFFFFFF,1);
        g.lineTo(660,75);
        g.lineStyle(1,0xFFFFFF,1);
        g.moveTo(220,25);
        g.lineTo(220,75);
        g.moveTo(440,25);
        g.lineTo(440,75);
        this.centerWindow.addChild(g);
        var style = { font:'15px cyber', fill:'white'};
        var structure = this.game.add.text(0,40,"Rank",style);
        structure.x = ((220+20)/2)-structure.width/2;
        var status = this.game.add.text(0,40,"Player",style);
        status.x = ((440+20)-(110+20))-(status.width/2);
        var profit = this.game.add.text(0,40,"Points",style);
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
        while(i < this.globalScores.length){
            var row = this.game.add.group();
            var gRow = this.game.add.graphics(0,0);
            gRow.lineStyle(1,0xFFFFFF,1);
            gRow.moveTo(20,50);
            gRow.lineTo(660,50);
            gRow.moveTo(220,0);
            gRow.lineTo(220,50);
            gRow.moveTo(440,0);
            gRow.lineTo(440,50);
            //texts
            var rankRow = this.game.add.text(30,15,i+1,style);

            var nameRow = this.game.add.text(0,15,this.globalScores[i][0],style);
            nameRow.x = ((440+20)-(110+20))-(nameRow.width/2);

            var ptsRow = this.game.add.text(0,15,this.globalScores[i][1],style);
            ptsRow.x = ((660+20)-(110+20))-(ptsRow.width/2);
            //adding to group
            row.addChild(gRow);
            row.addChild(rankRow);
            row.addChild(nameRow);
            row.addChild(ptsRow);
            this.waveList.addChild(row);
            row.y = y;
            y += 50;
            i++;
            this.game.updateRender();
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
        this.waveListContainer.mask = mask;

        //this adds mouse scroll support
        this.game.input.mouse.mouseWheelCallback = function(){
            self.scrollListPlace(self);
        };
        //mikäli itsensä löytäminen oli avattu, animoidaan alivalikko pois
        if(this.finduNavi.y > 310){
            var tween2 = this.game.add.tween(this.checkScoresButton);
            tween2.frameBased = true;
            tween2.to({y:375},1000,"Linear",true,100);
            var tween = this.game.add.tween(this.finduNavi);
            tween.frameBased = true;
            tween.to({y:300},1000,"Linear",true,100);
        }
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
            this.waveList.y += 55;
            this.dragArea.y += 55;
            if (self.waveList.y > 76 || self.waveList.height < 472.5) {
                self.waveList.y = 75;
                self.dragArea.y = 75;
            }

        } else if(self.game.input.mouse.wheelDelta == -1){
            this.waveList.y -= 55;
            this.dragArea.y -= 55;
            if ((self.waveList.y+self.waveList.height) < 522.5 && self.waveList.height > 472.5) {
                self.waveList.y = 522.5-self.waveList.height;
                self.dragArea.y = 522.5-self.waveList.height;
            }
        }
    },
    findYourself:function(){
        if(this.finduNavi.y < 310) {
            if (this.waveList == null) {
                this.highscoresStart();
            }
            this.finduButton.setFrames(0,2,2);
            this.highscoresButton.setFrames(0,1,2);
            this.checkScoresButton.setFrames(0,1,2);
            //liuutetaan plus&minus näppäimet painikkeen alta
            var tween2 = this.game.add.tween(this.checkScoresButton);
            tween2.frameBased = true;
            tween2.to({y: this.checkScoresButton.y + this.finduNavi.height}, 1000, "Linear", true, 100);
            var tween = this.game.add.tween(this.finduNavi);
            tween.frameBased = true;
            tween.to({y: this.finduNavi.y + this.finduButton.height}, 1000, "Linear", true, 100);
            //tutkitaan ja tallenetaan rivit joissa pelaaja esiintyy
            var self = this;
            this.playerScores = [];
            this.waveList.forEach(function (row) {
                if (row.getChildAt(2).text == self.playerData.playerData.playerName) {
                    this.playerScores.push(row);
                }
            }, this);
            //lisätään näille riveille erottuva tausta
            for (var i = 0; i < this.playerScores.length; i++) {
                var g = this.playerScores[i].getChildAt(0);
                g.clear();
                g.beginFill(0x214052, 0.8);
                g.drawRect(21, 1, 659, 49);
                g.lineStyle(1, 0xFFFFFF, 1);
                g.moveTo(20, 50);
                g.lineTo(660, 50);
                g.moveTo(220, 0);
                g.lineTo(220, 50);
                g.moveTo(440, 0);
                g.lineTo(440, 50);
            }
            this.waveList.y = 75 - this.playerScores[0].y;
            this.dragArea.y = 75 - this.playerScores[0].y;
            this.selfScoreIter = 0;
        }
    },
    findNext:function(){
        if(this.selfScoreIter < this.playerScores.length-1){
            this.selfScoreIter++;
            this.waveList.y = 75 - this.playerScores[this.selfScoreIter].y;
            this.dragArea.y = 75 - this.playerScores[this.selfScoreIter].y;
        }
    },
    findPrev:function() {
        if (this.selfScoreIter > 0) {
            this.selfScoreIter--;
            this.waveList.y = 75 - this.playerScores[this.selfScoreIter].y;
            this.dragArea.y = 75 - this.playerScores[this.selfScoreIter].y;
        }
    },
    back:function(){
        this.centerWindow.removeAll();
        this.game.state.start('mainMenu',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    }

};