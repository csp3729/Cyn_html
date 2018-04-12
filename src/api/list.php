<?php
/**
 * @Author: Marte
 * @Date:   2018-04-11 20:30:05
 * @Last Modified by:   Marte
 * @Last Modified time: 2018-04-12 16:48:00
 */
    //设置page,qty信息
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 10;

    //创建链接
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "project";

    $conn = new mysqli($servername,$username,$password,$dbname);

    //获取查询结果集
    $result = $conn->query('select * from goods');
    //使用查询结果集得到数组
    $data = $result->fetch_all(MYSQLI_ASSOC);

    //释放查询结果集
    // $result->close();
    //关闭数据库
    $conn->close();
    
    //格式化内容
    $res = array(
            "total" => count($data),
            "data" => array_slice($data,$qty*($page-1),$qty),
            // "qty" => $qty*1,
            "page" => $page*1
        );


    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>