jQuery(function($){
    let $randomCode = $('.randomCode');
    let $codeHint = $('.code-hint');

    $randomCode.on('click',function(){
        $codeHint.width(0)
        RandomCode();
    });

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
});









