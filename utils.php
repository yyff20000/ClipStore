<?php
// namespace ClipStore; 
// ini_set('memory_limit','-1');
require_once(dirname(__FILE__)."/config.php");
/** 
 * 日志类 
 * @package    log 
 */  
class Log{  
    /** 
     * 单个日志文件大小限制 
     * @var int 字节数 
     */  
    private static $i_log_size = 5242880; // 1024 * 1024 * 5 = 5M  
      
    /** 
     * 设置单个日志文件大小限制 
     * @param int $i_size 字节数 
     */  
    public static function set_size($i_size)  
    {  
        if( is_numeric($i_size) ){  
            self::$i_log_size = $i_size;  
        }  
    }  
  
    /** 
     * 写日志 
     * @param string $s_message 日志信息 
     * @param string $s_type    日志类型 
     */  
    public static function write($s_message, $s_type = 'log')  
    {  
        // 检查日志目录是否可写  
         if ( !file_exists(LOG_PATH) ) {  
            @mkdir(LOG_PATH);       
        }  
         chmod(LOG_PATH,0777);  
        if (!is_writable(LOG_PATH)) exit('LOG_PATH is not writeable !');  
        $s_now_time = date('[Y-m-d H:i:s]');  
        $s_now_day  = date('Y_m_d');  
        // 根据类型设置日志目标位置  
        $s_target   = LOG_PATH;  
        switch($s_type)  
        {  
            case 'debug':  
                $s_target .= 'Out_' . $s_now_day . '.log';  
                break;  
            case 'error':  
                $s_target .= 'Err_' . $s_now_day . '.log';  
                break;  
            case 'log':  
                $s_target .= 'Log_' . $s_now_day . '.log';  
                break;  
            default:  
                $s_target .= 'Log_' . $s_now_day . '.log';  
                break;  
        }  
          
        //检测日志文件大小, 超过配置大小则重命名  
        if (file_exists($s_target) && self::$i_log_size <= filesize($s_target)) {  
            $s_file_name = substr(basename($s_target), 0, strrpos(basename($s_target), '.log')). '_' . time() . '.log';  
            rename($s_target, dirname($s_target) . DS . $s_file_name);  
        }  
        clearstatcache();  
        // 写日志, 返回成功与否  
        return error_log("$s_now_time $s_message\n", 3, $s_target);  
    }  
} 


/**
 * function html_render
 * @todo security
 */
function html_render($is_static, $filename){
    // $pre_path = '';
    // var_dump($is_static);
    if($is_static){
        $pre_path = "./statics/template/";
    }else{
        $pre_path = "./articles/";
    }
    $full_path = $pre_path.$filename;
    // print($full_path);
    if(file_exists($full_path)){
        Log::write('[INFO] '.__FILE__.': Render_file exists->'.$full_path);
        return file_get_contents($full_path);
    }else{
        Log::write('[DEBUG] '.__FILE__.': Render_file not exists->'.$full_path);
    }
} 


function process_uploads($filename){
    global $conn;
    $pre_path = "./uploads/";
    $full_path = $pre_path.$filename;
    // echo($full_path);
    $actual_path = "./articles/".$filename;
    if(file_exists($full_path)){
        if ( mb_internal_encoding()!="UTF-8") {
            mb_internal_encoding("UTF-8");
        }
        $content = file_get_contents($full_path);
        if (mb_check_encoding($content, "GBK")) {
            $content =  mb_convert_encoding($content, "UTF-8", "GBK");
        }
        $content = stripHtmlTags($content);
        $content = strip_tags($content);
        $content = preg_replace("/[\r\n\t\f\v]/",'',$content);
        // $content = trim($content);
        $content = preg_replace("/\s*/",'',$content);
        $query = "INSERT INTO articles (title,file_path,body) VALUES (?,?,?)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam("1",$title);
        $stmt->bindParam("2",$path);
        $stmt->bindParam("3",$body);
        $title = $filename;
        $path = $actual_path;
        $body = $content;
        $stmt->execute();
        // echo ($content);
    }
    rename($full_path,$actual_path);
}

function stripHtmlTags($str){
    $arr = array(
        "/<script[\w\W]*?script>/",
        "/<style[\w\W]*?style>/",
        "/[\r\n\t\f\v]/"
    );
    $res = preg_replace($arr, "", $str );
    // echo strlen($res);
    return $res;
}

function check_uploads(){
    
    $upload_folder = scandir("./uploads");
    $flag = 0;
    foreach($upload_folder as $a){
        if($a!=='.' && $a!==".."&& strtolower(pathinfo($a, PATHINFO_EXTENSION))==="html" ){
            // echo $a."<br/>";
            // print_r("Uploading: ./uploads/".$a."<br/>");
            Log::write('[INFO] '.__FILE__.": Uploading: ./uploads/".$a);
            process_uploads($a);
            Log::write('[INFO] '.__FILE__.": Success uploaded: ./uploads/".$a);
        }
    }
    if($flag ===1){
        header("Location: ./index.php");
    }
}

function String2Hex($string){
    $hex='';
    for ($i=0; $i < strlen($string); $i++){
        $hex .= dechex(ord($string[$i]));
    }
    return $hex;
}