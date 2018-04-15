jQuery(function($){
    //获取页面元素
    let $car = $('.car');
    let $allGoods = $('.all-goods');
    let $carGoods = $('.car-goods');
    let $selected = $('.selected');
    let $total = $('.total');

    //购物车信息函数
    let goodslist;
    function render(){
        //获取cookie，转换成数组
        goodslist = Cookie.get('goodslist') || [];
        if(typeof goodslist === 'string'){
            goodslist = JSON.parse(goodslist);
        }
        // if(goodslist.length === 0){
        //     goodslist = [];
        // }else{
        //     goodslist = JSON.parse(goodslist);
        // }
        
        //遍历cookie数组生成页面解构
        let $res = $.map(goodslist,function(item){
            //创建单个商品ul
            let $ul = $('<ul/>').attr('data-id',item.id);
            //把商品信息写入到ul
            $ul.append(`<li>
                            <input type="checkbox" class="choice"/>
                        </li>
                        <li>
                            <img src=${item.img} />
                        </li>
                        <li><h4>${item.name}</h4></li>
                        <li>
                            <p>商品描述：无</p>
                        </li>
                        <li class="goods-price">
                            <span class="price">¥${item.price}</span>
                            <span class="retail">¥${item.retail}</span>
                        </li>
                        <li class="goods-qty">
                            <span class="minus">-</span>
                            <span class="plus">+</span>
                            <em><input type="text" value=${item.qty} class="qty"/></em>
                        </li>
                        <li class="subtotal">¥${(item.retail*item.qty).toFixed(2)}</li>
                        <li class="operation">
                            <span class="enshrine"><a>移入收藏夹</a></span>
                            <span class="del"><a>删除</a></span>
                        </li>`);
            return $ul;
        });

        //清空购物车内容，添加新内容
        $carGoods.empty().append($res);
    }

    //运行购物车函数生成结构
    render();

    //判断购物车是否有商品
    if($carGoods.children().length > 0){
        //把商品数量写入页面头部
        function gQty(){
            $allGoods.text($carGoods.children().length);
        }
        gQty();

        //减少商品数量
        $carGoods.on('click','.minus',function(){
            let $qty = $(this).parent().find('.qty');
            if($qty.val() <= 1){
                $qty.val('1');
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

        //声明变量用于储存已选商品信息
        let $choiceGoods;

        //声明变量储存页面所有复选框
        let $inputLi;
        //声明变量储存页面商品复选框
        let $choiceLi;
        //每次删除商品后都需要重新获取复选框信息
        //把获取复选框写入函数，方便重新获取
        function check(){
            $inputLi = $(':checkbox');
            $choiceLi = $inputLi.filter('.choice');
        }
        check();
        // let $inputLi = $(':checkbox');
        // let $choiceLi = $inputLi.filter('.choice');

        //全选商品
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
            $choiceGoods = $("input:checkbox[class='choice']:checked");
            let qty = $choiceGoods.length;
            $selected.children('span').text(qty);

            let tatol = 0;
            $.map($choiceGoods,function(item){
                tatol += $(item).closest('ul').find('.subtotal').text().slice(1)*1;
            });
            $total.children('span').text(tatol.toFixed(2));
        })

        //删除单个商品
        .on('click','.del a',function(){
            var id = $(this).closest('ul').attr('data-id');
            for(var i=0;i<goodslist.length;i++){
                if(goodslist[i].id === id){
                    //删除cookie中对应的商品
                    goodslist.splice(i,1);
                    //删除页面购物车对应的商品
                    $(this).closest('ul').remove();
                    //删除商品后退出循环
                    break;
                }
            }
            //把新的商品列表写入到cookie
            Cookie.set('goodslist',JSON.stringify(goodslist));
            check();//删除单个商品后重新获取复选框
            gQty();//商品数量写入页面头部
        })

        //删除多个商品
        .on('click','.goods-account .del',function(){
            //获取页面已经选商品（复选框选中状态）
            $choiceGoods = $("input:checkbox[class='choice']:checked");
            //遍历已选商品把商品id存放在arr数组中
            var arr = $choiceGoods.map(function(){
                let dataId = $(this).closest('ul').attr('data-id');
                return dataId;
            })

            var id;//用来存放每个商品的id
            for(var i=0;i<arr.length;i++){
                id = arr[i];
                for(var i=0;i<goodslist.length;i++){
                    if(goodslist[i].id === id){
                        //删除cookie中对应的商品
                        goodslist.splice(i,1);
                        // //删除页面购物车对应的商品
                        // $(this).closest('ul').remove();
                        //删除商品后退出循环
                        break;
                    }
                }
                //把新的商品列表写入到cookie
                Cookie.set('goodslist',JSON.stringify(goodslist));
                render();//删除多个商品后重新加载页面结构
            }
            check();//删除多个商品后重新获取复选框
            gQty();//商品数量写入页面头部
        })
    }

});