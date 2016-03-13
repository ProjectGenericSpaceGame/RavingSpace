<?php
/**
 * Created by PhpStorm.
 * User: RAndom MC
 * Date: 12/03/2016
 * Time: 20:13
 */
if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
    require_once('../db-init.php');
} else {
    require_once('../db-initDEV.php');
}
/** @var PDO $DBcon */
$DBcon = new DBcon();
$DBcon = $DBcon->returnCon();

$returnObject = '{"playerSongs":{';
$playerName = $_POST['playerName'];

$select = "
        SELECT songName, artist, price, asset, songs.usage FROM hasSongs
        INNER JOIN songs
        ON songs.songID = hasSongs.songID
        WHERE playerID = '$playerName'
";
$query = $DBcon->prepare($select);//tulokset ovat $query muuttujassa
$query->execute();
$menuPart = array();
$gamePart = array();
$allPart = array();
while($rowSong = $query->fetch(PDO::FETCH_ASSOC)){
    if($rowSong["usage"] == "menu"){
        $pushToArr = array("asset"=>$rowSong["asset"],"maker"=>$rowSong["artist"],"trackName"=>$rowSong["songName"]);
        array_push($menuPart,$pushToArr);
    }else {
        $pushToArr = array("asset"=>$rowSong["asset"],"maker"=>$rowSong["artist"],"trackName"=>$rowSong["songName"]);
        array_push($gamePart,$pushToArr);
    }
    $pushToArr = array("asset"=>$rowSong["asset"],"maker"=>$rowSong["artist"],"trackName"=>$rowSong["songName"],"price"=>$rowSong["price"]);
    array_push($allPart,$pushToArr);
    /*$i++;*/
}
$returnObject .= '"menu":'.json_encode($menuPart).",";
$returnObject .= '"game":'.json_encode($gamePart)."},";
$returnObject .= '"all":'.json_encode($allPart)."}";


echo $returnObject;

