<?php
/**
 * @Author: Marte
 * @Date:   2018-04-12 17:22:24
 * @Last Modified by:   Marte
 * @Last Modified time: 2018-04-12 17:28:57
 */
    $id = isset($_GET['id']) ? $_GET['id'] : null;

    //创建链接
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "project";

    $conn = new mysqli($servername,$username,$password,$dbname);

    //获取查询结果集
    $result = $conn->query('select id from goods');

    //使用查询结果集得到数组
    
?>