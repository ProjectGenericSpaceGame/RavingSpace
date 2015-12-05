<?php
session_start();
include('cryptoClass.php');
$DBhash;
$return;
$failedAttempts;
$loginFollowID;
$tryLock;
//$_SESSION['log'] = 1;
$bcrypt = new Bcrypt(15);
//$_POST['userName'] = 'testi1';

if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/index.php" || $_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/"){
    $userName = $_POST['userName'];
    $givenHash = $_POST['givenHash'];
    $newPassWord = $_POST['newPass'];
    $servername = "mysql.labranet.jamk.fi";
    $user = "H3492";
    $pass = "cMcChhJ9jrWcjw3ajX4D3bDUrHBSn7gT";
    $DBcon = new mysqli($servername,$user,$pass, "H3492_3");
    if ($DBcon->connect_error) {
        die("Connection failed: " . $DBcon->connect_error);
    }
} else {
    $servername = "localhost";
    $userName = $_POST['userName'];
    $givenHash = $_POST['givenHash'];
    $newPassWord = $_POST['newPass'];
    $user = "root";
    $pass = "";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
    $DBcon = new mysqli($servername,$user,$pass, "H3492_3");
    if ($DBcon->connect_error) {
        die("Connection failed: " . $DBcon->connect_error);
    }
}

    $newRandom = substr($givenHash, -10);
    $toCompare = substr($givenHash, 0, -10);
    //echo $toCompare;
    //echo "µµ";
    //echo strlen($newRandom);

    $select = "select passHash, playerData.loginFollowID, loginAttempts.failedTries, loginAttempts.fail1 from playerData
    inner join loginAttempts on loginAttempts.loginFollowID = playerData.loginFollowID
    where playerID = '$userName'";
    $query = $DBcon->query($select);//tulokset ovat $query muuttujassa
    $row = $query->fetch_assoc();

    $DBhash = substr($row['passHash'],0,-10);
    $failedAttempts = $row['failedTries'];
    $loginFollowID = $row['loginFollowID'];
    $tryLock = $row['fail1'];
    echo strlen($DBhash);
    echo "µµ";
    echo $toCompare."+".$DBhash;
if($bcrypt->verify($toCompare, $DBhash) == 1 && $failedAttempts < 4 && (time()-$tryLock)>(10*60)){//jos salis oikein, ei lukossa ja ei liikaa yrityksiä
    $_SESSION['log'] = 1;
    $return = true;
    $toDB = $bcrypt->hash($newPassWord);
    $toDB .= $newRandom;
    $failedAttempts = 0;
    //query
    $select = "update playerData set passHash = '$toDB' where playerID = '$userName'";
    //echo "daa?";
    $DBcon->query($select);
    //echo "daa?";
    $select = "update loginAttempts set failedTries = $failedAttempts where loginFollowID = $loginFollowID";
    $DBcon->query($select);
    $select = "update loginAttempts set fail2 = 'in' where loginFollowID = $loginFollowID";
    $DBcon->query($select);
    //echo "daa?";
} else if($bcrypt->verify($toCompare, $DBhash) != 1 && $failedAttempts < 4){// jos salis väärin ja yrityksiä vielä jäljellä
    $_SESSION['log'] = 0;
    $failedAttempts++;
    if($failedAttempts >= 4){
        $time = time();
        //query
        $select = "update loginAttempts set fail1 = '$time' where loginFollowID = $loginFollowID";
        $DBcon->query($select);
    }
    $return = "credsFirst";
    //query
    $select = "update loginAttempts set failedTries = $failedAttempts where loginFollowID = $loginFollowID";
    $DBcon->query($select);

} else if($failedAttempts >= 4  && (time()-$tryLock)<(10*60)){// jos ei yrityksiä jäljellä ja lukossa
    $_SESSION['log'] = 0;
    $return = "lock";
    //query
} else if($failedAttempts >= 4 && (time()-$tryLock)>(10*60) && $bcrypt->verify($toCompare, $DBhash) == 1){//jos lukitus loppunut ja oikein
    $_SESSION['log'] = 0;
    $return = true;
    $toDB = $bcrypt->hash($newPassWord).$newRandom;
    $failedAttempts = 0;
    //query
    $select = "update playerData set passHash = '$toDB' where playerID = '$userName'";
    $DBcon->query($select);
    $select = "update loginAttempts set failedTries = $failedAttempts where loginFollowID = $loginFollowID";
    $DBcon->query($select);
} else if($failedAttempts >= 4 && (time()-$tryLock)>(10*60)){// jos väärin ja lukitus loppu
    $_SESSION['log'] = 0;
    $return = "creds";
    $failedAttempts = 1;
    //query
    $select = "update loginAttempts set failedTries = $failedAttempts where loginFollowID = $loginFollowID";
    $DBcon->query($select);
}

//$query->close();
$DBcon->close();
echo $return;
?>