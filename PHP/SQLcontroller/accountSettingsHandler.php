<?php
/**
 * Created by PhpStorm.
 * User: RAndom MC
 * Date: 17/03/2016
 * Time: 11:12
 */
session_start();
include('../CryptoHandler/cryptoClass.php');
$bcrypt = new Bcrypt(15);
if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
    require_once('../db-init.php');
} else {
    require_once('../db-initDEV.php');
}
function tryUpdate($data,$bcrypt,$db,$playerName){
    /** @var PDO $db*/
    /** @var Bcrypt $bcrypt*/
    $returnValue = array();
    $select = "UPDATE playerData SET ";
    //tarkistetaan sposti
    if($data["email"] != "N/A"){
        if($data["email"] != ""){
            if(preg_match("/.@.*.\.(fi|com|net|io|org|fr|uk|ca|us|au|ru|ch|it|se|no|es)$/",$data["email"])){
                $select .= 'email="'.$data["email"].'", ';
            } else {
                $returnValue[0] = "wrongEmailFormat";
            }
        } else {
            $select .= 'email="'.$data["email"].'", ';
        }
    }
    if($data["password"] != "N/A"){
        $givenHash = $data["password"];
        $newRandom = substr($givenHash, -10);
        $toHash = substr($givenHash, 0, -10);
        $newPass = $bcrypt->hash($toHash).$newRandom;
        $select .= 'passHash="'.$newPass.'"';
    } else {
        $select = substr($select,0,-2);
        $newPass = "";
    }
    if($data["password"] == "N/A" && $data["email"] == "N/A"){
        $returnValue[0] = "noChange";
        $returnValue[1] = "noChange";
        return $returnValue;
    }

    $select .= 'WHERE playerID="'.$playerName.'"';
    echo $select;
    $query = $db->prepare($select);
    $query->execute();
    $select = "SELECT passHash, email FROM playerData WHERE playerID='".$playerName."'";
    $query = $db->prepare($select);
    $query->execute();
    $row = $query->fetch(PDO::FETCH_ASSOC);
    if($row["passHash"] == $newPass || $newPass == ""){
        $returnValue[1] = "success";
        if($row["email"] == $data["email"] || $data["email"] == "N/A"){
            $returnValue[0] = "success";
        } else if($returnValue[0] != "wrongEmailFormat"){
            $returnValue[0] = "emailError";
        }
    } else if($row["email"] == $data["email"] && $data["email"] != "N/A" && $data["email"] != "" && $returnValue[0] != "wrongEmailFormat"){
        $returnValue[0] = "passwordError";
        if($row["passHash"] == $newPass){
            $returnValue[1] = "emailSuccess";
        }
    } else {
        $returnValue[0] = "fail";
    }
    return $returnValue;
}
function resetAll($data,$db,$playerName){
    /** @var PDO $db*/
    try{
        $select = "SELECT shipID, playerID FROM shipStates WHERE playerID = '".$playerName."'";
        $query = $db->prepare($select);//tulokset ovat $query muuttujassa
        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);
        $shipID = $row["shipID"];
        $playerID = $row["playerID"];
        $select = 'UPDATE playerData SET money = 0, points = 0 WHERE playerID="'.$playerID.'"';//Nollaa rahat ja pisteet
        $query = $db->prepare($select);//tulokset ovat $query muuttujassa
        $query->execute();
        $select = 'UPDATE attackWaves SET playerID = "testi1" WHERE playerID="'.$playerID.'"';//poista kaikki aaltojen omistussuhteet (jättää aallot)
        $query = $db->prepare($select);//tulokset ovat $query muuttujassa
        $query->execute();
        $select = 'UPDATE shipStates SET speed = "100", hp=1000, model="basic", gunDmgBonus="1"  WHERE shipID='.$shipID;//Perusalus
        $query = $db->prepare($select);//tulokset ovat $query muuttujassa
        $query->execute();
        $select = 'DELETE FROM shipGuns WHERE shipID="'.$shipID.'" AND has <> "basic"';//poista kaikki paitsi perusase
        $query = $db->prepare($select);//tulokset ovat $query muuttujassa
        $query->execute();
        $select = 'DELETE FROM shipPowers WHERE shipID="'.$shipID.'"';//poista kaikki powerit
        $query = $db->prepare($select);//tulokset ovat $query muuttujassa
        $query->execute();
        $returnValue = "success";
    } catch(PDOException $e){
        $returnValue = "error";
    }
    return $returnValue;
}
$db = new DBcon();
$db = $db->returnCon();
//alustetaan tiedot
$returnObject = "";
$playerName = $_SESSION['playerName'];
//$playerName = "testi1";
$loginFollowID = (integer)$_POST['loginFollow'];
//$loginFollowID = 1;
$isIn = false;
//query
$isIn = getFromDB("SELECT loggedIn FROM loginAttempts WHERE loginFollowID = $loginFollowID","loggedIn",$db);
$IP = getFromDB("SELECT lastKnownIP FROM loginAttempts WHERE loginFollowID = $loginFollowID","lastKnownIP",$db);
if($isIn == "in" && $bcrypt->verify($_SERVER["REMOTE_ADDR"],$IP)){
    if($_POST["usage"] == "updateAccountData"){
        echo json_encode(tryUpdate($_POST,$bcrypt,$db,$playerName));//tryUpdate palauttaa päivityksen tuloksen
        $db = null;
    } else if($_POST["usage"] == "resetAll"){
        echo resetAll($_POST,$db,$playerName);
        $db = null;
    }
}
function getFromDB($query,$toGet,$db){
    /** @var $db PDO */
    $prepared = $db->prepare($query);
    $prepared->execute();
    $row = $prepared->fetch(PDO::FETCH_ASSOC);
    return $row[$toGet];
}