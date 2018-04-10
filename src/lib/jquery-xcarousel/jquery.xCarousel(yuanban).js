;(function($){
    $.fn.xCarousel=function(options){
        let defaults={
            width:parseInt(this.css('width')),
            height:300,
            index:0,
            duration:3000,
            autoPlay:true,
            type:'vertical',//horizontal,fade
            seamless:false,
            page:true
        }
        return this.each(function(){
            let $self = $(this);

            let opt = $.extend(true,{},defaults,options);//jQuery扩展对象，true深复制

            opt.len = opt.imgs.length;

            let $ul;

            let lastIndex = opt.index;

            let init = ()=>{
                $self.addClass('xcarousel');
                $self.width(opt.width);
                $self.height(opt.height);

                $ul = $('<ul/>');

                let $res = $.map(opt.imgs,function(url){
                    let $li = $('<li/>');
                    let $img = $('<img/>');
                    $img.attr('src',url).appendTo($li);
                    return $li;
                });

                $ul.append($res);

                $ul.appendTo($self);

                //水平轮播图
                if(opt.type === 'horizontal'){
                    $ul.width(opt.width*opt.len);
                    $ul.addClass('horizontal');
                    console.log(opt.width);
                }

                //淡入淡出
                if(opt.type === 'fade'){
                    $ul.addClass('fade');
                    $ul.css({
                        width:opt.width,
                        height:opt.height
                    });

                    $ul.children('li').eq(opt.index).siblings('li').css('opacity',0);
                }

                move();
            }

            //运动
            let move =()=>{
                $self.timer = setInterval(()=>{
                    opt.index++;
                    show();
                },opt.duration);
            }

            //效果
            let show =()=>{
                if(opt.index >= opt.len){
                    opt.index = 0;
                }else if(opt.index < 0){
                    opt.index = opt.len-1;
                }
                let obj = {};
                if(opt.type === 'vertical'){
                    obj.top = -opt.height*opt.index;
                    $ul.animate(obj);
                }else if(opt.type === 'horizontal'){
                    obj.left = -opt.width*opt.index;
                    $ul.animate(obj);
                }else if(opt.type === 'fade'){
                    $ul.children('li').eq(opt.index).animate({opacity:1},function(){
                        lastIndex = opt.index;
                    });
                    $ul.children('li').eq(lastIndex).animate({opacity:0});
                }   
            }

            init();
        })
    }
})(jQuery);