jQuery(function($){
    let $show = $('.show');
    let $page = $('.page');
    let $pageList = $('.page-list');

    let $qty = 12;

    let fn = function(data){
        //生成商品列表信息
        let $res = $.map(data.data,function(idx){
            $li = $('<li/>').attr('data-id',idx.id);
            $li.append(`<img/ src=${idx.img}>
                   <div>
                        <a href="#">${idx.name}</a>
                        <p>
                            <span class="retail">￥${idx.retail}</span>
                            <span class="price">￥${idx.price}</span>
                        </p>
                        <p>库存999</p>
                    </div>
            `);
            return $li;
        });

        //把商品信息插入页面
        $show.empty().append($res);

        //设置分页按钮
        let $pageNum = Math.ceil(data.total/$qty);
        $pageList.empty();
        for(let i=1;i<=$pageNum;i++){
            $li = $('<li/>').text(i);
            if(i === data.page){
                $li.addClass('grey');
            }
            $li.appendTo($pageList);
        }

        // 绑定事件
        let $present = $('.grey').text();
        console.log($present);
        $page.on('click','li',function(){
            $this = $(this);
            if($this.text() === '首页'){
                ajax({
                    url:"../api/list.php",
                    data:{qty:$qty,page:1},
                    success:fn
                });
            }else if($this.text() === '末页'){
                ajax({
                    url:"../api/list.php",
                    data:{qty:$qty,page:$pageNum},
                    success:fn
                });
            }else if($this.text() === '上一页'){
                if($present == 1){
                    return;
                }
                ajax({
                    url:"../api/list.php",
                    data:{qty:$qty,page:$present-1},
                    success:fn
                });
            }else if($this.text() === '下一页'){
                if($present == $pageNum){
                    return;
                }
                ajax({
                    url:"../api/list.php",
                    data:{qty:$qty,page:$present*1+1},
                    success:fn
                });
            }else if($this.children().first().attr('class') === 'page-list'){
                $(this).on('click','.page-list li',function(){
                    $this = $(this);
                    if($this.attr('class') == 'grey'){
                        return;
                    }
                    let $page = $this.text();
                    console.log($page);
                    ajax({
                        url:"../api/list.php",
                        data:{qty:$qty,page:$page},
                        success:fn
                    });
                }); 
            }
        })
        /*
        */ 
    }

    ajax({
        url:"../api/list.php",
        data:{qty:$qty},
        success:fn
    });


    
    // 
    
    // let xhr = new XMLHttpRequest();

    // let status = [200,304];
    // xhr.onload = function(){
    //     if(status.indexOf(xhr.status)>=0){
    //         let $data = JSON.parse(xhr.responseText);
    //         // let $ul = $('<ul/>');
    //         let $res = $.map($data,function(idx){
    //             $li = $('<li/>').attr('data-id',idx.id);
    //             $li.append(`<img/ src=${idx.img}>
    //                    <div>
    //                         <a href="#">${idx.name}</a>
    //                         <p>
    //                             <span class="retail">￥${idx.retail}</span>
    //                             <span class="price">￥${idx.price}</span>
    //                         </p>
    //                         <p>库存999</p>
    //                     </div>
    //             `);
    //             return $li;
    //         })
    //         $show.append($res);

    //     }
    // }

    // xhr.open('get','../api/list.php',true);

    // xhr.send();

});