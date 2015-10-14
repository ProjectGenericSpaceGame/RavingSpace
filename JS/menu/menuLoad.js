// Tämä tiedosto lataa valikon elementit.

var menuLoad = {

        preload: function(){
        
           
            //Luodaan ryhmä painikkeille
            this.buttonGroup = game.add.group();

            // ladataan valikon elementit
            game.load.image('menuButton', 'assets/placeholders/buttonplaceholder.png'); 
            game.load.image('menuBackground', 'assets/placeholders/menubgplaceholder.png');
            game.load.image('menuBack', 'assets/placeholders/back.png');
            game.load.image('menuNext', 'assets/placeholders/next.png');
            
            //tänne tulee ajaxia
            this.playerData = {};//demo
            //tässä kasataan jutut
            this.surroundings = "";//demo
        },
    
        create: function(){
            //kutsutaan menua
            game.state.start('mainMenu',false,false,
                this.playerData,
                this.buttonGroup,
                this.surroundings
            );
        }

}