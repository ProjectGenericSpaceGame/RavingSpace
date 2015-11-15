<?php
$userName;
$return;

if(strlen($_POST['playerName']) > 0) {
    $userName = $_POST['playerName'];

    $servername = "mysql.labranet.jamk.fi";
    $user = "H3492";
    $pass = "";
    $DBcon = new mysqli($servername, $user, $pass, "H3492_3");
    $select = "select passHash from playerData where playerID = '$userName'";

    $query = $DBcon->query($select);//tulokset ovat $query muuttujassa
    $row = $query->fetch_assoc();

    $return = substr($row['passHash'],-10);
    $query->close();
    $dbcon->close();
} else {
    $return = substr("$2a$15\$a7Qv.kC81iRsFyjCXQ5yluaCgw5cFyJfaf9FaGuqhy/xsZuBWWeR6##########",-10);
}
echo $return;
?>