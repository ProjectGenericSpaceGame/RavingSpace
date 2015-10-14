// Tämä tiedosto lataa valikon elementit.
var menuLoad = function(game){

};

menuLoad.prototype = {
        
    preload: function(){
        
           
            //Luodaan ryhmä painikkeille
            this.buttonGroup = game.add.group();

            // ladataan valikon elementit
            this.game.load.image('menuButton', 'assets/placeholders/buttonplaceholder.png'); 
            this.game.load.image('menuBackground', 'assets/placeholders/menubgplaceholder.png');
            this.game.load.image('menuBack', 'assets/placeholders/back.png');
            game.load.image('menuNext', 'assets/placeholders/next.png');
            
            //tänne tulee ajaxia
            this.playerData = {};//demo
            //tässä kasataan jutut
            this.surroundings = "";//demo
        },
    
        create: function(){
            //kutsutaan menua
            this.game.state.start('mainMenu',false,false,
                this.playerData,
                this.buttonGroup,
                this.surroundings
            );
        }

};
