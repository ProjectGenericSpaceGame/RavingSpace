<?php
include('cryptoClass.php');
$DBhash;
$return;
$failedAttempts;
$loginFollowID;
$tryLock;
$bcrypt = new Bcrypt(15);
if(strlen($_POST['playerName']) > 0) {
    $userName = $_POST['userName'];
    $givenHash = $_POST['givenHash'];
    $newPassWord = $_POST['newPass'];
    $newRandom = substr($givenHash, -10);
    $toCompare = substr($givenHash, 0, -10);

    $servername = "mysql.labranet.jamk.fi";
    $user = "H3492";
    $pass = "";
    $DBcon = new mysqli($servername, $user, $pass, "H3492_3");

    $select = "select passHash, playerData.loginFollowID, loginAttempts.failedTries, loginAttempts.fail1 from playerData
    inner join loginAttempts on loginAttempts.loginFollowID = playerData.loginFollowID
    where playerID = '$userName'";
    $query = $DBcon->query($select);//tulokset ovat $query muuttujassa
    $row = $query->fetch_assoc();

    $DBhash = substr($row['passHash'],0,-10);
    $failedAttempts = $row['failedTries'];
    $loginFollowID = $row['loginFollowID'];
    $tryLock = $row['fail1'];
} else {//demo
    $userName = "testi1";
    $givenHash = "5756c06c3eebc950605b15cee74e882e7c0218f6!!!!!!!!!!";
    $newPassWord = "634123f1a7d73d7c4b9d21971ce9acf9db706ae5";
    $newRandom = substr($givenHash,-10);
    $toCompare = substr($givenHash,0,-10);
    $DBhash = substr("$2a$15\$a7Qv.kC81iRsFyjCXQ5yluaCgw5cFyJfaf9FaGuqhy/xsZuBWWeR6##########",0,-10);
    $tryLock = 1227264499;
    $failedAttempts = 0;
    $loginFollowID = 1;
}
if($bcrypt->verify($toCompare, $DBhash) == 1 && $failedAttempts < 4 && (time()-$tryLock)>(10*60)){//jos salis oikein, ei lukossa ja ei liikaa yrityksiä
    $return = true;
    $toDB = $bcrypt->hash($newPassWord).$newRandom;
    $failedAttempts = 0;
    //query
    $select = "update playerData set passHash = '$toDB' where playerID = '$userName'";
    $DBcon->query($select);
    $select = "update loginAttempts set failedTries = $failedAttempts where loginFollowID = $loginFollowID";
    $DBcon->query($select);
} else if($bcrypt->verify($toCompare, $DBhash) != 1 && $failedAttempts < 4){// jos salis väärin ja yrityksiä vielä jäljellä
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

} else if($failedAttempts >= 4  && (time()-$tryLock)<(10*60)){ // jos ei yrityksiä jäljellä ja lukossa
    $return = "lock";
    //query
} else if($failedAttempts >= 4 && (time()-$tryLock)>(10*60) && $bcrypt->verify($toCompare, $DBhash) == 1){//jos lukitus loppunut ja oikein
    $return = true;
    $toDB = $bcrypt->hash($newPassWord).$newRandom;
    $failedAttempts = 0;
    //query
    $select = "update playerData set passHash = '$toDB' where playerID = '$userName'";
    $DBcon->query($select);
    $select = "update loginAttempts set failedTries = $failedAttempts where loginFollowID = $loginFollowID";
    $DBcon->query($select);
} else if($failedAttempts >= 4 && (time()-$tryLock)>(10*60)){// jos väärin ja lukitus loppu
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