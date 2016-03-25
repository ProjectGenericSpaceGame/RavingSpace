var setMenuLoader = function(game){

};
setMenuLoader.prototype = {
    init:function(loadout,playerRelatedData){
        this.loadout = loadout;
        this.playerRelatedData = playerRelatedData;
    },
    preload:function(){
        //ladataan latausruutu
        this.game.load.image('loadScreen', 'assets/loader/loadscreen2.png');
    },
    create:function(){
        resizeGame();
        stateChange = false;
        this.loader = this.game.add.sprite(0,0,'loadScreen');
        this.loader.bringToTop();
        $("#loader").css({marginTop:"82vh",marginLeft:"15vw",width:"15%",height:"10%",backgroundColor:"transparent",display:"block"});
        this.game.state.start("menuLoad",false,false,
            this.loader
        );
    }
};