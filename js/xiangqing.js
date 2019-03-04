var xq = new Vue({
	el:'#xq',
	data:{
       teacher:{},
	},
	mounted:function(){
        this.getData();
	},
	methods:{
		getData:function(){
			var that = this;
		    var a = window.location.search.split("=")[1];
		    console.log(a);
           $.ajax({
           	   url:'http://api.zhituteam.com/api/teacher/info/',
           	   type:'get',
           	   data:{
                  id: a,
           	   },
           	   dataType:'json',
           	   success:function(res){
                   that.teacher = res.data.teacher;
                   that.teacher.id = a;
                   // console.log(this.teacher);
                   // that.id = res.data.teacher.id;
           	   },
           	   error:function(res){
           	   	alert(1111);
           	   }
           }),
           console.log(this.teacher);
		}
	}
})