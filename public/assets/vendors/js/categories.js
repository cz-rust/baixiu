function serializeObj(doc){
    var arr=doc.serializeArray()
   var params={}
   arr.forEach(item => {
       params[item.name]=item.value
   });
   return params
    
}
$('#categoriesForm').on('submit',function(){
    var obj=serializeObj($(this))
  if(obj._id){
    $.ajax({
        url:'/categories/'+obj._id,
        type:'put',
        data:obj,
        success:function(data){
         location.reload()
        }
    })
  }else{
    $.ajax({
        url:'/categories',
        type:'post',
        data:obj,
        success:function(data){
         location.reload()
        }
    })
  }
    return false
   
});
$.ajax({
    url:'/categories',
    type:'get',
    success:function(ele){
        var html=template('cateTpl',{res:ele})
        $('#caBox').html(html)
    }
});
$('#caBox').on('click','.edit',function(){
    var id=$(this).attr('data-id')
   
     $.ajax({
        url:'/categories/'+id,
        type:'get',
        success:function(data){
         var html=template('modifyTpl',data);
         $('#categoriesForm').html(html)
        }
    }) 
});
//修改
