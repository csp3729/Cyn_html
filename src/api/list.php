<?php
    //调用文件链接数据库
    require('connect.php');

    //设置page,qty信息
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 10;

    //获取查询结果集
    $result = $conn->query('select * from goods');
    //使用查询结果集得到数组
    $data = $result->fetch_all(MYSQLI_ASSOC);

    //释放查询结果集
    $result->close();
    //关闭数据库
    $conn->close();
    
    //格式化内容
    $res = array(
            "total" => count($data),
            "data" => array_slice($data,$qty*($page-1),$qty),
            // "qty" => $qty*1,
            "page" => $page*1
        );

    //转换成json字符串输出
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>