<?php

include_once("conn.php");

header('Content-type: application/json');

function return_copywriting(){

   if(time() < START_TIME){
      feedback(2, "活动还没开始哦，敬请期待～");
      exit;
   }
   if(time() > END_TIME){
      feedback(3, "活动已经结束啦，感谢关注～");
      exit;
   }

   // 随机文案
   global $link;
   $res = $link->query("SELECT * FROM copywriting AS t1 JOIN (SELECT ROUND(RAND()*((SELECT MAX(id) FROM copywriting)-(SELECT MIN(id) FROM copywriting))+(SELECT MIN(id) FROM copywriting)) AS uid) AS t2 WHERE t1.id >= t2.uid ORDER BY t1.id LIMIT 1");
   if($res)
      $row = $res->fetch_assoc();
   else{
      feedback(2, "啊哦出错了，请稍后再试");
      exit;
   }
   $cpw = $row['copywriting'];
   
   echo json_encode([
      "error" => 0,
      "copywriting" => $cpw
   ]);
}
if($_SERVER['REQUEST_METHOD'] == 'GET')
   return_copywriting();

