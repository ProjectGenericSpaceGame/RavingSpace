var passChangeReference;
var passChangeVal;
var accountSettings = function(game){

};
accountSettings.prototype = {
    init:function(playerRelatedData,globalScores,playerWaves,buttonGroup,surroundings){
        this.playerRelatedData = playerRelatedData;
        this.globalScores = globalScores;
        this.playerWaves = playerWaves;
        this.buttonGroup = buttonGroup;
        this.surroundings = surroundings;
    },
    preload:function(){
        //do some murdering here
        this.buttonGroup.removeAll();
		this.game.renderType = Phaser.CANVAS;
    },
    create:function(){
        //otsikko
        this.surroundings.menuLabel.text = "Account Settings";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);
		
		var style = { font:'25px calibri', fill:'black'};
		var styleSuccess = { font:'25px calibri', fill:'green'};
		var styleError = { font:'25px calibri', fill:'red'};
        //errorMSGs
        this.messages = game.add.group();
        this.successText = this.game.add.text(0,210,"",styleSuccess);
        this.successText. x = (this.game.width/2)-(this.successText.width/2);
        this.errorText = this.game.add.text(0,260,"",styleError);
        this.errorText. x = (this.game.width/2)-(this.errorText.width/2);
        this.messages.add(this.successText);
        this.messages.add(this.errorText);

        // sähköposti kenttä
        this.emailLabel = this.game.add.text(330, 300, 'Email:',style);
        this.emailLabel.fill = 'white';
		/*var inputField = this.game.add.sprite(200,200,'textFieldBG');
         var text = this.game.add.text(5,5,"",style);*/
        //lisätään inputfield
        $("body").append("<input type='email' name='email' id='EMAILinput' class='accountSettingsINPUT'>");
        $("#EMAILinput").css({position:"absolute",top:"42vh",left:"26vw"});

        // salasana kenttä
        this.passwordLabel = this.game.add.text(330, 400, 'Password:',style);
        this.passwordLabel.fill = 'white';
        //lisätään inputfield
        passChangeVal = getRandom();
        passChangeReference = passChangeVal;
        $("body").append("<input type='password' name='passw' id='PASSWORDinput' class='accountSettingsINPUT' placeholder='Enter new password here'>");
        $("#PASSWORDinput").css({position:"absolute",top:"54.5vh",left:"26vw"});
        $("#PASSWORDinput").val(passChangeVal);

        this.passwordConfLabel = this.game.add.text(330, 500, 'Repeat Password:',style);
        this.passwordConfLabel.fill = 'white';
        //lisätään inputfield
        $("body").append("<input type='password' name='passwConf' id='PASSWORD_CONFinput' class='accountSettingsINPUT' placeholder='Repeat new password'>");
        $("#PASSWORD_CONFinput").css({position:"absolute",top:"67vh",left:"26vw"});
        $("#PASSWORD_CONFinput").val(passChangeVal);

        //kun käyttäjä painaa inputtia, nollataan kenttä (vältetään tilanne jossa kantaan menisi salasanaksi randomarvo)
        $("#PASSWORDinput").on("focus",function(){
            if($("#PASSWORDinput").val() == passChangeReference){
                $("#PASSWORDinput").val("");
                $("#PASSWORD_CONFinput").val("");
                passChangeVal = "";
            }
        });

        // reset nappula
        this.resetButton = this.game.add.button(204+(280+16)*2, 700, 'buttonSprite',this.resetAll,this,2,3,0);
		var resetText = this.game.add.text(0,20,"Reset",style);
		resetText.x = (this.resetButton.width/2)-(resetText.width/2);
		resetText.fill = 'black';
        this.resetButton.addChild(resetText);
        this.resetButton.scale.setTo(0.7,0.7);

        // save nappula
        this.saveButton = this.game.add.button(204, 700, 'buttonSprite',this.saveData,this,1,0,2);
        var saveText = this.game.add.text(0,20,"Save",style);
        saveText.x = (this.resetButton.width/2)-(resetText.width/2);
        saveText.fill = 'black';
        this.saveButton.addChild(saveText);
        this.saveButton.scale.setTo(0.7,0.7);

        // cancel nappula
        this.cancelButton = this.game.add.button(204+280+16, 700, 'buttonSprite',this.resetFields,this,1,0,2);
        var cancelText = this.game.add.text(0,20,"Reset fields",style);
        cancelText.x = (this.cancelButton.width/2)-(cancelText.width/2);
        cancelText.fill = 'black';
        this.cancelButton.addChild(cancelText);
        this.cancelButton.scale.setTo(0.7,0.7);
        //alustetaan takaisin nappula
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);

        //alustetaan inputit
        $("#EMAILinput").val(this.playerRelatedData.playerData.email);
        /*var getFromDB = $.ajax({
            method:"POST",
            async:true,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
            url:"PHP/SQLcontroller/accountSettingsHandler.php",
            data:{
                playerName:this.playerRelatedData.playerData.playerName,
                location:window.location.href,
                loginFollow:this.playerRelatedData.loginFollowID,
                usage:"getPassLength"
            }
        });
        getFromDB.done(function(data){

        });*/

        //ryhmätään
        this.buttonGroup.add(this.emailLabel);
         this.buttonGroup.add(this.passwordLabel);
         this.buttonGroup.add(this.passwordConfLabel);
         this.buttonGroup.add(this.resetButton);
         this.buttonGroup.add(this.saveButton);
         this.buttonGroup.add(this.cancelButton);
         this.buttonGroup.add(this.messages);
         this.buttonGroup.add(this.backButton);
    },
    onoff:function(){
        if (!this.game.sound.mute) {
            this.game.sound.mute = true;
        } else {
            this.game.sound.mute = false;
        } 
    },
    back:function(){
        $("input").remove();
        this.game.state.start('settings',false,false,
            this.playerRelatedData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    },
    saveData:function(){
        var self = this;
        self.successText.text = "";
        self.errorText.text = "";
        var email = "N/A";
        if($("#EMAILinput").val() != this.playerRelatedData.playerData.email){
            email = $("#EMAILinput").val();
        }
        if($("#PASSWORDinput").val() == ""){
            alert("Can't set empty password!");
        } else if($("#PASSWORDinput").val() == $("#PASSWORD_CONFinput").val()){
            var pss;
            var hashedPass;
            if($("#PASSWORDinput").val() == passChangeReference){
                hashedPass = "N/A";
            } else {
                pss = $("#PASSWORDinput").val();
                var genSalt = getRandom();
                var saltyhash = pss + genSalt;
                hashedPass = hashPass(saltyhash)+genSalt;
            }
            var getFromDB = $.ajax({
                method:"POST",
                async:true,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
                url:"PHP/SQLcontroller/accountSettingsHandler.php",
                data:{
                    playerName:this.playerRelatedData.playerData.playerName,
                    location:window.location.href,
                    loginFollow:this.playerRelatedData.loginFollowID,
                    usage:"updateAccountData",
                    email:email,
                    password:hashedPass
                }
            });
            getFromDB.done(function(data){
                data = JSON.parse(data);
                if(data[0] == "wrongEmailFormat"){
                    if(data[1] == "success"){
                        self.successText.text = "Password changed successfully";
                    } else {
                        self.successText.text = "";
                    }
                    self.errorText.text = "Not a proper email!";
                } else if(data[0] == "success"){
                    self.errorText.text = "";
                    self.successText.text = "Data updated succesfully";
                    self.playerRelatedData.playerData.email = $("#EMAILinput").val();
                } else if(data[0] == "passwordError"){
                    if(data[1] == "emailSuccess"){
                        self.successText.text = "Email changed successfully";
                    } else {
                        self.successText.text = "";
                    }

                    self.errorText.text = "Updating password failed";
                } else if(data[0] == "emailError"){
                    if(data[1] == "success"){
                        self.successText.text = "Password changed successfully";
                    } else {
                        self.successText.text = "Something went wrong while updating email";//never runs because password was already succees if this clause happens
                    }
                } else if(data[0] == "noChange"){
                    self.errorText.text = "Nothing changed";
                    self.successText.text = "";
                } else if(data[0] == "fail"){
                    alert("Something happened, no data was updated");
                }
                self.messages.forEach(function(item){
                    item.x = (game.width/2)-(item.width/2);
                });
            });
        } else  if($("#PASSWORDinput").val() != $("#PASSWORD_CONFinput").val()){
            alert("Make sure that you typed both password right!");
        }
    },
    resetFields:function(){
        $("#PASSWORDinput").val("");
        $("#PASSWORD_CONFinput").val("");
        $("#EMAILinput").val(this.playerRelatedData.playerData.email);
    },
    resetAll:function(){
        var self = this;
        var answer = confirm("Are you absolutely sure? \nThis will remove all your money, waves, and points \nas well as will reset your ship, guns and abilities.\n You will however keep your music");
        if(answer){
            var getFromDB = $.ajax({
                method:"POST",
                async:true,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
                url:"PHP/SQLcontroller/accountSettingsHandler.php",
                data:{
                    playerName:this.playerRelatedData.playerData.playerName,
                    location:window.location.href,
                    loginFollow:this.playerRelatedData.loginFollowID,
                    usage:"resetAll",
                }
            });
            getFromDB.done(function(data){
                if(data == "success"){
                    self.successText.text = "Your account is now resetted";
                    self.errorText.text = "";
                    self.playerRelatedData.playerData.money = 0;
                    self.surroundings.menuheader.getChildAt(2).text = "Money: "+0;
                    self.playerRelatedData.playerData.points = 0;
                    self.surroundings.menuheader.getChildAt(3).text = "Points: "+0;
                    self.playerRelatedData.shipGuns = ["basic"];
                    self.playerRelatedData.shipPowers = [];
                } else if(data == "fail"){
                    self.successText.text = "";
                    self.errorText.text = "Resetting account failed at least partially...";
                } else {
                    self.successText.text = "";
                    self.errorText.text = "Ooops, looks like you run into bug... please notify us about these circumstances";
                }
                self.messages.forEach(function(item){
                    item.x = (game.width/2)-(item.width/2);
                });
            });
        }
        else {

        }
    },
	inputFocus: function(sprite){
    sprite.canvasInput.focus();
  }

};