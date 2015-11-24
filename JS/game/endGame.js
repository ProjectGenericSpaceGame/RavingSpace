/**
 * Created by RAndom MC on 24/11/2015.
 */
var endGame = function(game){

};
endGame.prototype = {
    init:function(HUD,ship){
        this.HUD = HUD;
        this.ship = ship;
    },
    create:function(){
        var style = {fill:"white",font:"30px cyber"};
        var window = this.game.add.sprite(0,0, 'buttonSprite',1);
        this.game.camera.focusOn(this.ship);
        window.scale.setTo(2,8);
        window.fixedToCamera = true;
        window.cameraOffset.setTo(this.game.camera.width/2-window.width/2,this.game.camera.height/2-window.height/2);
        $("canvas").css("cursor","auto");

        var pointsText = this.game.add.text(0,100,"Your points: "+points,style);
        pointsText.scale.setTo(0.5,1/8);
        pointsText.x = (window.width*0.5/2)-(pointsText.width/2);
        pointsText.y *= 1/8;// korjaa scale offsetin
        var deathText = this.game.add.text(0,180,"You died: "+deaths+" times",style);
        deathText.scale.setTo(0.5,1/8);
        deathText.x = (window.width*0.5/2)-(deathText.width/2);
        deathText.y *= 1/8;// korjaa scale offsetin
        var killsText = this.game.add.text(0,260,"You killed: "+enemiesKilled+" enemies",style);
        killsText.scale.setTo(0.5,1/8);
        killsText.x = (window.width*0.5/2)-(killsText.width/2);
        killsText.y *= 1/8;// korjaa scale offsetin
        var date = new Date();
        var b = date.getTime();
        var timeText = this.game.add.text(0,340,"Total time: "+moment.duration(b-totalTime).minutes()+" minutes, "+moment.duration(b-totalTime).seconds()+" seconds",style);
        timeText.scale.setTo(0.5,1/8);
        timeText.x = (window.width*0.5/2)-(timeText.width/2);
        timeText.y *= 1/8;// korjaa scale offsetin
        var OK = this.game.add.button(0,450,'buttonSprite',this.backToMenu, this,1,2,0);
        OK.scale.setTo(0.4,1/8);
        OK.x = (window.width*0.5/2)-(OK.width/2);
        OK.y *= 1/8;// korjaa scale offsetin
        var OKtext = this.game.add.text(0,0,"Return to Menu",style);
        OKtext.scale.setTo(1.2,0.8);
        OKtext.x = (OK.width/(2*0.4))-(OKtext.width/2);
        OKtext.y = OK.height/(2*(1/8))-OKtext.height/2;//viimeinen kertaa merkki korjaa scale offsetin
        OK.addChild(OKtext);
        window.addChild(pointsText);
        window.addChild(deathText);
        window.addChild(killsText);
        window.addChild(timeText);
        window.addChild(OK);
        window.kill();

        this.HUD.banner.frame = 4;
        this.HUD.banner.revive();
        this.game.add.tween(this.HUD.banner).to({alpha:1},400,"Linear",true,1000);
        this.game.time.events.add(5000,function(){
            this.game.add.tween(this.HUD.banner).to({alpha:0},200,"Linear",true).onComplete.add(function(){this.HUD.banner.kill();window.revive();},this);
        },this);

    },
    backToMenu:function(){
        this.game.state.start('menuLoad');
    }
};
