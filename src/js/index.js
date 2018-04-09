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

    // $postLi.on('mouseover',function(){
    //     $(this).css('background','#eee');
    // })
    
})