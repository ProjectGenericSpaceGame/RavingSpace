<?php
/**
 * Created by PhpStorm.
 * User: H3492
 * Date: 2.12.2015
 * Time: 11:53
 */
if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
    require_once('../db-init.php');
} else {
    require_once('../db-initDEV.php');
}
include('cryptoClass.php');
$bcrypt = new Bcrypt(15);
/** @var PDO $DBcon */
$DBcon = new DBcon();
$DBcon = $DBcon->returnCon();
	//alustetaan tiedot
    $playerName = $_POST['playerName'];
    $pass = $_POST['newPass'];
	$returnObject = "";
    //Otetaan suola ja salikset talteen
    $DBhash = substr($pass,0,-10);
    $DBhash = $bcrypt->hash($DBhash);
    $DBhash .= substr($pass, -10);
    $email = $_POST['email'];
    $select = "SELECT COUNT(playerID)AS result FROM playerData WHERE playerID = '$playerName'";
    $query = $DBcon->query($select);//tulokset ovat $query muuttujassa
    $len = $query->fetch(PDO::FETCH_ASSOC);
//    echo $len;
    if($len["result"] == 0){//jos ei löytynyt annettua käyttäjää
        $select = "select MAX(loginFollowID)+1 as nextID from loginAttempts";
        $query = $DBcon->query($select);
        $row = $query->fetch(PDO::FETCH_ASSOC);
        $newID = $row['nextID'];//nyt tiedämmä mikä on uusi korkein ID, tämä on sama kaikille tauluille
        //loginFollow data
        $select = "
            insert into loginAttempts (loginFollowID, failedTries, lockTime,loggedIn, lastSuccesful)
            values ($newID,0,'0','out','N/A');
        ";
        $query = $DBcon->query($select);
        //playerData
        $select = "
            insert into playerData(playerID,passHash,email,money,points,loginFollowID)
            values('".$playerName."','".$DBhash."','".$email."',0,0,$newID)
        ";
        $query = $DBcon->query($select);
        //Shipdata
        $select = "
            insert into shipStates(shipID,playerID,speed,hp,model,gunDmgBonus)
            values($newID, '$playerName','100',1000,'basic','1');
        ";
        $query = $DBcon->query($select);
//      Add basic gun for ship";
        $select = "insert into shipGuns(shipID,has) values($newID,'basic')";
        $query = $DBcon->query($select);
        //basic songs
        for($daa = 1;$daa < 4;$daa++){
            $addSong = "
            insert into hasSongs(playerID,songID)
            values('$playerName', '$daa')
            ";
            $query = $DBcon->query($addSong);
        }

        $returnValue = "success";
    }
    else{
        $returnValue = "taken";
    }

    $DBcon = null;;
    echo $returnValue;
?>
