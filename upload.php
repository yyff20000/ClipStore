<?php
if ((($_FILES["file"]["type"] == "text/html")) && ($_FILES["file"]["size"] < 50*1024*1024)){

    $white_list = array("html");
    $file_ext = pathinfo($file, PATHINFO_EXTENSION);

    if ($_FILES["file"]["error"] > 0){
        echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
        return;
    }

    if(!in_array($file_ext,$white_list)){
        echo "File extention illegal! [".$file_ext."]";
        return;
    }
    if (file_exists("./uploads/" . $_FILES["file"]["name"])){
        echo $_FILES["file"]["name"] . " already exists. ";
    }else{
        move_uploaded_file($_FILES["file"]["tmp_name"], "./uploads/".$_FILES["file"]["name"]);
        echo "Stored in: " . "./upload/" . $_FILES["file"]["name"];
    }
}else{
    echo "Invalid file! [".$_FILES["file"]["name"]."]";
}
?>
