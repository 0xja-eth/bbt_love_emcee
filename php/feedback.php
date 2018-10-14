<?php

header('Content-type: application/json');
function feedback($code, $msg){
   $data = [
      "error" => $code,
      "msg"   => $msg
   ];
   echo json_encode($data);
}
