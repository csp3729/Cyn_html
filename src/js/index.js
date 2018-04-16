jQuery(function($){
    let $post=$('.post');
    let $postU=$post.children('ul');
    let $postLi = $postU.children();
    let $area = $post.children().children('.area');
    $postU.on('click','a',function(){
        $postLi.css('background','none');
        $postLi.children().css('color','#555');
        $(this).css('color','#fff');
        $(this.parentElement).css('background','#FFA500');
        $area.text(this.innerText);
    });

    $('.box').xCarousel({
        // width:1400,
        height:400,
        type:'fade',
        imgs:['images/banner-1.jpg','images/banner-2.jpg','images/banner-3.jpg','images/banner-4.jpg',]
    })

    sqlLogin();
})