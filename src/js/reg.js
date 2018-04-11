jQuery(function($){
    //注册信息填写框
    let $register = $('.register-con');

    // 手机号码元素
    let $phone = $('#phone');
    let $phoneHint = $('.phone-hint');//提示框
    //手机号码验证正则
    let phone = new RegExp(/^1[34578]\d{9}$/);

    // 验证码元素
    let $code = $('#code');
    let $randomCode = $('.randomCode')
    let $codeHint = $('.code-hint');//提示框

    // 手机验证码元素
    let $phoneCode = $('#phoneCode');
    let $phoneCodeHint = $('.phoneCode-hint');//提示框
    //手机验证码验证正则

    let $value = 1;

    $register.on('change','input',function(){
        let $id = $(this).prop('id');
        if($id === 'phone'){
            let $val = $(this).val();
            if(!(phone.test($val))){
                $phoneHint.width('80%')
                .text('请输入11位正确手机号码');
            }else{
                $phoneHint.width('0');
            }
        };
        if($id === 'code'){
            let $val = $(this).val();
            if(!($val === $randomCode.text())){
                $codeHint.width('80%')
                .text('验证码错误');
            }else{
                $codeHint.width('0');
            }
        };
        if($id === 'phoneCode'){
            let $val = $(this).val();
            if(!(/[\d]{6}/).test($val)){
                $phoneCodeHint.width('80%')
                .text('手机验证码为6位数字');
            }else{
                $phoneCodeHint.width('0');
            }
        }
    })
    //协议勾选
    .on('click','.agreement span',function(){
        if($value === 1){
            $value = 0;
            $(this).css({
                'background':'#fff',
                'borderColor':'#000'
            });
        }else{
            console.log(666)
            $value = 1;
            $(this).css({
                'background':'url("../css/img/accept-icon.png")',
                'borderColor':'#fff'
            });
        }

    })
});