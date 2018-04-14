jQuery(function($){
    //获取页面元素
    let $car = $('.car');
    let $allGoods = $('.all-goods');
    let $carGoods = $('.car-goods');
    let $selected = $('.selected');
    let $total = $('.total');




    //判断购物车是否有商品
    if($carGoods.children().length > 0){
        $allGoods.text($carGoods.children().length);

        //减少商品数量
        $carGoods.on('click','.minus',function(){
            let $qty = $(this).parent().find('.qty');
            if($qty.val() == 1){
                return;
            }else{
                $qty.val($qty.val()-1);
                let $retail = $(this).closest('ul').find('.retail').text().slice(1);
                let $subtotal = $(this).closest('ul').find('.subtotal');
                $subtotal.text('¥' + ($qty.val() * $retail).toFixed(2));
            }
        })
        //增加商品数量
        .on('click','.plus',function(){
            let $qty = $(this).parent().find('.qty');
            $qty.val($qty.val()*1+1);
            let $retail = $(this).closest('ul').find('.retail').text().slice(1);
            let $subtotal = $(this).closest('ul').find('.subtotal');
            $subtotal.text('¥' + ($qty.val() * $retail).toFixed(2));
        })
        //自定义商品数量
        .on('change','.qty',function(){
            let $res = Number($(this).val());
            //设置数量框不能输入负数及非数字内容
            if(isNaN($res)){
                $(this).val('1');
            }else if($res <= 0){
                $(this).val('1');
            }
            let $retail = $(this).closest('ul').find('.retail').text().slice(1);
            let $subtotal = $(this).closest('ul').find('.subtotal');
            $subtotal.text('¥' + ($(this).val() * $retail).toFixed(2));
        })

        //全选商品
        let $inputLi = $(':checkbox');
        let $choiceLi = $inputLi.filter('.choice');
        $car.on('click','.all',function(){
            if($(this).prop('checked')){
                $inputLi.prop('checked',true);
            }else{
                $inputLi.prop('checked',false);
            }
        })

        //单选商品
        .on('click','.choice',function(){
            $.each($choiceLi,function(idx,item){
                if($(item).prop('checked')){
                    $('.all').prop('checked',true);
                }else{
                    $('.all').prop('checked',false);
                    return false;
                }
            })
        })
        //显示已选商品数量和商品总价
        .on('click',$inputLi,function(){
            let $choiceGoods = $("input:checkbox[class='choice']:checked");
            let qty = $choiceGoods.length;
            $selected.children('span').text(qty);

            let tatol = 0;
            $.map($choiceGoods,function(item){
                tatol += $(item).closest('ul').find('.subtotal').text().slice(1)*1;
            });
            $total.children('span').text(tatol.toFixed(2));
        })

        
    }

    //直接测试写这里


});