<?php
if (is_ajax()) {
  data_function();
}
//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}
 
function data_function(){
  $return = $_POST;
  
  //Do what you need to do with the info.
  
  $return["json"] = json_encode($return);
  echo json_encode($return);
}
?>