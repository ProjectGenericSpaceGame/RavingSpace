<?php
$userName;
$return;

if(strlen($_POST['playerName']) > 0){
    $playerName = $_POST['playerName'];
    $servername = "mysql.labranet.jamk.fi";
    $user = "H3492";
    $pass = "";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
    $DBcon = new mysqli($servername,$user,$pass, "H3492_3");
    if ($DBcon->connect_error) {
        die("Connection failed: " . $DBcon->connect_error);
    }
} else {
    $playerName = "testi1";
    $servername = "localhost";
    $user = "root";
    $pass = "";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
    $DBcon = new mysqli($servername,$user,$pass, "H3492_3");
    if ($DBcon->connect_error) {
        die("Connection failed: " . $DBcon->connect_error);
    }
}
    $select = "select passHash from playerData where playerID = '$playerName'";
    $query = $DBcon->query($select);//tulokset ovat $query muuttujassa
    $row = $query->fetch_assoc();
    $return = substr($row['passHash'],-10);
    $query->close();
    $DBcon->close();

echo $return;
?>