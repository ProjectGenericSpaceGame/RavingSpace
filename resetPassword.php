<?php
session_start();
include('PHP/CryptoHandler/cryptoClass.php');
if($_SERVER['HTTP_HOST'] == "localhost:509"){
    require_once('PHP/db-initDEV.php');
} else {
    require_once('PHP/db-init.php');
}
/** @var $DBcon PDO */
$DBcon = new DBcon();
$DBcon = $DBcon->returnCon();
if(isset($_GET["id"]) && isset($_GET["name"])){
    $prepped = $DBcon->prepare("SELECT resetIdentifier, resetRequestDate
        FROM loginAttempts
        WHERE loginFollowID = (SELECT loginFollowID FROM playerData WHERE playerID = ?)");
    $prepped->execute(array($_GET["name"]));
    $row = $prepped->fetch(PDO::FETCH_ASSOC);
    if($row["resetIdentifier"] == $_GET["id"] && $row["resetRequestDate"] > 0 && is_int($row["resetRequestDate"]) && time()-$row["resetRequestDate"] < 900){
        if(!isset($_POST["submiter"])){/*Ei lomaketta*/
            /*Do nothing*/
            echo "here is not good";
        } else {/*Tallennetaan uusi salis*/
            $pass = $_POST["password"];
            $bcrypt = new Bcrypt(15);
            $DBhash = substr($pass,0,-10);
            $DBhash = $bcrypt->hash($DBhash);
            $DBhash .= substr($pass, -10);
            $prepped = $DBcon->prepare("UPDATE playerData SET passHash=? WHERE playerID=?");
            $prepped->execute(array($DBhash,$_GET["name"]));
            $prepped = $DBcon->prepare("UPDATE loginAttempts SET resetIdentifier=NULL, resetRequestDate=NULL WHERE loginFollowID=(SELECT loginFollowID FROM playerData WHERE playerID = ?)");
            $prepped->execute(array($_GET["name"]));
            header("Location: http://localhost:509/RavingSpace/index.php?msg=passResetSuccess");
            die();
        }
    } else {
        header("Location: http://localhost:509/RavingSpace/index.php?msg=nobusinessherewat");
        die();
    }

} else {
    header("Location: http://localhost:509/RavingSpace/index.php?msg=nobusinessherewut");
    die();
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
</head>
<body>
<!-- Lautausruutu ---->
<div id="loader"></div>
<header>

</header>
<main>
    <div id="phaserGame"></div>
    <div class="fontLoader"></div>
    <image src="assets/menuelements/RSlogo.png" alt="RSlogo" id="RSlogo"></image>
    <div class="loginDialog resetPassDialog">
        <h2 class="resetpassHeader">Change password</h2>
        <div class="line"></div>
        <form id="resetForm" method="post" action="resetPassword.php?id=<?php echo $_GET["id"]?>&name=<?php echo $_GET["name"]?>">
            <input type="hidden" id="hidden" name="submiter" value="exists">
            <p class="passLabel">Password *</p>
            <input name="password" class="password password-register input" type="password" value="" autocomplete="off" />

            <p class="passLabelRetype">Retype Password *</p>
            <input class="password-retype input" type="password" value="" autocomplete="off"/>

            <span class="capsLockWarning" style="display:none">CAPS LOCK is active</span>

            <div class="register button">
                <p id="resetPass" class="log">Save</p>
            </div>
            <div class="cancelLogin button">
                <p class="log">Cancel</p>
            </div>
        </form>

    </div>
</main>
</body>
<script>
    if($("#redirect").length > 0){
        $("#redirect").remove();
        if(window.location.href == "http://student.labranet.jamk.fi/~H3492/RavingSpace/" || window.location.href == "http://student.labranet.jamk.fi/~H3492/RavingSpace/index.php")
        {window.location.pathname = "~H3492/RavingSpace/game.php"}
        else {window.location.pathname = "/RavingSpace/game.php"}
    }
</script>
<script src="JS/login/handleLogin.js"></script>
</html>