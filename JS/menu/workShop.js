// tämä on aaltovalikko

var workShop = function(game){

};

workShop.prototype = {
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
        this.tweenActive = false;
        this.waveCreateData = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];

        /*weaponSystemEditor = null;
        powerSystemEditor = null;*/
        //ladataan alaskriptit ja sallitaan nappulat vasta kun ne on latautuneet (alaskripteistä tulee tominnallisuus nappuloille)
        /*$.getScript( "JS/menu/workShop_gunEditor.js", function(data, textStatus){
            if(textStatus == "success"){
                self.weaponSystemEditor = weaponSystemEditor;
                console.log("daa")
                $.getScript( "JS/menu/workShop_powersEditor.js", function(data, textStatus){
                    if(textStatus == "success"){
                        $.getScript( "JS/menu/workShop_hullEditor.js", function(data, textStatus){
                            if(textStatus == "success"){
                                self.editGunsBtn.inputEnabled = true;
                                self.editPowersBtn.inputEnabled = true;
                                self.editHullBtn.inputEnabled = true;
                            }
                        });
                    }
                });
            }

        });*/
        //alustetaan takaisin nappula
        var style = { font:'20px cyber', fill:'black', align: "center"};
        var styleLong = { font:'16px cyber', fill:'black', align: "center"};
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);
        //otsikko
        this.surroundings.menuLabel.text = "Workshop";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);

        //aseet alivalikko nappi
        this.editGunsBtn = this.game.add.button(200,225,'buttonSprite',this.editWeaponSystems,this,0, 1, 2);
        this.editGunsBtn.inputEnabled = false;
        this.editGunsBtn.name = "btn";
        var border = this.game.add.graphics(0,0);
        //lisätään border
        border.lineStyle(2,0x000000,1);
        border.lineTo(0,this.editGunsBtn.height);
        border.lineTo(this.editGunsBtn.width,this.editGunsBtn.height);
        border.lineTo(this.editGunsBtn.width,0);
        border.lineTo(0,0);
        this.editGunsBtn.addChild(border);
        var textCreate = this.game.add.text(60,22,"Edit \nweapon systems",styleLong);
        var place = centerButtonTest(this.editGunsBtn,textCreate);
        textCreate.x = place[0];
        textCreate.y = place[1];
        this.editGunsBtn.addChild(textCreate);
        /*this.editGunsBtn.scale.setTo(0.4,0.8);
        this.editGunsBtn.getChildAt(1).scale.setTo(2, 1);*/

        //tehosteet alavalikkonappi
        this.editPowersBtn = this.game.add.button(200,300,'buttonSprite',this.powerSystemEditor,this,0, 1, 2);
        this.editPowersBtn.inputEnabled = false;
        this.editPowersBtn.name = "btn";
        var border2 = this.game.add.graphics(0,0);
        //lisätään border
        border2.lineStyle(2,0x000000,1);
        border2.lineTo(0,this.editPowersBtn.height);
        border2.lineTo(this.editPowersBtn.width,this.editPowersBtn.height);
        border2.lineTo(this.editPowersBtn.width,0);
        border2.lineTo(0,0);
        this.editPowersBtn.addChild(border2);
        var textBrowse2 = this.game.add.text(70,22,"Edit \npower systems",styleLong);
        this.editPowersBtn.addChild(textBrowse2);
        /*this.editPowersBtn.scale.setTo(0.4,0.8);*/
        /*this.editPowersBtn.getChildAt(1).scale.setTo(2, 1);*/

        //runko alavalikkonappi
        this.editHullBtn = this.game.add.button(200,375,'buttonSprite',this.waveBrowser,this,0, 1, 2);
        this.editHullBtn.inputEnabled = false;
        this.editHullBtn.name = "btn";
        var border3 = this.game.add.graphics(0,0);
        //lisätään border
        border3.lineStyle(2,0x000000,1);
        border3.lineTo(0,this.editHullBtn.height);
        border3.lineTo(this.editHullBtn.width,this.editHullBtn.height);
        border3.lineTo(this.editHullBtn.width,0);
        border3.lineTo(0,0);
        this.editHullBtn.addChild(border3);
        var textBrowse3 = this.game.add.text(70,22,"Edit hull",style);
        this.editHullBtn.addChild(textBrowse3);
        /*this.editHullBtn.scale.setTo(0.4,0.8);
        this.editHullBtn.getChildAt(1).scale.setTo(2, 1);*/

        // vasennavi taustapalkki

        this.leftTray = this.game.add.graphics(0, 0);
        this.leftTray.beginFill(0x545C64 ,0.6);
        this.leftTray.drawRect(170,200,217,547.5);

        // keskipalkki
        this.centerTray = this.game.add.graphics(0, 0);
        this.centerTray.beginFill(0x545C64,0.6);
        this.centerTray.drawRect(420,200,680,547.5);

        this.buttonGroup.add(this.leftTray);
        this.buttonGroup.add(this.editGunsBtn);
        this.buttonGroup.add(this.editPowersBtn);
        this.buttonGroup.add(this.editHullBtn);
        this.buttonGroup.add(this.centerTray);
        this.buttonGroup.add(this.backButton);
        this.buttonGroup.forEach(function(item){
            if(item.name == "btn"){
                item.getChildAt(1).scale.setTo(2, 1);
                var place = centerButtonTest(item,item.getChildAt(1));//lapsi 1 on border
                item.getChildAt(1).x = place[0];
                item.getChildAt(1).y = place[1];
                item.scale.setTo(0.4,0.8);

            }
        });
        this.centerWindow = null;
        this.centerWindow = this.game.add.group();
        this.centerWindow.x = 420;
        this.centerWindow.y = 200;
        },
        
    editWeaponSystems:function(){
        /*if(this.centerWindow.length == 0){*/
            var self = this;
            /*$.getScript( "JS/menu/workShop_gunEditor.js", function(data, textStatus){
             if(textStatus == "success"){*/
            gunEditor(self);
            /* }

             });*/
       /* }*/

    },
    update:function(){
        /*if(this.centerWindow.length > 2){
            console.log(this.centerWindow.getChildAt(2).getChildAt(0).visible);
        }*/

    },
    powerSystemEditor:function(){
        /*if(this.centerWindow.length == 0){*/
            var self = this;
            /*$.getScript( "JS/menu/workShop_powerEditor.js", function(data, textStatus){
             if(textStatus == "success"){*/
            powerSystemEditor(self);
            /* }

             });*/

    },
    waveBrowser:function(){
        var self = this;
        this.centerWindow.removeAll();
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
            gRow.lineStyle(1,0xFFFFFF,1);
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
        this.waveListContainer.mask = mask;
        this.editPowersBtn.setFrames(0,2,1);
        this.editGunsBtn.setFrames(0, 1, 2);

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
        this.centerWindow.removeAll(true);
        /*weaponSystemEditor = null;
        powerSystemEditor = null;*/
        hullEditor = null;
        this.game.state.start('custom',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
         
        
        }
    
    
};