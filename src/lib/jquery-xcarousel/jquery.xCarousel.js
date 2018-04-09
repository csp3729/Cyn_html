;(function($){
    $.fn.xCarousel=function(options){
        let defaults={
            width:100%,
            height:300,
            index:0,
            duration:3000,
            autoPlay:true,
            type:'horizontal',//vertical,fade
            seamless:false,
            page:true
        }

        let $self = $(this);

        let opt = $.extend(true,{},defaults,options);//jQuery扩展对象，true深复制

        opt.len = opt.imgs.length;

        let $ul;

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

            $res.appendTo($ul);

            $ul.appendTo($self);
            
        }
    }
})(jQuery);