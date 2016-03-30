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
$userName = $_POST['userName'];
$givenHash = $_POST['givenHash'];
$newPassWord = $_POST['newPass'];
if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
    require_once('../db-init.php');
} else {
    require_once('../db-initDEV.php');
}
/** @var PDO $DBcon */
$DBcon = new DBcon();
$DBcon = $DBcon->returnCon();

    $newRandom = substr($givenHash, -10);
    $toCompare = substr($givenHash, 0, -10);
    //echo $toCompare;
    //echo "µµ";
    //echo strlen($newRandom);

    $select = "select passHash, playerData.loginFollowID, loginAttempts.failedTries, loginAttempts.lockTime from playerData
    inner join loginAttempts on loginAttempts.loginFollowID = playerData.loginFollowID
    where playerID = '$userName'";
    $query = $DBcon->prepare($select);
    $query->execute();//tulokset ovat $row muuttujassa
    $checkExistense = "SELECT * FROM playerData WHERE playerData = $userName";
    $queryExistence = $DBcon->prepare($select);
    $queryExistence->execute();
    $row = $query->fetch(PDO::FETCH_ASSOC);
    if($queryExistence->fetchColumn() == false){//If given username doesn't exist, stop execution
        sleep(4);//Sleepd for 4 seconds to simulate proper username
        echo "credsFirst";
        die();
    }

    $DBhash = substr($row['passHash'],0,-10);
    $failedAttempts = $row['failedTries'];
    $loginFollowID = $row['loginFollowID'];
    $tryLock = $row['lockTime'];
    //echo strlen($DBhash);
    //echo "µµ";
    //echo $toCompare."+".$DBhash;
// $bcrypt->verify makes BCrypt hash out of given "clear"(SHA512 hash) password so we don't need to do this manually before comparing.
if($bcrypt->verify($toCompare, $DBhash) == 1 && $failedAttempts < 4 && (time()-$tryLock)>(10*60)){//jos salis oikein, ei lukossa ja ei liikaa yrityksiä
    $_SESSION['log'] = 1;
    $_SESSION['playerName'] = $userName;
    $return = true;
    $toDB = $bcrypt->hash($newPassWord);
    $toDB .= $newRandom;
    $failedAttempts = 0;
    //query
    $select = "update playerData set passHash = '$toDB' where playerID = '$userName'";
    //echo "daa?";
    $query = $DBcon->prepare($select);
    $query->execute();
    //echo "daa?";
    $timestamp = date('l jS \of F Y h:i:s A');
    $knownIP = $bcrypt->hash($_SERVER["REMOTE_ADDR"]);
    $select = "update loginAttempts set failedTries = $failedAttempts, loggedIn = 'in', lastSuccesful = '$timestamp', lastKnownIP='$knownIP' where loginFollowID = $loginFollowID";
    $query = $DBcon->prepare($select);
    $query->execute();
    /*$select = "update loginAttempts set  where loginFollowID = $loginFollowID";
    $query = $DBcon->prepare($select);
    $query->execute();

    $select = "update loginAttempts set  where loginFollowID = $loginFollowID";*/
    //echo "daa?";
} else if($bcrypt->verify($toCompare, $DBhash) != 1 && $failedAttempts < 4){// jos salis väärin ja yrityksiä vielä jäljellä
    $_SESSION['log'] = 0;
    $failedAttempts++;
    if($failedAttempts >= 4){
        $time = time();
        //query
        $select = "update loginAttempts set failedTries = $failedAttempts, lockTime = '$time' where loginFollowID = $loginFollowID";
    } else {
        $select = "update loginAttempts set failedTries = $failedAttempts where loginFollowID = $loginFollowID";
    }
    $return = "credsFirst";
    //query
    $query = $DBcon->prepare($select);
    $query->execute();

} else if($failedAttempts >= 4  && (time()-$tryLock)<(10*60)){// jos ei yrityksiä jäljellä ja lukossa
    $_SESSION['log'] = 0;
    $return = "lock";
    //query
} else if($failedAttempts >= 4 && (time()-$tryLock)>(10*60) && $bcrypt->verify($toCompare, $DBhash) == 1){//jos lukitus loppunut ja oikein
    $_SESSION['log'] = 0;
    $return = "trueRR";
    $toDB = $bcrypt->hash($newPassWord).$newRandom;
    $failedAttempts = 0;
    //query
    $select = "update playerData set passHash = '$toDB' where playerID = '$userName'";
    $query = $DBcon->prepare($select);
    $query->execute();
    $select = "update loginAttempts set failedTries = $failedAttempts where loginFollowID = $loginFollowID";
    $query = $DBcon->prepare($select);
    $query->execute();
} else if($failedAttempts >= 4 && (time()-$tryLock)>(10*60)){// jos väärin ja lukitus loppu
    $_SESSION['log'] = 0;
    $return = "creds";
    $failedAttempts = 1;
    //query
    $select = "update loginAttempts set failedTries = $failedAttempts where loginFollowID = $loginFollowID";
    $query = $DBcon->prepare($select);
    $query->execute();
}

//$query->close();
$DBcon = null;
echo $return;
?>