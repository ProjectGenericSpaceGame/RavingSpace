<?php
    // db-init.php
class DBcon{
    private $db;
    public function __construct(){
        $this->db = new PDO('mysql:host=localhost;dbname=H3492_1;charset=utf8',
            'root', '');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        $this->returnCon();
    }
    public function returnCon() {
        return $this->db;
    }
}
?>