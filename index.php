<?php
	session_start();
    //$_SESSION['log'] = 3;
    if($_SESSION['log'] != 1) {
        $_SESSION['log'] = 0;
    } else if($_SESSION['log'] == 1){
        echo "<div class='hidden' id='redirect'>redirect</div>";
    }
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Raving Space | Space Game </title>
    <meta name="description" content="Template">
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin">
    <link rel="stylesheet" href="css/main.css" />

    <script src="JS/libs/jquery-1.11.2.min.js"></script>
    <script src="JS/libs/jssha/src/sha512.js"></script>
    <script src="JS/libs/chance.js"></script>

    <!-- <script src="JS/timer.js"></script> -->
</head>
<body>
<!-- Lautausruutu ---->    
<div id="loader"></div>
<header>
    <div class="cont">
        <div class="login">
            <p class="log">Login</p>
        </div>
        <div class="signUp">
            <p class="log">Sign Up</p>
        </div>
    </div>
</header>
<main>
    <div id="phaserGame"></div>
    <div class="fontLoader"></div>
    <image src="assets/menuelements/RSlogo.png" alt="RSlogo" id="RSlogo"></image>
    <div class="loginDialog">
            <h class="dialogHeader">Login</h>
            <div class="line"></div>
            <p class="userLabel">Username</p>
            <input class="username input" type="text"/>
            
            <span class="capsLockWarning" style="display:none">CAPS LOCK is active</span>
            <p class="passLabel">Password</p>
            <input class="password input" type="password" value="" autocomplete="off"/>

            <p class="forgot"><a href="forgotyourpass.html">Forgot your password or username?</a></p>

            <div class="loginCheck">
                <p class="log">Login</p>
            </div>
            <div class="cancelLogin">
                <p class="log">Cancel</p>
            </div>
    </div>
    <!-- rekisteröitymisruutu --->
    <div class="signupDialog">
        <h class="dialogHeader">Register</h>
        <div class="line"></div>

        <p class="userLabel">Username *</p>
        <input class="username username-register input" type="text"/>

        <p class="passLabel">Password *</p>
        <input class="password password-register input" type="password" value="" autocomplete="off" />

        <p class="passLabelRetype">Retype Password *</p>
        <input class="password-retype input" type="password" value="" autocomplete="off"/>

        <p class="emailLabel">Email</p>
        <input class="email input" type="text"/>

        <div class="register">
            <p class="log">Login</p>
        </div>
        <img class="info" src="assets/menuelements/info.png" alt="info" height="30" width="auto"/>
        <div class="cancelLogin">
            <p class="log">Cancel</p>
        </div>
        
    </div>
    <div class="infoDialog">
        <p class="infoText">You can only reset your password if you add your email. </br> Fields marked with * are mandatory</p>
    </div>
</main>
<footer></footer>
</body>
<script>
    if($("#redirect").length > 0){
        $("#redirect").remove();
        if(window.location.href == "http://student.labranet.jamk.fi/~H3492/RavingSpace/" || window.location.href == "http://student.labranet.jamk.fi/~H3492/RavingSpace/index.php")
        {window.location.pathname = "~H3492/RavingSpace/game.php"}
        else {window.location.pathname = "RavingSpace/game.php"}
    }
</script>
<script src="JS/login/handleLogin.js"></script>
</html>