jQuery(function($){
    //注册导引
    let $btList = $('.register-bt').find('li');

    //注册信息填写框
    //第一步
    let $registerFirst = $('.register-first');

    //手机号码元素
    let $phone = $('#phone');
    let $phoneHint = $('.phone-hint');//提示框
    //手机号码验证正则
    let phone = new RegExp(/^1[34578]\d{9}$/);

    //验证码元素
    let $code = $('#code');
    let $randomCode = $('.randomCode');//随机验证码
    let $codeHint = $('.code-hint');//提示框

    //手机验证码元素
    let $phoneCode = $('#phoneCode');
    let $phoneCodeHint = $('.phoneCode-hint');//提示框

    //协议勾选
    let $agreementHint = $('.agreement-hint');//提示框

    //声明变量，用来储存表单验证结果，1正确 0错误
    //手机号码验证结果
    let phoneValue;
    //验证码验证结果
    let codeValue =1;
    //手机验证码验证结果
    let phoneCodeValue;

    //协议状态初始值，默认勾选
    let agreemenValue = 1;


    $registerFirst.on('change','input',function(){
        let $id = $(this).prop('id');
        if($id === 'phone'){
            let $val = $(this).val();
            if(!(phone.test($val))){
                $phoneHint.width('80%')
                .text('请输入11位正确手机号码');
                phoneValue = 0;
            }else{
                ajax({
                    url:"../api/reg.php",
                    data:{phone:$val},
                    success:function(data){
                        if(data === 'fail'){
                            $phoneHint.width('80%')
                            .text('该手机号码已注册');
                            phoneValue = 0;
                        }else{
                            $phoneHint.width(0);
                            phoneValue = 1;
                        }
                    }
                });
            }
        };
        if($id === 'code'){
            let $val = $(this).val();
            if(!($val === $randomCode.attr('data-code'))){
                $codeHint.width('80%')
                .text('验证码错误').css('color','#f00');
                codeValue = 1;
            }else{
                $codeHint.width('80%')
                .text('验证码正确').css('color','#00FF00');
                codeValue = 1;
            }
        };
        if($id === 'phoneCode'){
            let $val = $(this).val();
            if(!(/[\d]{6}/).test($val)){
                $phoneCodeHint.width('80%')
                .text('手机验证码为6位数字');
                phoneCodeValue = 0;
            }else{
                if($val === res){
                    $phoneCodeHint.width('80%')
                    .text('验证码正确').css('color','#00FF00');
                    phoneCodeValue = 1;
                }else{
                    $phoneCodeHint.width('80%')
                    .text('手机验证码错误').css('color','#f00');
                    phoneCodeValue = 0;
                }
            }
        }
    })

    //协议勾选
    .on('click','.agreement span',function(){
        if(agreemenValue === 1){
            agreemenValue = 0;
            $(this).css({
                'background':'#fff',
                'borderColor':'#000'
            });
        }else{
            console.log(666)
            agreemenValue = 1;
            $(this).css({
                'background':'url("../css/img/accept-icon.png")',
                'borderColor':'#fff'
            });
            $agreementHint.width(0);
        }
    })

    //下一步
    .on('click','.first-next',function(){
        //判断是否填写手机号码
        if($phone.val() === ""){
            $phoneHint.width('80%')
            .text('请输入11位正确手机号码');
        }

        //判断是否填写验证码
        if($code.val() === ""){
            $codeHint.width('80%')
            .text('验证码错误');
        }

        //判断是填写手机验证码
        if($phoneCode.val() === ""){
            $phoneCodeHint.width('80%')
            .text('手机验证码不能为空');
        }

        //判断是否勾选协议
        if(agreemenValue === 0){
            $agreementHint.width('80%')
            .text('请阅读并同意该协议');
        }

        if(phoneValue === 1 && codeValue === 1 && phoneCodeValue === 1 && agreemenValue === 1){
            $registerFirst.css('display','none');
            $registerSecond.css('display','block');
            $btList.removeClass().eq(1).addClass('conspicuous');
        }
    })

    $randomCode.on('click',function(){
        $codeHint.width(0)
        RandomCode();
    });

    //第二步
    let $registerSecond = $('.register-second');

    //用户名
    let $user = $('#user');
    let $userHint = $('.user-hint');//提示框
    //用户名验证正则，6到16位(包括字母、数字、下划线、减号)
    let userReg = /^[a-zA-Z0-9_-]{6,16}$/; 

    //邮箱
    let $mail = $('#mail');
    let $mailHint = $('.mail-hint');//提示框
    //邮箱验证正则
    let mailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 

    //密码
    let $password = $('#password');
    let $passwordHint = $('.password-hint');
    //密码验证正则，8到16位数字与字母组合
    let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

    //密码确认
    let $affirm = $('#affirm');
    let $affirmHint = $('.affirm-hint');//提示框
    //点击注册
    let $secondNext = $('.second-next');


    //声明变量，用来储存表单验证结果，1正确 0错误
    //用户名
    let userValue;
    //邮箱
    let mailValue;
    //密码
    let passwordValue;
    //密码确认
    let affirmValue ;


    $registerSecond.on('change','input',function(){
        console.log(666);
        let $id = $(this).prop('id');
        if($id === 'user'){
            let $val = $(this).val();
            if(!(userReg.test($val))){
                $userHint.width('80%')
                .text('请输入6到16位(包括字母、数字、下划线、减号)');
                userValue = 0;
            }else{
                ajax({
                    url:"../api/reg.php",
                    data:{username:$val},
                    success:function(data){
                        if(data === 'fail'){
                            $userHint.width('80%')
                            .text('用户名已存在');
                            userValue = 0;
                        }else{
                            $userHint.width(0);
                            userValue = 1;
                        }
                    }
                });
            }
        };
        if($id === 'mail'){
            let $val = $(this).val();
            if(!(mailReg.test($val))){
                $mailHint.width('80%')
                .text('请填写正确的邮箱地址');
                mailValue = 0;
            }else{
                ajax({
                    url:"../api/reg.php",
                    data:{mail:$val},
                    success:function(data){
                        if(data === 'fail'){
                            $mailHint.width('80%')
                            .text('邮箱已注册');
                            mailValue = 0;
                        }else{
                            $mailHint.width(0);
                            mailValue = 1;
                        }
                    }
                });
            }
        };
        if($id === 'password'){
            let $val = $(this).val();
            if(!(passwordReg.test($val))){
                $passwordHint.width('80%')
                .text('请输入8到16位数字与字母组合的密码');
                passwordValue = 0;
            }else{
                $passwordHint.width(0);
                passwordValue = 1;
            }
        };
        if($id === 'affirm'){
            let $val = $(this).val();
            if($val != $('#password').val()){
                $affirmHint.width('80%')
                .text('两次输入的密码不一致');
                affirmValue = 0;
            }else{
                $affirmHint.width(0);
                affirmValue = 1;
            }
        }
    })

    .on('click','.second-next',function(){
        //判断是否填写用户名
        if($user.val() === ""){
            $userHint.width('80%')
            .text('用户名不能为空');
        }

        //判断是否填写邮箱
        if($mail.val() === ""){
            $mailHint.width('80%')
            .text('邮箱不能为空');
        }

        //判断是填写密码
        if($password.val() === ""){
            $passwordHint.width('80%')
            .text('手机验证码不能为空');
        }

        //判断是否填写密码确认
         if($affirm.val() === ""){
            $affirmHint.width('80%')
            .text('请确认密码');
        }
        
        if(userValue === 1 && mailValue === 1 && passwordValue === 1 && affirmValue === 1){
            $registerSecond.css('display','none');
            $registerThird.css('display','block');
            $btList.removeClass().eq(2).addClass('conspicuous');
            ajax({
                url:"../api/reg.php",
                data:{
                    phone:$phone.val(),
                    username:$user.val(),
                    mail:$mail.val(),
                    password:$password.val(),
                    type:'reg'
                },
                success:function(data){
                    if(data === 'success'){
                        $registerThird.find('span').text($user.val());
                        setTimeout(go,2000);
                    }else{
                        $registerThird.find('status').text('网络异常，请稍后再试试');
                        $registerThird.find('jump').text('');
                    }
                }
            })
        }
        function go(){
            location.href='login.html'
        }
    })


    //第三步
    let $registerThird = $('.register-third');


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

    //手机验证码
    let $getCode = $('.getCode');
    var str = '0123456789';
    var res ;
    $getCode.on('click',function(){
        res = '';
        for(var i=0;i<6;i++){
            res += str[parseInt(Math.random()*str.length)]
        }
        alert('您的随机手机验证码为'+res);
    })

});