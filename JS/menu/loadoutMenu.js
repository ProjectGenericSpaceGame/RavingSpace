// tästä valitaan aseet ja tehosteet mukaan

var loadoutMenu = function(game){
   
};

loadoutMenu.prototype = {
    
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
        
        this.thingsGroup = this.game.add.group();
        // valitut aseet ja tehosteet
        this.selectedLoadout = [];
        // lajitellaan pelaajan ostamat aseet
        this.availableWeapons = [];
        for(var i = 0; i <=3; i++){
            this.availableWeapons[i] = this.playerData.shipData[i];
        }
        // lajitellaan pelaajan ostamat tehosteet
        this.availableAbilities = [];
        for(var i = 4; i <=8; i++){
            this.availableAbilities[i-4] = this.playerData.shipData[i];
        }
        // näihin taulukoihin tallennetaan tieto siitä onko ase valittu. 0 = ei valittu, 1 = on valittu 
        this.WSA = [0,0,0,0];
        this.ASA = [0,0,0,0];
        // onko asevalikko olemassa
        this.am = false;
        // onko tehostevalikko olemassa
        this.im = false;
        this.x = 450;
        this.ax = 525;
        
        // Sivun otsake
        this.surroundings.menuLabel.text = 'Loadout';
        var style = { font:'25px calibri', fill:'black'};
        // Go -painike. Sitä painamalla aloitetaan peli
        this.goButton = this.game.add.button(975, 680, 'buttonSprite', this.gameStart, this, 0, 1, 2);
        this.goButton.scale.setTo(0.3, 0.9);
        var goLabel = this.game.add.text(120,20,"Go!");
        this.goButton.addChild(goLabel);
        this.goButton.getChildAt(0).scale.setTo(3, 1);
        this.game.add.sprite(550,400, 'playerShip');
        
        // Back -nappula. Sitä painamalla päästään takaisin päävalikkoon
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20, 'Back',style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);

        this.buttonGroup.add(this.backButton);
        this.buttonGroup.add(this.goButton);
       
        // weapon slots/ aseitten paikat
        for (var i = 0; i <= 2; i++){
            this.button = this.game.add.button(this.x, 250, 'slot', this.selectWeapon,this);
            this.button.name = 'wepslot' + i;
            this.buttonGroup.add(this.button);
            this.x += 150;
        }
        
        // ability slots / tehosteiden paikat
        for (var i = 0; i <= 1; i++){
            this.button = this.game.add.button(this.ax, 600, 'slot', this.selectAbility,this);
            this.button.name = 'abslot' + i;
            this.buttonGroup.add(this.button);
            this.ax += 150;
        }
        
    },
    
    selectWeapon: function(button){
        this.prewep = button;
        this.x = 905;
        this.y = 205;
        var i;
        // Mikäli toinen tehostevalikko on auki se suljetaan
        if(this.im == true){
            this.thingsGroup.removeAll();
            this.im = false;
        }
         // Mikäli asevalikko ei ole auki se avataan
        if (this.am == false){
            this.sweapon = this.game.add.sprite(900, 200, 'availableTray');
            this.thingsGroup.add(this.sweapon);
            
            for (i = 0; i <= 3; i++){
                // tarkistetaan onko pelaaja ostanut aseen
                if (this.availableWeapons[i] == 1){
                    // rivitellään aseet
                    if(this.x > 905 + (92.5 * 2)){
                        this.y += 95;
                        this.x = 905;
                    }
                    // Tarkistetaanko onko painetulla asepaikalla jo lapsi
                    if(this.prewep.hasChild === true){
                        // jos on lapsi niin poistetaan se
                        this.prewep.removeChildren(0,1);
                        this.prewep.hasChild = false;
                        var num = this.prewep.name.replace( /^\D+/g, '');
                        this.WSA[parseInt(num)] = 0;
                    // mikäli painetulla asepaikalla ei ole lasta tulostetaan aseita mikäli ne ovat vielä saatavilla    
                    }
                    if(this.WSA[i] == 0){
                        this.button = this.game.add.button(this.x, this.y, 'weapon' + i, this.weppressed, this);
                        this.button.name = 'weapon' + i;
                        this.thingsGroup.add(this.button);
                        this.x += 92.5;
                    }
                }
            } 
            this.am = true;
        } else {
            this.thingsGroup.removeAll();
            this.am = false;
        }
        
    },
    
    selectAbility: function(button){
        this.preab = button;
        this.x = 905;
        this.y = 405;
        var i;
        // Mikäli toinen asevalikko on auki se suljetaan
        if(this.am == true){
            this.thingsGroup.removeAll();
            this.am = false;
        }
        // Mikäli tehostevalikko ei ole auki se avataan
        if (this.im == false){
            this.sability = this.game.add.sprite(900, 400, 'availableTray');
            this.thingsGroup.add(this.sability);
            
            for (i = 0; i <= 3; i++){
                // tarkistetaan saatavilla olevista tehosteista onko pelaaja avannut tehosteita.
                if (this.availableAbilities[i] == 1){
                    // mikäli aseita on 3 vierekkäin niin 4. ase laitetaan toiselle riville. purkkakoodia.
                    if(this.x > 905 + (92.5 * 2)){
                        this.y += 95;
                        this.x = 905;
                    }
                    if(this.preab.hasChild === true){
                        // jos on lapsi niin poistetaan se
                        this.preab.removeChildren(0,1);
                        this.preab.hasChild = false;
                        var num = this.preab.name.replace( /^\D+/g, '');
                        this.ASA[parseInt(num)] = 0;
                    }
                    // jos tehosteet ovat käytössä, tulostetaan niiden kuvakkeet
                    if (this.ASA[i] == 0){
                    this.button = this.game.add.button(this.x, this.y, 'ability' + i, this.abpressed, this);
                    this.button.name = 'ability' + i;
                    this.thingsGroup.add(this.button);
                    this.x += 92.5;
                    }
                
                }    
            }

            this.im = true;
        //Mikäli tehostevalikko olikin jo auki se suljetaan. 
        //Kun esim tuplaklikkaa samaa tehostepaikkaa niin valikko avautuu ja sulkeutuu    
        } else {
            this.thingsGroup.removeAll();
            this.im = false;
        } 
    },
    
    weppressed: function(button){
        var p = button;
        // tarkistetaan mitä asepaikkaa painettiin ja otetaan sen numero
        var slotnum = this.prewep.name.replace( /^\D+/g, '');
        // tyhjennetään paikka
        this.selectedLoadout[slotnum] = null;
        // laitetaan valittu ase siihen paikkaan
        this.selectedLoadout[slotnum] = button.name;
        
        // tarkistetaan mitä asetta painettiin
        var num = button.name.replace( /^\D+/g, '');
        // laitetaaan sen aseen paikalle WSA (weapons still available) talukkoon 1 merkiksi siitä, 
        // että ase ei ole enää valittavissa
        this.WSA[num] = 1;
        
        // Lisätään sen aseen kuvake paikkaan josta pelaaja painoi.
        var icon = this.game.add.sprite(3,3, p.key);
        this.prewep.name = p.name;
        this.prewep.addChild(icon);
        this.prewep.hasChild = true;
     }, 
    
    abpressed: function(button){
        var p = button;
        var s = this.preab.name.replace( /^\D+/g, '');
        // lisätään paikan numeroon 3, että se menee selectedLoadout taulukossa aseiden jälkeisille paikoille
        this.selectedLoadout[parseInt(s) +3] = null;
        this.selectedLoadout[parseInt(s) +3] = button.name;
        
        var num = button.name.replace( /^\D+/g, '');
        this.ASA[num] = 1;
      
        // Lisätään sen tehosteen kuvake paikkaan josta pelaaja painoi.
        var icon = this.game.add.sprite(3,3, p.key);
        this.preab.name = p.name;
        this.preab.addChild(icon);
        this.preab.hasChild = true;
    },
    
    gameStart: function(){
        // kutsutaan gameLoad -tilaa
        this.game.state.start('gameLoad');
        
    },
 
    back:function(){
        
        this.thingsGroup.removeAll();
        // palataan takaisin päävalikkoon
        this.game.state.start('mainMenu',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );

    }
}