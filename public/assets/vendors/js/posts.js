$.ajax({
    url:'/posts',
    type:'get',
    success:function(doc){
        var html=template('postsTpl',doc)
        $('.postBox').html(html)

        var page=template('pageTpl',doc);
        $('#pageUl').html(page)
        console.log(doc)
    }
});
function changePage(page) {
    $.ajax({
        url:'/posts',
        type:'get',
        data:{page:page},
        success:function(doc){
            var html=template('postsTpl',doc)
            $('.postBox').html(html)
    
            var page=template('pageTpl',doc);
            $('#pageUl').html(page)
            console.log(doc)
        }
    });
}
  function timer(data) {
        var fordata=new Date(data)
       return fordata.getFullYear()+'-'+(fordata.getMonth()+1)+'-'+fordata.getDate()
 } 
$.ajax({
    url:'/categories',
    type:'get',
    success:function(data){
        var html=template('classifyTpl',{res:data})
        $('#classify').html(html)
    }
});
    $('#filterPage').on('submit',function() {
         var formdata=$(this).serialize()
         console.log(formdata)
         $.ajax({
            url:'/posts',
            type:'get',
            data:formdata,
            success:function(doc){
                var html=template('postsTpl',doc)
                $('.postBox').html(html)
        
                var page=template('pageTpl',doc);
                $('#pageUl').html(page)
              
            }
        });
            return false
    })
