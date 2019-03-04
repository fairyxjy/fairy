function getQuery(){
        var str = (location.search.length > 0 ? location.search.substring(1) : ''),
        args = {},
        items = str.length ? str.split("&") : [],
        item = null,
        name = null,
        value = null;
        for (i=0; i < items.length; i++){
          item = items[i].split("=");
          name = decodeURIComponent(item[0]);
          value = decodeURIComponent(item[1]);
          if (name.length) {
            args[name] = value;
          }
        }
        return args;
};
var all = new Vue({
	el:'#app',
	data:{
		list:[],
		condition:null,
		grade: '年级',
    isGrade:false,
    subject: getQuery().sname? getQuery().sname : '科目',
    isSubject:false,
    teacherType: '教师类型',
    isType:false,
    isAll:false,
    nowGrade:null,
    nowSubject:null,
    nowType:null,
	},
	mounted:function(){
    // this.subject = this.getQuery().sname;
    this.subjectcon = getQuery().id;
    var da = {
      subject:this.subjectcon,
      offset:0,
      limit:20,
    };
    this.getData(da);
	},
	methods: {
  	getData:function(da){
			var that = this;
            $.ajax({
            	url:'http://api.zhituteam.com/api/teacher/lists',
            	type:'get',
            	dataType:'json',
            	data:da,
            	success:function(res){
              that.list = res.data.teacher;
              if(that.condition == null){
                    res.data.condition.grade.forEach(function(item){
                        item.isSelected = false;
                    })
                    res.data.condition.subject.forEach(function(item){
                        item.isSelected = false;
                    })
                    res.data.condition.type.forEach(function(item){
                        item.isSelected = false;
                    })
                    that.condition = res.data.condition;
                    this.isSubject = true;
                    that.condition.subject.forEach(function(k){
                      if(k.id == that.subjectcon){
                          k.label = that.subject;
                          that.isAll = false;
                          k.isSelected = true;
                          that.isSubject = true;
                      }
                    })
                  }  
            	},
            	error:function(res){
            		alert(111);
            	}
              
            })
		},
    clickGrade:function(){
      this.isAll = true;
      this.isGrade = true;
      this.isSubject = false;
      this.isType = false;
    },
    clickSubject:function(){
      this.isAll = true;
      this.isSubject = true;
      this.isGrade = false;
      this.isType = false;
    },
    clickType:function(){
      this.isAll = true;
      this.isType = true;
      this.isGrade = false;
      this.isSubject = false;
    },
    clickItem:function(item){
      this.condition.subject.forEach(function(it){
        it.isSelected = false;
      });
       this.condition.grade.forEach(function(it){
        it.isSelected = false;
      });
       this.condition.type.forEach(function(it){
        it.isSelected = false;
      });
      item.isSelected = true;
      this.isAll = false; 
      if(this.isGrade){
         this.grade = item.label;
         this.nowGrade = item.id;
      };
      if(this.isSubject){
         this.subject = item.label;
         this.nowSubject = item.id;
      };
      if(this.isType){
         this.type = item.label;
         this.nowType = item.id;
      };
      var da = {
        grade:this.nowGrade,
        subject:this.nowSubject,
        type:this.nowType,
        offset:0,
        limit:20,       
      }  
      this.getData(da);
    }
	}
})