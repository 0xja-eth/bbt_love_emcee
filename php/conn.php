<?php

include_once("config.php");
include_once("feedback.php");

$link = new mysqli(SERVERNAME, USERNAME, PASSWORD, DATABASE);

if($link->connect_error){
   feedback(1, "数据库连接失败，请稍后再试");
   exit;
}

if(!$link->set_charset("utf8mb4")){
   feedback(1, "数据库设置失败，请稍后再试");
   exit;
}

