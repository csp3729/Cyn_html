<?php
    //调用文件链接数据库
    require('connect.php');

    $num = isset($_GET['num']) ? $_GET['num'] : 1;

    $sql = "select * from code where id='$num'";

    $result = $conn->query($sql);

    $data = $result->fetch_all(MYSQL_ASSOC);

    $result->close();

    $conn->close();

    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    
?>