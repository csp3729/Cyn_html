<?php
    //调用文件链接数据库
    require('connect.php');

    $username = isset($_GET['username']) ? $_GET['username'] : null;
    $phone = isset($_GET['phone']) ? $_GET['phone'] : null;
    $mail = isset($_GET['mail']) ? $_GET['mail'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;

    //查询数据判断是否存在
    $sql = "select phone,name,mail from user where phone='$phone' OR name='$username' OR mail='$mail'";

    $result = $conn->query($sql);

    if($result->num_rows > 0){
        echo "fail";
    }else{
        if($type === 'reg'){
            //加密
            $password = md5($password);

            //注册(信息写入到数据库)
            $sql = "insert into user(name,phone,mail,password) values ('$username','$phone','$mail','$password')";

            $res = $conn->query($sql);

            if($res){
                echo "success";
            }else{
                echo "fail";
            }
        }else{
            echo "success";
        }
    }

?>