<?php
    // db-init.php
    $db = new PDO('mysql:host=mysql.labranet.jamk.fi;dbname=H3492_1;charset=utf8',
                  'H3492', 'cMcChhJ9jrWcjw3ajX4D3bDUrHBSn7gT');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
?>