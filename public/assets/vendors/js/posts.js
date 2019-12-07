$.ajax({
    url:'/posts',
    type:'get',
    success:function(doc){
        var html=template('postsTpl',{data:doc})
        $('.postBox').html(html)
        console.log(doc)
    }
})