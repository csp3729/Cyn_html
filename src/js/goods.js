jQuery(function($){
    //获取页面元素
    let $goodsImg = $('.goodsImg');
    let $goodsName = $('.goods-name');
    let $price = $('.price');
    let $retail = $('.retail');
    let $qty = $('.qty');
    let $goodsQty = $('.goods-qty');

    //获取地址栏中的商品id
    let $id = location.search.slice(4);
    let fn =function(item){
        //商品图片
        let $img = $('<img/>').prop('src',item.img).appendTo($goodsImg);
 
        //商品名字
        $goodsName.text(item.name);

        //商品价格
        $price.text('¥'+item.price);
        $retail.text('¥'+item.retail);

        //调用放大镜插件
        $goodsImg.xZoom({
            width:450,
            height:450
        });
    }

    //向数据库发起商品信息请求
    ajax({
        url:"../api/goods.php",
        data:{id:$id},
        success:fn
    });


    //鼠标移入图片列表事件
    let $imgs = $('.imgs');
    $imgs.on('mouseover','li',function(){
        let $src = $(this).find('img').prop('src');
        $(this).css({
            padding:1,
            borderWidth:2,
            borderColor:'#FFA500'
        });
        $goodsImg.find('img').prop('src',$src);
        $goodsImg.xZoom({
            width:450,
            height:450
        });
    })

    //鼠标移出图片列表事件
    .on('mouseout','li',function(){
        $(this).css({
            padding:2,
            borderWidth:1,
            borderColor:'#ccc'
        })
    })

    //增减商品预购数
    let $present
    $qty.on('click','.plus',function(){
        $present = $goodsQty.val();
        $goodsQty.val($present*1+1);
    })
    .on('click','.minus',function(){
        $present = $goodsQty.val();
        if($present == 1){
            return;
        }else{
            $goodsQty.val($present-1);    
        }
    })
});


