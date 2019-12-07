$('#image').on('change',function(){
    var formdata=new FormData()
    formdata.append('image',this.files[0])
 $.ajax({
     url:'/upload',
     type:'post',
     processData:false,
     contentType:false,
     data:formdata,
     success:function(res){
         console.log(res)
            $('#hiddenImg').val(res[0].image) 
     }
 })
});
$('#slideImg').on('submit',function(){
    var str=$(this).serialize()
    $.ajax({
        url:'/slides',
        type:'post',
        data:str,
        success:function(res){
           location.reload()
        }
    })

    return false
});
$.ajax({
    url:'/slides',
    type:'get',
    success:function(res){
        console.log(res)
        var html=template('slidesTpl',{data:res})
        $('#slideBox').html(html)
    }
})
$('#slideBox').on('click','#deleteSlides',function(){
   var id=$(this).attr('data-id')
   $.ajax({
       url:'/slides/'+id,
       type:'delete',
       success:function(res){
           location.reload()
       }
   })
})