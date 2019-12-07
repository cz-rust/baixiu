$.ajax({
    url:'/comments',
    type:'get',
    success:function(data){
        console.log(data)
       var html=template('commentsTpl',data)
       $('#commentsBOX').html(html)

        var page=template('pageTpl',data)
        $('#comPage').html(page)
    }
});
function changePage(name){
    $.ajax({
        url:'/comments',
        type:'get',
        data:{page:name},
        success:function(data){
            console.log(data)
           var html=template('commentsTpl',data)
           $('#commentsBOX').html(html)
    
            var page=template('pageTpl',data)
            $('#comPage').html(page)
        }
    });
}
$('#commentsBOX').on('click', '#commentBtn',function(){
  var sta= $(this).attr('data-statu')
  var id=$(this).attr('data-id')
   $.ajax({
       url:"/comments/"+id,
       type:'put',
       data:{state:sta==1?0:1},
       success:function(data){
        console.log(data)
        location.reload()
       }
   })
});
//删除
$('#commentsBOX').on('click', '#clearComments',function(){
    var id=$(this).attr('data-id')
    $.ajax({
        url:'/comments/'+id,
        type:'delete',
        success:function(){
            location.reload()
        }
    })
})