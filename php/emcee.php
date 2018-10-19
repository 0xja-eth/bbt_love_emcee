<?php

include_once("conn.php");

header('Content-type: application/json');
function emcee($data){
   if(time() < START_TIME){
      feedback(2, "活动还没开始哦，敬请期待～");
      exit;
   }
   if(time() > END_TIME){
      feedback(3, "活动已经结束啦，感谢关注～");
      exit;
   }
   
   $name = $data['name'];
   $sex = $data['sex'];
   $language = $data['language'];
   $voice = $data['voice'];
   
   // 保存录音，暂时无用   
   $record_path = "../record/".time().".wav";
   file_put_contents($record_path, base64_decode($voice));

   $tone = NULL;
   $description = NULL;
   
   // 随机查询分析报告
   global $link;
   if($sex == "男"){
      $res = $link->query("SELECT * FROM man_tone AS t1 JOIN (SELECT ROUND(RAND()*((SELECT MAX(id) FROM man_tone)-(SELECT MIN(id) FROM man_tone))+(SELECT MIN(id) FROM man_tone)) AS uid) AS t2 WHERE t1.id >= t2.uid ORDER BY t1.id LIMIT 1");
      if($res)
         $row = $res->fetch_assoc();
   }elseif($sex == "女"){
      $res = $link->query("SELECT * FROM girl_tone AS t1 JOIN (SELECT ROUND(RAND()*((SELECT MAX(id) FROM girl_tone)-(SELECT MIN(id) FROM girl_tone))+(SELECT MIN(id) FROM girl_tone)) AS uid) AS t2 WHERE t1.id >= t2.uid ORDER BY t1.id LIMIT 1");
      if($res)
         $row = $res->fetch_assoc();
   }else{
      feedback(4, "信息错误");
      exit;
   }
   
   $tone = $row['tone'];
   $description = $row['description'];

   // 获取音频url
   $voice_path = NULL;
   if($language == "国")
      $voice_path = RADIO_DIR_PATH."/Chinese/".mt_rand(1,41).".mp3";
   elseif($language == "粤")
      $voice_path = RADIO_DIR_PATH."/Cantonese/".mt_rand(1,13).".mp3";
   elseif($language == "英")
      $voice_path = RADIO_DIR_PATH."/English/".mt_rand(1,20).".mp3";
   else{
      feedback(4, "信息错误");
      exit;
   }

   // 随机星星指数
   $stars = mt_rand(3, 5);

   $result = [
      "name" => $name,
      "tone" => $tone,
      "description" => $description,
      "stars" => $stars,
      "voice_url" => $voice_path
   ];
   echo json_encode([
      "error" => 0,
      "data" => $result
   ]);
}


if($_POST){
   emcee($_POST);
}
