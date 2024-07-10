<?php
$conn = mysqli_connect("localhost","root","","angular_js");
$data = json_decode(file_get_contents("php://input"));
if(count($data)>0){
	$id= $data->id;
	$query ="DELETE FROM insert_emp_info WHERE id='$id'";
	if(mysqli_query($conn, $query)){
		echo 'Data Delete Successfully------';
	}else{
		echo 'Failed';
	}
}
?> 