

//分类列表
$.ajax({
    url:'/categories',
    type:'get',
    success:function(res){
        var html=template('postTpl',{data:res})
        $('#category').html(html)
    }
});
//上传文件
$('#feature').on('change',function(){
    var formData=new FormData()
    formData.append('cover',this.files[0]);

    
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
        processData:false,
        contentType:false,
        success:function(data){
           $('#thumbnail').val(data[0].cover)
        }
    })
});
$('.postForm').on('submit',function(){
    var arr=$(this).serializeArray()
    console.log(arr)
     $.ajax({
        url:'/posts',
        type:'post',
        data:arr,
        success:function(data){
            location.href='/admin/posts.html'
        },
        error:function(err){
            console.log(err)
        }
        
    }) 
    return false
});
function getId(name) {
   var arr=location.search.substr(1).split('&');
   var len=-1
   arr.forEach(item=>{
     var temp=item.split('=')
     if(temp[0]===name){
         len=temp[1]
     }
   })
    return len
}

if(getId('id')!=-1){
    $.ajax({
        url:'/posts/'+getId('id'),
        type:'get',
        success:function (data) {
            $.ajax({
                url:'/categories',
                type:'get',
                success:function(res){
                    data.res=res
                    console.log(data)
                    var html=template('modifyTpl',data)
                    $('#parentBox').html(html)
                }
            });
            
        }
    })
};
$('#parentBox').on('submit','#postModify',function(){
    var formdata=$(this).serialize();
    var id=$(this).attr('data-id')
    $.ajax({
        url:'/posts/'+id,
        type:'put',
        data:formdata,
        success:function(){
            location.href='/admin/posts.html'
        }
    })
    return false
})