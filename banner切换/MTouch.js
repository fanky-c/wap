     function MTouch(obj,config){
         this.obj=$(obj);
         this.config=$.extend({
         },config||{
           startFn:function(){},
           moveFn:function(){},
           endFn:function(){}
         });
         ali=this.obj.children('li');
         length=ali.size();
         winW=$(window).width();
         this.x=0;
         this.y=0;

         this.init();             
     };

     MTouch.prototype={
        pos:{
          'top':0,
          'left':0
        },

        init:function(){    //初始化
            document.addEventListener('touch',function(event){
                event.preventDefault();
            },false)            
            ali.eq(0).css({'transform':'translate3d(0,0,0)','-webkit-transform':'translate3d(0,0,0)'});
            this.touchEnd();
        },

        touchStart:function(){  //开始触摸
            var that=this;
             this.obj[0].addEventListener('touchstart',function(event){
                   that.pos.left=this.x=event.targetTouches[0].pageX;
                   that.pos.top=this.y=event.targetTouches[0].pageY;
                   that.config.startFn&&that.config.startFn.apply(this);
             },false)
        },
        touchMove:function(){  //滑动进行中
           var that=this;
                
                that.touchStart()
                
                this.obj[0].addEventListener('touchmove',function(event){
                      this.x=event.targetTouches[0].pageX-that.pos.left;
                      this.y=event.targetTouches[0].pageY-that.pos.top;
                      that.config.moveFn&&that.config.moveFn.apply(this);
                },false);        
        },
        touchEnd:function(){     //滑动结束
           var that=this;
                
                that.touchMove();
                this.obj[0].addEventListener('touchmove',function(event){
                      this.x=event.targetTouches[0].pageX-that.pos.left;
                      this.y=event.targetTouches[0].pageY-that.pos.top;                
                      that.config.endFn&&that.config.endFn.apply(this);
                },false);             
        }

     };




     new MTouch('.scrollUl',{
         startFn:function(){document.title='startFn'},
         moveFn:function(){document.title='moveFn'},
         endFn:function(){document.title='endFn'}
     });