<?php
require_once(dirname(__FILE__)."/config.php");
// require_once(dirname(__FILE__)."/utils.php");
header('Content-type:application/json;charset=utf-8');

if(isset($_GET['key'])){
    $key_words = $_GET['key'];
    // echo $key_words;
    // $query = "SELECT id,title from articles WHERE MATCH (title,body) AGAINST (\"".$key_words."\" IN BOOLEAN MODE);";
    // echo $query;
    $query = "SELECT id,title from articles WHERE MATCH (title,body) AGAINST (? IN BOOLEAN MODE);";
    $stmt = $conn->prepare($query);
    $stmt->bindParam("1",$sql_key);
    $sql_key = $key_words;
    $stmt->execute();
    // foreach( $conn->query($query) as $row ){
    //     print_r( $row );
    // }
    $out = array();
    while ($row = $stmt->fetch()) {
        array_push($out,$row['title']);
    }
    $send = array(
        "code" => '1',
        "count" => count($out),
        'msg' => $out
    );
}else{
    $send = array(
        "code"=>'-1',
        "count" => '-1',
        'msg'=>"error"
    );
}
$jsn = json_encode($send);
echo $jsn; 