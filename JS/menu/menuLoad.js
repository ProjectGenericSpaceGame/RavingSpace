// Tämä tiedosto lataa valikon elementit.
var menuLoad = function(game){
     
};

menuLoad.prototype = {
        
    preload: function(){

            // ladataan valikon elementit
            this.game.load.image('menuHeader', 'assets/placeholders/header3.png'); 
            this.game.load.spritesheet('buttonSprite', 'assets/placeholders/menuButtonSpriteEmpty2.png', 400, 70);
            this.game.load.image('menuBG', 'assets/sprites/VS_background_orange.png');
            this.game.load.image('menuButtonBG', 'assets/placeholders/menuBG_dark.png');
            this.game.load.image('RSlogo', 'assets/menuelements/RSlogo.png');

            this.game.load.image('playerShip', 'assets/sprites/VS_peli_ship_Old.png');
            // loadouttiin
            this.game.load.image('availableTray', 'assets/placeholders/availableTray.png');
            // aseet
            this.game.load.image('weapon_basic', 'assets/placeholders/weapon0_final.png');
            this.game.load.image('weapon_laser', 'assets/placeholders/weapon1_final.png');
            this.game.load.image('weapon_shotgun', 'assets/placeholders/weapon2_final.png');
            this.game.load.image('weapon_mines', 'assets/sprites/mineSlot.png');
            // tehosteet
            this.game.load.image('ability_SuperSpeed', 'assets/placeholders/ability0_final.png');
            this.game.load.image('ability_EMP', 'assets/placeholders/ability1_final.png');
            this.game.load.image('ability_Shield', 'assets/placeholders/ability2_final.png');
            this.game.load.image('ability_FireRateBoost', 'assets/placeholders/ability3_final.png');
            
            // kaupan kuvakkeet
            this.game.load.image('bullet', 'assets/sprites/bullet.png');
            this.game.load.image('laser', 'assets/particles/laser2.png');
            this.game.load.image('shotgun', 'assets/sprites/bullet2.png');
            this.game.load.spritesheet('shopselect','assets/placeholders/shopselect.png', 270, 260);
            this.game.load.image('bullet', 'assets/sprites/bullet.png');
            this.game.load.image('laser', 'assets/particles/laser2.png');
            this.game.load.image('shotgun', 'assets/sprites/bullet2.png');
            this.game.load.image('mines', 'assets/sprites/mine.png');
            this.game.load.image('shopshield', 'assets/particles/shield.png');
            
            this.game.load.image('slot', 'assets/placeholders/slot.png');
            //this.game.load.audio('testi', 'assets/sounds/testi.mp3');
            this.game.load.image('minus', 'assets/menuelements/minus.png');
            this.game.load.image('plus', 'assets/menuelements/plus.png');
            this.game.load.image('needle', 'assets/menuelements/needle.png');
            this.game.load.image('slider', 'assets/menuelements/slider.png');
            this.game.load.image('destroyer', 'assets/sprites/fighter.png');

            this.game.load.image('hunter', 'assets/sprites/playerHunter.png');
            this.game.load.image('commander', 'assets/sprites/hunterFinal.png');

            this.game.load.image('textFieldBG', 'assets/placeholders/textFieldBG.png');
            this.game.load.image('flasher', 'assets/placeholders/flasher.png');

        },
        init:function(loader){
            this.loader = loader;
        },
        create: function(){
            var self = this;
            this.tracksLoaded = 0;
            this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.startMenu,this);
            var textStyle = { font: "20px cyber"};
             var nameStyle = { font: "20px Calibri", fill:"blue"};
            var headingStyle = { font: "35px cyber", fill:"white"};
            if(sessionStorage.getItem('startOrReturn') == "start") {
                musics = {
                    menuTracks: [],
                    lastIndex: 0,
                    isPlaying: 0,
                    tracksMaker: [],
                    tracksName: [],
                    gameTracks:[],
                    sounds: {
                        playerBasic: "",
                        playerLaser: "",
                        playerShotgun: "",
                        enemyBasic: "",
                        shipBoom:[],
                        enemyLaser: ""
                    },
                    nextFreeBoom:0,
                    fullTrackList:""
                };
                /*musics.menuTracks.push(new Audio('assets/sounds/dystopia.ogg'));
                musics.tracksMaker.push("Zajed - Dystopia");
                musics.menuTracks.push(new Audio('assets/sounds/swagger.ogg'));
                musics.tracksMaker.push("vanguard182 - Swagger");
                musics.menuTracks.push(new Audio('assets/sounds/dustsucker.ogg'));
                musics.tracksMaker.push("Jens Kiilstofte (Machinimasound) - Dustsucker");
                musics.gameTracks.push(new Audio('assets/sounds/HighOctane.ogg'));*/

                musics.sounds.playerBasic = new Audio('assets/sounds/PlayerWeaponBasic.ogg');
                musics.sounds.playerLaser = new Audio('assets/sounds/playerWeaponLaser.ogg');
                musics.sounds.playerShotgun = new Audio('assets/sounds/PlayerWeaponShotgun.ogg');
                musics.sounds.shipBoom.push(new Audio('assets/sounds/ShipExplosion.ogg'));
                musics.sounds.shipBoom.push(new Audio('assets/sounds/ShipExplosion.ogg'));
                musics.sounds.shipBoom.push(new Audio('assets/sounds/ShipExplosion.ogg'));

            }
         
            this.menubg = this.game.add.sprite(0, 0,  "menuBG");
           
            this.menuheader = this.game.add.sprite(0,0, "menuHeader");
            var logotext = this.game.add.image(0, 0, "RSlogo");
            logotext.scale.setTo(0.5,0.5);
            logotext.x = this.menuheader.width/2-logotext.width/2;
            this.menuheader.addChild(logotext);
    
           this.menubbg = this.game.add.sprite(150, 100,  "menuButtonBG");
            //alustetaan valikon otsikko ja viiva
            this.menuLabel = this.game.add.text(this.game.width/2, 120, '', headingStyle);
            
            this.headUnder = this.game.add.sprite(180, 170,  "menuHeader");
            this.headUnder.scale.setTo(0.7, 0.03);
            
            // logout -painiket
            this.logoutBtn = this.game.add.button(1160, 20, "menuHeader", this.logout, this, 1, 0, 2);
            this.logoutBtn.scale.setTo(0.08, 0.5);
            this.logoutBtn.tint = 0xf0f0f0;
            var logText = this.game.add.text(0,22.5,"Logout",{ font: "20px Calibri", fill:"red"});
            logText.x = (this.logoutBtn.width/2)*(1/0.08)-(logText.width*(1/0.08)/2);
            this.logoutBtn.addChild(logText);
            this.menuheader.addChild(this.logoutBtn);
            this.logoutBtn.getChildAt(0).scale.setTo((1/0.08), 1.5);

            //tänne tulee ajaxia ja kissoja
            var name = sessionStorage.getItem('playerID');
            /*Haetaan eka musiikit*/
            var getFromDB = $.ajax({
                method:"POST",
                async:false,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
                url:"PHP/SQLcontroller/getSongs.php",
                data:{playerName:name,location:window.location.href}
            });
            getFromDB.done(function(data){
                console.log(data);
                var jsonSongs = JSON.parse(data);
                for(var n=0;n<jsonSongs.playerSongs.menu.length;n++){
                    musics.menuTracks.push(new Audio("assets/sounds/"+jsonSongs.playerSongs.menu[n]["asset"]));
                    musics.tracksMaker.push(jsonSongs.playerSongs.menu[n]["maker"]);
                    musics.tracksName.push(jsonSongs.playerSongs.menu[n]["trackName"]);
                }
                for(n=0;n<jsonSongs.playerSongs.game.length;n++){
                    musics.gameTracks.push(new Audio("assets/sounds/"+jsonSongs.playerSongs.game[n]["asset"]));
                    /*musics.?.push(jsonSongs.playerSongs.game[n]["maker"]);*/
                    /*musics.?.push(jsonSongs.playerSongs.menu[n]["trackName"]);*/
                }
                musics.fullTrackListn= jsonSongs.allTracks;
                for (n = 0; n < musics.menuTracks.length; n++) {
                    musics.menuTracks[n].volume = volumes.music;
                    musics.menuTracks[n].onended = self.nextSong;
                    musics.menuTracks[n].oncanplaythrough = self.tracksLoaded++;
                }
                for (n = 0; n < musics.gameTracks.length; n++) {
                    musics.gameTracks[n].volume = volumes.music;
                    //musics.gameTracks[n].onended = this.nextSong;
                    musics.gameTracks[n].oncanplaythrough = self.tracksLoaded++;
                }
            });
            getFromDB.fail(function(){alert("Couldn't load music!")});
            // ------>TESTATTU JA TOIMII<------
            getFromDB = $.ajax({
                method:"POST",
                async:false,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
                url:"PHP/SQLcontroller/playerData.php",
                data:{playerName:name,location:window.location.href}
            });
            getFromDB.done(function(returnValue){
                if(returnValue == true){
                    self.logout();
                } else {
                    self.playerRelatedData = JSON.parse(returnValue);
                    self.playerRelatedData.shipStats = {//devausta varten, tulee myöhemmin kannasta TODO: siirrä hakemaan kannasta
                        guns:{
                            gunDmgBoost:1,
                            gunSpeedBoost:1.75,
                            gunReloadBoost:1.5
                        },
                        powers:{
                            powerReloadBonus:1.5,
                            powerAOEBonus:1.25,
                            powerEffectTimeBonus:1
                        }
                    };
                    console.log("Pelaajan data"+self.playerRelatedData.shipPowers[0]);
                }
            });
            getFromDB.fail(function(){alert("database unreachable!")});
            //
            getFromDB = $.ajax({
                method:"POST",
                async:false,
                url:"PHP/SQLcontroller/shipData.php",
                data:{
                    playerName:name,
                    location:window.location.href
                }
            });
            getFromDB.done(function(returnValue) {
                console.log(returnValue);
                var shipData = returnValue.split("§");
                self.playerRelatedData.shipStats = JSON.parse(shipData[0]);//devausta varten, tulee myöhemmin kannasta
                self.playerRelatedData.gunData = JSON.parse(shipData[1]);//devausta varten, tulee myöhemmin kannasta
            });
            getFromDB.fail(function(){alert("database unreachable!")});
            //
            getFromDB = $.ajax({
                method:"POST",
                async:false,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
                url:"PHP/SQLcontroller/playerWaves.php",
                data:{playerName:name,location:window.location.href}
            });
            getFromDB.done(function(returnValue){
                if(returnValue == true){
                    self.logout();
                } else {
                    console.log(returnValue);
                    self.playerWaves = JSON.parse(returnValue);
                }
            });
            getFromDB.fail(function(){alert("database unreachable!")});
            
            getFromDB = $.ajax({
                 method:"POST",
                 async:false,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
                 url:"PHP/SQLcontroller/highScores.php",
                 data:{location:window.location.href}
             });
             getFromDB.done(function(returnValue){
             //self.globalScores = returnValue;});
                 console.log(returnValue);
                 self.globalScores = JSON.parse(returnValue);});
            
            getFromDB.fail(function(){alert("database unreachable!")});
                // Nyt tehdään pistelistasta array vertailua varten
            var scoreSort = [];
            for(var i = 0;i < this.globalScores.highScores.length;i++) {
                scoreSort.push(this.globalScores.highScores[i]);
            }
            scoreSort.sort(this.compare);
            this.globalScores = scoreSort;

            sessionStorage.setItem("loginFollowID",this.playerRelatedData.loginFollowID);
           
            songName = this.game.add.text(25,775,"Now Playing: ",{ font: "20px cyber", fill:"white"});
            //tässä kasataan jutut
            this.surroundings = {
                menubg:this.menubg,
                menuheader:this.menuheader,
                menubbg:this.menubbg,
                menuLabel:this.menuLabel,
                headUnder:this.headUnder,
                backButton:this.backButton
            };//demo
            
           // lisätään pelaajan pisteet sekä rahat yläpalkkiin
            var playerDisplayPoints = this.game.add.text(10, 15, "Points: "+this.playerRelatedData.playerData.points, textStyle);
            var playerDisplayMoney = this.game.add.text(10, 40, "Money: "+this.playerRelatedData.playerData.money, textStyle);
            // lisätään pelaajan nimi yläpälkkiin
            var playerDisplayName = this.game.add.text(0, 30, this.playerRelatedData.playerData.playerName, nameStyle);
            playerDisplayName.x = (this.menuheader.width/2+450)-playerDisplayName.width/2;
           
            
             this.menuheader.addChild(playerDisplayMoney);
             this.menuheader.addChild(playerDisplayPoints);
             this.menuheader.addChild(playerDisplayName);
             // luodaan ryhmä painikkeille. 
            this.buttonGroup = this.game.add.group();
            this.loader.bringToTop();
            this.enterText = this.game.add.text(1000, 700, "Press ENTER to start", {
                fill: "white",
                font: "20px cyber"
            });
        },
    update: function(){
      if(this.tracksLoaded == musics.menuTracks.length+musics.gameTracks.length){
          this.musicLoadStatus = true;
          sessionStorage.setItem('startOrReturn',"return")
      }

    },
    //kutsutaan menua

    startMenu:function(){
        if(this.musicLoadStatus) {
            var toPlay = rnd.integerInRange(0, musics.menuTracks.length - 1);
            musics.menuTracks[toPlay].play(musics.menuTracks[toPlay].key);
            songName.text += musics.tracksName[toPlay]+" - "+musics.tracksMaker[toPlay];
            this.loader.destroy();
            this.enterText.destroy();
            this.game.state.start('mainMenu', false, false,
                this.playerRelatedData,
                this.globalScores,
                this.playerWaves,
                this.buttonGroup,
                this.surroundings
            );
        }
    },
    compare:function(a,b){
            if(a[1] == b[1]){
                return 0;
            } else if(a[1] < b[1]){
                return 1;
            }
            return -1;
    },
    logout:function(){
            // funktio uloskirjaukselle
                console.log("Logged out");
                this.game.destroy();
                var logof = $.ajax({
                    method:"POST",
                    //sync:false,
                    url:"PHP/SQLcontroller/updateData.php",
                    data:{playerRelatedData:sessionStorage.getItem("playerID"),loginFollowID:sessionStorage.getItem("loginFollowID"),location:window.location.href,usage:5}
                });
                if(window.location.href == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php") {
                    window.location.pathname = "~H3492/RavingSpace";
                } else {
                    window.location.pathname = "RavingSpace";
                }
    },
    nextSong : function(){
        musics.lastIndex = musics.isPlaying;
        while(true){
            var toPlay = rnd.integerInRange(0,musics.menuTracks.length-1);
            if(toPlay != musics.lastIndex){
                break;
            }
        }
        musics.menuTracks[toPlay].play();
        songName.text = "Now Playing: "+musics.tracksName[toPlay]+" - "+musics.tracksMaker[toPlay];
        musics.isPlaying = toPlay;
    }

};
