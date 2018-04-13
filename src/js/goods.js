jQuery(function($){
    let $goodsImg = $('.goodsImg');
    //调用放大镜插件
    $goodsImg.xZoom({
        width:450,
        height:450
    });

    //鼠标移入图片列表事件
    let $imgs = $('.imgs');
    $imgs.on('mouseover','li',function(){
        let $src = $(this).find('img').prop('src');
        console.log($src);
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
});