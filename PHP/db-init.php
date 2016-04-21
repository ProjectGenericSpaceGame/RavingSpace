<?php
    // db-init.php
class DBcon{
    private $db;
    public function __construct(){
        $this->db = new PDO('mysql:host=mysql.labranet.jamk.fi;dbname=H3492_1;charset=utf8',
            'H3492', 'cMcChhJ9jrWcjw3ajX4D3bDUrHBSn7gT');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }
    public function returnCon() {
        return $this->db;
    }
}

?>
