/**
 * Created by RAndom MC on 26/11/2015.
 */
var hashPass;
var getRandom;
var checkRegisterInfo;

$(document).ready(function(){
    // Poistetaan latausruutu
    $('#loader').css("display","none");
    // kirjautumisruutu / rekisteröitymisruutu
    $('.login').click(function(){
        var other =  $('.signupDialog').css("display");
        if(other == "block"){
            $('.signupDialog').css("display","none");
        }
        $('.loginDialog').css("display","block");
    });

    $('.cancelLogin').click(function(){
        $('.loginDialog').css("display","none");
        $('.signupDialog').css("display","none");
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
                //async:false,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
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
                        window.location.reload(false);
                    } else if (returnValue == "credsFirst") {
                        alert('salis on väärin tai käyttäjä nimi on väärin');
                        $('#loader').css("display","none");
                        $('.loginDialog').css("display", "block");
                        //makeGame();
                    } else if (returnValue == "lock") {
                        alert("olet yrittänyt kirjautumista liian monta kertaa! yritä 200vuoden päästä uudestaan");
                        $('#loader').css("display","none");
                        $('.loginDialog').css("display", "block");
                        //makeGame();
                    } else if (returnValue == "creds") {
                        alert("salis on väärin tai käyttäjä nimi on väärin");
                        $('#loader').css("display","none");
                        $('.loginDialog').css("display", "block");
                        //makeGame();
                    } else { // demoamiseen
                        //makeGame();
                        $('.loginDialog').css("display", "none");
                        $('.signupDialog').css("display", "none");
                    }
                });
                putToDB.fail(function(){
                    $('#loader').css("display","none");
                    console.log("username or password is incorrect or database unreachable");
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
        var possible = "b8EFGHdefMNTUXYZVghiOC#¤%KaIJP)=?@56opA£QRL\"&WtSjklmyncu/(\$\^\*\'vw34sxD79Bqrz012\!";
        var length = 10;
        var rnd = new Nonsense();
        var toPick = [];
        var randString = "";
        for(var j = 0;j < length;j++){
            toPick = [];
            for(var i = 0;i < length;i++){
                toPick.push(possible.charAt(rnd.integerInRange(0,possible.length-1)));
            }
            randString += rnd.pick(toPick);
        }
        return randString;
    }

    hashPass = function(pss){
        var shaObj = new jsSHA("SHA-512", "TEXT");
        shaObj.update(pss);
        var hash = shaObj.getHash("HEX");
        console.log(hash);
        console.log("dis");
        return hash;
    }

    $('.password-retype').on('input', function() {
        // tarkistetaan, että salasanat täsmäävät
        var check = checkRegisterInfo();
        if(check == false){
            $('.password-retype').css("border","2px solid #a50716");
            $('.password-retype').css("margin","26px 48px 0 0");
        } else{
            $('.password-retype').css("border","2px solid #07a547");
            $('.password-retype').css("margin","26px 48px 0 0");
        }
    });
    // login -painike rekisteröitymisruudussa
    $('.register').click(function(){
        var givenUserName = $('.username-register').val();
        console.log(givenUserName);
        var check = checkRegisterInfo();
        // tarkistetaan, että salanat ovat samat ja käyttäjänimeksi on syötetty jotain
        if(check == true && givenUserName.length != 0){
            console.log('tadaa');
            $('.signupDialog').css("display","none");
            makeGame();
        } else {
            console.log('noTadaa');
        }
    });
    // salasana kenttien tarkistus
    checkRegisterInfo = function(){
        var first = $('.password-register').val();
        var second = $('.password-retype').val();
        if(first != second){
            return false;
        } else{
            return true;
        }
    }

    $('.signUp').click(function(){
        var other =  $('.loginDialog').css("display");
        if(other == "block"){
            $('.loginDialog').css("display","none");
        }
        $('.signupDialog').css("display","block");
    });

    $('.info').hover(function(){
        $('.infoDialog').css("display","block");
    });

    $('.info').mouseout(function(){
        $('.infoDialog').css("display","none");
    });
    // kirjautumis/rekisteröitymisruutu loppuu
});