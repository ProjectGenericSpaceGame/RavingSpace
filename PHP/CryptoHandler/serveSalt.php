<?php
$userName;
$return;

if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/index.php" || $_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/"){
    $playerName = $_POST['playerName'];
    $servername = "mysql.labranet.jamk.fi";
    $user = "H3492";
    $pass = "cMcChhJ9jrWcjw3ajX4D3bDUrHBSn7gT";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
    $DBcon = new mysqli($servername,$user,$pass, "H3492_3");
    if ($DBcon->connect_error) {
        die("Connection failed: " . $DBcon->connect_error);
    }
} else {
    $playerName = $_POST['playerName'];
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