//创建用户
function serializeObj(doc){
    var arr=doc.serializeArray()
   var params={}
   arr.forEach(item => {
       params[item.name]=item.value
   });
   return params
    
}
 
 $('#userForm').on('submit',function(){
    var obj=serializeObj($(this))
    if(obj._id){
        $.ajax({
            url:'/users/'+obj._id,
            type:'put',
            data:obj,
            success:function(data){
               location.reload()
            },
            error:function(){
                alert('创建失败')
            }
        })
    }else{
        $.ajax({
            url:'/users',
            type:'post',
            data:obj,
            success:function(data){
               location.reload()
            },
            error:function(){
                alert('创建失败')
            }
        })
    }
   
      return false
  });
  //上传图片文件
  $('#userForm').on('change','#avatar',function(){
        var formData=new FormData()
        formData.append('avatar',this.files[0])
        $.ajax({
            url:'/upload',
            type:'post',
            //让ajax不要解析请求参数
            processData:false,
            //告诉ajax不要设置请求参数的类型
            contentType:false,
            data:formData,
            success:function(data){
                console.log(data)
                //实现预览
                $('#preview').attr('src',data[0].avatar)
                //隐藏域，方便传入数据库
                $('#hiddenAvatar').val(data[0].avatar)
            }
        })
  })
  //渲染
  $.ajax({
      type:'get',
      url:'/users',
      success:function(doc){
        var html=template('tpl',{users:doc});
        $('#userBox').html(html)
      }
  });
  //编辑用户 事件委托绑定在父级身上
  $('#userBox').on('click','.edit',function(){
      var id=$(this).attr('data-id')
     $.ajax({
         //restful风格请求地址
         url:'/users/'+id,
         type:'get',
         success:function(data){
             //data本身为对象，可以简写为这
            var html=template('modifytpl',data)
            $('#userForm').html(html)

         }
     })
  });
  //用户删除功能
  $('#userBox').on('click','.del',function(){
     if(confirm('是否删除此用户')){
        var id=$(this).attr('data_id')
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                location.reload()
            }
        })
     }

  })
  //批量删除 全选与反选
  $('#checkAll').on('change',function(){
      var flag=$(this).prop('checked')
      if(flag){
          $('.deleteMany').show()
      }else{
        $('.deleteMany').hide()
      }
      $('#userBox').find('input').prop('checked',flag)  

  });
  $('#userBox').on('change','#a_check',function(){
    var inputs = $('#userBox').find('input');
    if(inputs.filter(':checked').length){
        $('.deleteMany').show()
    }else{
        $('.deleteMany').hide()
    }
      //查找里面包含checked属性的input
  if(inputs.length==inputs.filter(':checked').length){
      $('#checkAll').prop('checked',true)
  }else{
    $('#checkAll').prop('checked',false)
  }
  });
  //为批量删除绑定点击事件
  $('.deleteMany').on('click',function(){
     var arr=$('#userBox').find('input').filter(':checked')
     arr1=[]
     arr.each(function(index,ele){
         arr1.push($(ele).attr('data-id'))
     })
     if(confirm('是否删除选中用户')){
        $.ajax({
            url:'/users/'+arr1.join('-'),
            type:'delete',
            success:function(){
                location.reload()
            }
        })

     }
  })


  
