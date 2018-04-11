<?php
/**
 * @Author: Marte
 * @Date:   2018-04-11 20:30:05
 * @Last Modified by:   Marte
 * @Last Modified time: 2018-04-11 20:48:49
 */
//创建链接
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project";

$conn = new mysqli($servername,$username,$password,$dbname);

$result = $conn->query('select * from goods');
$result = $result->fetch_all(MYSQLI_ASSOC);
var_dump($result);
// echo $result;
?>