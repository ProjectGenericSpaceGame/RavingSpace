
var hashPass;
var getRandom;
var checkRegisterInfo;

$(document).ready(function(){

    // Poistetaan latausruutu
    $('#loader').css("display","none");
    // kirjautumisruutu / rekisteröitymisruutu
    $('.login').click(function(){
        $('.password').val('');
        $('.username').val('');
        $('.capsLockWarning').css("display","none");
        var other =  $('.signupDialog').css("display");
        if(other == "block"){
            $('.signupDialog').css("display","none");
        }
        $('.loginDialog').css("display","block");
        //$('#RSlogo').css("margin-top","20px");Ronnie lisäsi
    });

    $('.cancelLogin').click(function(){
        $('.loginDialog').css("display","none");
        $('.signupDialog').css("display","none");
        //$('#RSlogo').css("margin-top","325px");ronnie lisäsi
    });
    
    $('.loginCheck').click(function(){
        var pss =  $('.password').val();
        var user = $('.username').val();
        var location = window.location.href;
        if(user.length != 0 && pss.length != 0){
            $('#loader').css("display","block");
            $('.loginDialog').css("display", "none");
            $('.signupDialog').css("display", "none");
            var getFromDB = $.ajax({
                method:"POST",
                url:"PHP/CryptoHandler/serveSalt.php",
                data:{playerName:user,location:location}
            });
            getFromDB.done(function(returnValue){
                var genSalt = getRandom();
                var saltyhash = pss + returnValue;
                var sh = hashPass(saltyhash)+genSalt;
                var ssh = hashPass((pss+genSalt));

                var putToDB = $.ajax({
                    method:"POST",
                    //sync:false,
                    url:"PHP/CryptoHandler/loginHandler.php",
                    data:{givenHash:sh,newPass:ssh,userName:user,location:location}
                });
                putToDB.done(function(returnValue) {
                    if (returnValue == true) {
                        $('.loginDialog').css("display", "none");
                        $('.signupDialog').css("display", "none");
                        $('#RSlogo').css("display","none");
                        sessionStorage.setItem("playerID",user);
                        window.location.reload(false);
                    } else if (returnValue == "credsFirst") {
                        alert('Username or password is wrong');
                        $('#loader').css("display","none");
                        $('.loginDialog').css("display", "block");
                    } else if (returnValue == "lock") {
                        alert("You have tried login too many times");
                        $('#loader').css("display","none");
                        $('.loginDialog').css("display", "block");
                    } else if (returnValue == "creds") {
                        alert("Username or password is wrong");
                        $('#loader').css("display","none");
                        $('.loginDialog').css("display", "block");
                    } else { 
                        $('.loginDialog').css("display", "none");
                        $('.signupDialog').css("display", "none");
                    }
                });
                putToDB.fail(function(){
                    $('#loader').css("display","none");
                    alert("username or password is incorrect or database unreachable");
                });
            });
            getFromDB.fail(function(){
                $('#loader').css("display","none");
                console.log("database unreachable!");
            });
        } else {
            alert('please provide username and password');
        }
    });

    // hankitaan uusi suola
    getRandom = function(){
        var possible = "b8EFGHdefMNTUXYZVghiOC#%KaIJP)=?@56opAQRL&WtSjklmyncu/(\$\^\*vw34sxD79Bqrz012\!";
        var length = 10;
        var rnd = new Chance();
        var toPick = [];
        var randString = "";
        for(var j = 0;j < length;j++){
            toPick = [];
            for(var i = 0;i < length;i++){
                toPick.push(possible.charAt(rnd.integer({min:0,max:possible.length-1})));
            }
            randString += rnd.pick(toPick);
        }
        return randString;
    }
    // tiivistetään salasana
    hashPass = function(pss){
        var shaObj = new jsSHA("SHA-512", "TEXT");
        shaObj.update(pss);
        var hash = shaObj.getHash("HEX");
        return hash;
    }

    $('.password-retype').on('input', function() {
        // tarkistetaan, että salasanat täsmäävät
        //if(event.which == 20){ alert("caaappsss")};
        var check = checkRegisterInfo();
        if(check == false){
            $('.password-retype').css("border","2px solid #a50716");
            $('.password-retype').css("margin","26px 46px 0 0");
            //$('.email').css("margin-top","30px");
        } else{
            //$('.password-retype').css("border","2px solid #07a547");
            //$('.password-retype').css("margin","26px 48px 0 0");
            $('.password-retype').css("border","");
            $('.password-retype').css("margin","");
        }
    });
    // login -painike rekisteröitymisruudussa
    $('.register').click(function(){
        $('#loader').css("display","block");
        var givenUserName = $('.username-register').val();
        var email = $('.email').val();
        var check = checkRegisterInfo();
        // tarkistetaan, että salanat ovat samat ja käyttäjänimeksi on syötetty jotain
        if(check == true && givenUserName.length != 0){
            var pass =  $('.password-register').val();
            var genSalt = getRandom();
            var saltyhash = pass + genSalt;
            var sh = hashPass(saltyhash)+genSalt;
            var checkUser = $.ajax({
                    method:"POST",
                    //sync:false,
                    url:"PHP/CryptoHandler/newUser.php",
                    data:{newPass:sh, playerName:givenUserName,location:window.location.href, email:email}
            });
            checkUser.done(function(returnValue){
                if(returnValue == "success") {
                    $('#loader').css("display","none");
                    $('.signupDialog').css("display", "none");
                    $('.loginDialog').css("display", "block");
                    alert("registeration completed. Please Log in");
                } else if(returnValue == "taken"){
                    alert("This username was already taken!");
                    $('#loader').css("display","none");
                }
                    
            });
            checkUser.fail(function(){
                alert("database failure");               
            });
        } else {
            $('#loader').css("display","none");
            alert("please input valid user info");
        }
    });
    // kenttien tarkistus
    checkRegisterInfo = function(){
        var first = $('.password-register').val();
        var second = $('.password-retype').val();
        
        if(first != second){
            return false;
        } else{
            return true;
        }
    }
    // Kun painetaan Sign Up -painiketta
    $('.signUp').click(function(){
        //Tyhjennetääm tekstikentät
        $('.email').val('');
        $('.username-register').val('');
        $('.password-retype').val('');
        $('.username-register').val('');
        var other =  $('.loginDialog').css("display");
        if(other == "block"){
            $('.loginDialog').css("display","none");
        }
        $('.signupDialog').css("display","block");
        //$('#RSlogo').css("margin-top","20px");ronnie lisäsi
    });

    $('.info').hover(function(){
        $('.infoDialog').css("display","block");
    });

    $('.info').mouseout(function(){
        $('.infoDialog').css("display","none");
    });
 
    // Tutkitaan onko caps lock pohjassa
   $('.password').keypress(function(e) {
        var s = String.fromCharCode( e.which );
        // tarkistetaan, että sift ei ole pohjassa ja sift pohjassa s on pieni s. 
        if ( s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey ) {
             $('.capsLockWarning').css("display","block");
        } else{
            $('.capsLockWarning').css("display","none");
        } 
            
    });
       // kirjautumis/rekisteröitymisruutu loppuu
});