
    $('#logout').on('click',function(){
      //返回布尔值。为二次提升
      let isComfire=confirm('是否真的的退出')
      if(isComfire){
        $.ajax({
          url:'/logout',
          type:'POST',
          success:function(){
            location.href='/admin/login.html'
          },
          error:function(){
            alert('退出失败')
          }
        })
      }
    })
  
  