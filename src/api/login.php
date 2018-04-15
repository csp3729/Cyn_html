<?php
    //调用文件链接数据库
    require('connect.php');
    $user = isset($_GET['user']) ? $_GET['user'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;

    //查询数据库判断用户是否存在
    $sql = "select * from user where phone='$user' OR name='$user' OR mail='$user'";

    $result = $conn->query($sql);

    $res = $result->fetch_all(MYSQLI_ASSOC);
    // var_dump($res[0]) ;

    if($result->num_rows <= 0){
        echo "fail";
    }else{
        if($password != null){
            if(in_array(md5($password),$res[0])){
                echo 'true';
            }else{
                echo 'false';
            }
        }else{
            echo "success";
        }
        
    }



    // $capitals = array(  
    //   'Arizona' => 'Phoenix',  
    //   'Alaska'  => 'Juneau',  
    //   'Alabama' => 'Montgomery'  
    // );  
    // var_dump($capitals);
?>