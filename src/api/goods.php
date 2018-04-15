<?php
    //调用文件链接数据库
    require('connect.php');

    //获取传入的商品id，如果没有传id默认获取id为1的商品
    $id = isset($_GET['id']) ? $_GET['id'] : 1;

    //获取查询结果集
    $result = $conn->query("select * from goods where id=$id");
    //使用查询结果集得到数组
    // $data = $result->fetch_all(MYSQLI_ASSOC);
    // 避免传入多个id，改使用fetch_assoc()
    $res = $result->fetch_assoc();

    //释放查询结果集
    $result->close();
    //关闭数据库
    $conn->close();

    //转换成json字符串输出
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
   
?>