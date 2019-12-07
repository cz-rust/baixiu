
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
console.log(getId('id')) 
