<?php
    // db-init.php
    $db = new PDO('mysql:host=localhost;dbname=H3492_1;charset=utf8',
                  'root', '');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
?>