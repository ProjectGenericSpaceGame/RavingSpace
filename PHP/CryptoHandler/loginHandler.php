<?php
include('cryptoClass.php');
$DBhash;
$return;
$bcrypt = new Bcrypt(15);
if(strlen($_POST['playerName']) > 0) {
    $userName = $_POST['userName'];
    $givenHash = $_POST['givenHash'];
    $newPassWord = $_POST['newPass'];
    $newRandom = substr($givenHash, -10);
    $toCompare = substr($givenHash, 0, -10);

    $servername = "mysql.labranet.jamk.fi";
    $user = "H3492";
    $pass = "cMcChhJ9jrWcjw3ajX4D3bDUrHBSn7gT";
    $DBcon = new mysqli($servername, $user, $pass, "H3492_1");

    $select = "select passHash from playerData where playerID = '$userName'";
    $query = $DBcon->query($select);//tulokset ovat $query muuttujassa
    $row = $query->fetch_assoc();

    $DBhash = substr($row['passHash'],0,-10);
}

else {
    $userName = "testi1";
    $givenHash = "5756c06c3eebc950605b15cee74e882e7c0218f6!!!!!!!!!!";
    $newPassWord = "634123f1a7d73d7c4b9d21971ce9acf9db706ae5";
    $newRandom = substr($givenHash,-10);
    $toCompare = substr($givenHash,0,-10);
    $DBhash = substr("$2a$15\$a7Qv.kC81iRsFyjCXQ5yluaCgw5cFyJfaf9FaGuqhy/xsZuBWWeR6##########",0,-10);
    echo $DBhash;
}
if($bcrypt->verify($toCompare, $DBhash) == 1){
    $return = true;
    $toDB = $bcrypt->hash($newPassWord).$newRandom;
    echo "<br>";
    echo $toDB;
    //$select = "update playerData set passHash = $toDB where playerID = '$userName'";
    //$DBcon->query($select);
} else {
    $return = false;
    echo "failed";
}