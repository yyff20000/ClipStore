<?php
// namespace ClipStore; 
require_once(dirname(__FILE__)."/utils.php");
Log::set_size(1024*1024*10);  
if(!defined('DS')){
    define('DS', DIRECTORY_SEPARATOR);                 // 设置目录分隔符 
}
if(!defined("LOG_PATH")){
    define('LOG_PATH',dirname(__FILE__).DS.'log'.DS);
}

$servername = "127.0.0.1";
$username = "root";
$password = "root";
$dbname = "ClipStore";

try {
    $conn = new PDO(
        "mysql:host=$servername;dbname=$dbname", 
        $username, 
        $password, 
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8mb4'")
    );
    $conn->setAttribute(
        PDO::ATTR_ERRMODE, 
        PDO::ERRMODE_EXCEPTION
    );
    Log::write('[INFO] '.__FILE__.': PDO connect OK -> #');

}catch(PDOException $e){
    echo $e->getMessage();
}
?>