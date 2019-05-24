<?php
// namespace ClipStore; 
require_once(dirname(__FILE__)."/config.php");
require_once(dirname(__FILE__)."/utils.php");


echo html_render("index.html");

check_uploads();
// var_dump(process_uploads());
// process_uploads("Python沙箱逃逸总结 _ HatBoy的个人主页.html");

