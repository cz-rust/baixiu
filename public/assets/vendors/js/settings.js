$('#logo').on('change',function(){
    var formdata=new FormData()
    formdata.append('logo',this.files[0])
    $.ajax({
        url:'/upload',
        type:'post',
        processData:false,
        contentType:false,
        data:formdata,
        success:function(res){
           $('#setImg').val(res[0].logo)
           $('#viewImg').attr('src',res[0].logo)
        }
    })
})
$('#setForm').on('submit',function(){
    var str=$(this).serialize()
   $.ajax({
       url:'/settings',
       type:'post',
       data:str,
       success:function(res){
           console.log(res)
       }
   })
    return false
})