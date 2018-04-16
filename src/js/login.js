jQuery(function($){
    let $loginBox = $('.login-box');
    let $user = $('#user');
    let $userHint = $('.user-hint');
    let $password = $('#password');
    let $passwordHint = $('.password-hint');
    let $code = $('#code');
    let $randomCode = $('.randomCode');
    let $codeHint = $('.code-hint');

    let $userLogin = $('.user-login');

    let userValue =0;
    let passwordValue =0;
    let codeValue = 0;

    $loginBox.on('change','input',function(){
        let $id = $(this).prop('id');
        let $val = $(this).val();
        if($id === 'user'){
            $userHint.text('');
            userValue = 0;
            ajax({
                url:"../api/login.php",
                data:{user:$val},
                success:function(data){
                    if(data === 'fail'){
                        $userHint.text('用户不存在');
                    }else{
                        userValue = 1;
                    }
                }
            });
        }
        if($id === 'code'){
            if(!($val.toLowerCase() === $randomCode.attr('data-code'))){
                $codeHint.text('验证码错误').css('color','#f00');
                codeValue = 0;
            }else{
                $codeHint.text('验证码正确').css('color','#00FF00');
                codeValue = 1;
            }
        }
        if($id === 'password'){
            $passwordHint.text('');
        }
    })

    $userLogin.on('click',function(){
        if($user.val() === ''){
            $userHint.text('请输入用户名');
        }
        if($password.val() === ''){
            $passwordHint.text('请输入密码');
        }
        if($code.val() === ''){
            $codeHint.text('请输入验证码');
        }
        if(userValue === 1 && codeValue === 1){
            ajax({
                url:"../api/login.php",
                data:{
                    user:$user.val(),
                    password:$password.val()
                },
                success:function(data){
                    console.log(data)
                    if(data === false){
                        $passwordHint.text('密码错误');
                    }else{
                        let username = $user.val();
                        document.cookie = 'username=' + username + ';path=/';
                        location.href = "../index.html?user=" + username + ";path=/";
                    }
                }
            })
        }
    })

    //随机验证码
    function RandomCode(){
        ajax({
            url:"../api/code.php",
            data:{
                num:randomNumber(1,30)
            },
            success:function(data){
                let item = data[0];
                $randomCode.prop('src',item.img)
                .attr('data-code',item.dataCode);
            }
        })
    }

    RandomCode();
    //点击刷新验证码
    $randomCode.on('click',function(){
        $code.val('');
        $codeHint.text('');
        codeValue = 0;
        RandomCode();
    });
});









