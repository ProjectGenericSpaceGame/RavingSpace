<?php
/**
 * Created by PhpStorm.
 * User: H3492
 * Date: 2.12.2015
 * Time: 11:53
 */
include('cryptoClass.php');
$bcrypt = new Bcrypt(15);
	//alustetaan tiedot
	$returnObject = "";
    if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/"){
        $playerName = $_POST['playerName'];
        $servername = "mysql.labranet.jamk.fi";
        $user = "H3492";
        $pass = "cMcChhJ9jrWcjw3ajX4D3bDUrHBSn7gT";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
        $DBcon = new mysqli($servername,$user,$pass, "H3492_3");
        if ($DBcon->connect_error) {
            die("Connection failed: " . $DBcon->connect_error);
        }
    }
    else {
        $playerName = $_POST['playerName'];
        $servername = "localhost";
        $user = "root";
        $pass = "";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
        $DBcon = new mysqli($servername,$user,$pass, "H3492_3");
        if ($DBcon->connect_error) {
            die("Connection failed: " . $DBcon->connect_error);
        }
    }

    $pass = $_POST['newPass'];
    $DBhash = substr($pass,0,-10);
    $DBhash = $bcrypt->hash($DBhash);
    $DBhash .= substr($pass, -10);
    $email = $_POST['email'];
    $select = "select * from playerData where playerID = '".$playerName."'";
    $query = $DBcon->query($select);//tulokset ovat $query muuttujassa
    $len = $query->num_rows;
//    echo $len;
    if($len == 0){//jos ei löytynyt annettua käyttäjää
        $select = "select MAX(scoreID)+1 as scoreID from highScores";
        $query = $DBcon->query($select);
        $row = $query->fetch_array();
        $newID = $row['scoreID'];//nyt tiedämmä mikä on uusi korkein ID, tämä on sama kaikille tauluille

        $select = "
            insert into highScores (scoreID)
            values ($newID);
        ";
        $query = $DBcon->query($select);
//        echo "scoreID";
        $select = "
            insert into shipStates(wep1,wep2,wep3,wep4,wep5,wep6,wep7,wep8,wep9,wep10,pwer1,pwer2,pwer3,pwer4,pwer5,pwer6,pwer7,pwer8,pwer9,pwer10)
            values(1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
        ";
        $query = $DBcon->query($select);
//        echo "shipStates";
        $select = "
            insert into loginAttempts(fail1,fail2)
            values(0,'out')
        ";
        $query = $DBcon->query($select);
//        echo "loginAttempts";
        $select = "
            insert into playerData(playerID,passHash,email,money,points,shipID,scoreID,loginFollowID)
            values('".$playerName."','".$DBhash."','".$email."',0,0,$newID,$newID,$newID)
        ";
        $query = $DBcon->query($select);
        $returnValue = "success";
    }
    else{
        $returnValue = "taken";
    }

//    echo "fuuu";
    //$query->close();
    $DBcon->close();
//echo "everything works";
    echo $returnValue;
?>
