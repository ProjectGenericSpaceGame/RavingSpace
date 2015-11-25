<?php
    session_start();
	if($_SESSION['log'] != 1){
        header('Location: index.php');
        exit;
	} else {
        $_SESSION['log'] = 0;
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

    <script src="JS/libs/phaser.min.js"></script>
    <script src="JS/libs/jquery-1.11.2.min.js"></script>
    <script src="JS/libs/jssha/src/sha512.js"></script>
    <script src="JS/libs/Nonsense.js"></script>
    <script src="JS/libs/moment.js"></script>

    <script src="JS/menu/menuLoad.js"></script>
    <script src="JS/menu/mainMenu.js"></script>
    <script src="JS/menu/loadoutMenu.js"></script>

    <script src="JS/game/phaser_preload.js"></script>
    <script src="JS/game/phaser_create.js"></script>
    <script src="JS/game/phaser_GameLoop.js"></script>
    <script src="JS/game/endGame.js"></script>

    <script src="JS/menu/settingsSubMenu.js"></script>
    <script src="JS/menu/scoresSubMenu.js"></script>
    <script src="JS/menu/customSubMenu.js"></script>
    <script src="JS/menu/shopMenu.js"></script>
    <script src="JS/menu/waveMenu.js"></script>
    <script src="JS/menu/soundMenu.js"></script>

    <script src="JS/libs/textInputCreator.js"></script>
    <!-- <script src="JS/timer.js"></script> -->
</head>
<body>
<!-- Lautausruutu ---->    
<div id="loader"></div>
<header>
    <div class="cont">
    </div>
</header>
<main>
    <div id="phaserGame"></div>
    <div class="fontLoader"></div>
</main>
<footer></footer>
</body>
<script src="JS/Main.js"></script>
<script>makeGame();</script>
</html>