<?php
/**
 * Created by PhpStorm.
 * User: RAndom MC
 * Date: 17/03/2016
 * Time: 11:12
 */

include('../CryptoHandler/cryptoClass.php');
$bcrypt = new Bcrypt(15);
if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
    require_once('../db-init.php');
} else {
    require_once('../db-initDEV.php');
}
function tryUpdate($data,$bcrypt,$db){
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
    }
    if($data["password"] == "N/A" && $data["email"] == "N/A"){
        $returnValue[0] = "noChange";
        $returnValue[1] = "noChange";
        return $returnValue;
    }

    $select .= 'WHERE playerID="'.$data["playerName"].'"';
    $query = $db->prepare($select);
    $query->execute();
    $select = "SELECT passHash, email FROM playerData WHERE playerID='".$data["playerName"]."'";
    $query = $db->prepare($select);
    $query->execute();
    $row = $query->fetch(PDO::FETCH_ASSOC);
    if($row["passHash"] == $newPass){
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
function resetAll($data,$db){
    /** @var PDO $db*/
    try{
        $select = "SELECT shipID, playerID FROM shipStates WHERE playerID = '".$data["playerName"]."'";
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
        $select = 'UPDATE shipStates SET speed = "100", hp=1000, model="basic", gunDmgBonus="1"  WHERE shipID='.$shipID.'';//Perusalus
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
$playerName = $_POST['playerName'];
//$playerName = "testi1";
$loginFollowID = (integer)$_POST['loginFollow'];
//$loginFollowID = 1;
$isIn = false;
//query
$select = "select loggedIn from loginAttempts where loginFollowID = $loginFollowID";
$query = $db->prepare($select);//tulokset ovat $query muuttujassa
$query->execute();
$row = $query->fetch(PDO::FETCH_ASSOC);
if($row['loggedIn'] == "in"){
    if($_POST["usage"] == "updateAccountData"){
        echo json_encode(tryUpdate($_POST,$bcrypt,$db));//tryUpdate palauttaa päivityksen tuloksen
        $db = null;
    } else if($_POST["usage"] == "resetAll"){
        echo resetAll($_POST,$db);
        $db = null;
    }
}