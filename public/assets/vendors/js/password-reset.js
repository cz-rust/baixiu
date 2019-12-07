 $('.modify').on('submit',function(){
  var obj=$(this).serialize()
  console.log(obj)
  $.ajax({
      url:'/users/password',
      type:'PUT',
      data:obj,
      success:function(data){
        alert('修改密码成功')
        location.href='/admin/login.html'
      },
      error:function(doc){
          console.log(doc)
      }
      
  })
  return false
})
