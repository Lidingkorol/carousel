/*网页轮播组件
*本插件是一个网页轮播组件，用于轮播图动画效果显示，使用方法见readme.txt
*传入参数介绍
* width:	轮播图框宽度(具体数字即可，不需在后加入px)
* fast:		轮播图切换时速度
* name:		轮播图纳入的DIV框架id（自行设定）
* time:		轮播图时隔多久切换一次（单位：s）
* picture：	图片张数

*/

//定义工具函数
var Class = {
    create: function () {
        return function () {
            this.init.apply(this,arguments); //这个语句的作用是，每次插件初始化的时候，都会运行一次插件原型链上面的init方法
        }
    }
}

var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
}

var Plug=Class.create();
Plug.prototype={
	init:function(options){
		this.setOption(options);
		this.width=this.options.width;
		this.time=this.options.time;
		this.name=this.options.name;
		this.fast=this.options.fast;
		this.picture=this.options.picture;
		this.set();
		this.oRightClick();
		this.oLeftClick();
		this.clickButton();
		this.autoPlay();
		this.stopPlay();
	},
	//初始化   
	setOption:function(options){
		this.options={
			width:null,
			time:null,
			name:null,
			fast:null,
			picture:null
		};
		Extend(this.options, options || {}); //空对象指防止options不存在时候函数报错
	},
	//设置属性
	set:function(){
		this.carousel = $('#'+this.name);
	 	this.photo = $("#photo");
	 	this.button = $("#button span");
		this.left = $("#left");
		this.right = $("#right");
		this.picture=parseInt(this.picture);
		this.allPicture=this.picture+2;
		this.index = 1;
	 	this.timer=null;
	 	for(var i= 0;i<this.allPicture;i++)
		{
			document.getElementById("photo").getElementsByTagName("img")[i].style.width = this.width+'px';
	    }
		document.getElementById(this.name).style.width = this.width+'px';
		document.getElementById("photo").style.left = -this.width+'px';
		document.getElementById("photo").style.width = this.width*(this.picture+2) + 'px';
	},
	//鼠标在图片区域时停止自动播放
	stopPlay:function()
	{   
		var that=this;
		this.carousel.mouseover(function(){
			clearInterval(that.timer);
		});
	},
	//鼠标不在图片区域时自动轮播
	autoPlay:function(){
		var that=this;
		this.carousel.bind('mouseout',function(){
			that.timer = setInterval(function(){
			   	if(that.animated)
				{return;}
				that.animate(-that.width);
				if(that.index==that.picture)
				{
					that.index=1;	
				}
				else
				{
					++that.index;	
			    }
				that.showButton();
			},that.time*1000);
		});
	},
	//图片切换
	animate:function(itarget){
		var that=this;
		var newLeft = parseInt(this.photo.css("left"))+parseInt(itarget);
		if(itarget>0)
		{
			itarget = '+=' + itarget;	 
		}
		else
		{
		    itarget= '-=' +  Math.abs(itarget);	 
		}
		this.photo.animate({'left':itarget},this.fast,function(){
			if(newLeft>-(parseInt(that.width)/2))
			{	
			    that.photo.css('left',-that.picture*that.width);	 
			}
			if(newLeft<-that.picture*that.width)
			{
			    that.photo.css('left',-that.width);	 
			}
		});
	},
	//手动切换下一张
	oRightClick:function(){
		var that=this;
		this.right.bind("click",function(){
			if(that.photo.is(':animated'))
			{
		   		return;	 
			}
		 	that.animate(-that.width);
		 	if(that.index==that.picture)
		 	{
		    	that.index=1;	 
		 	}
		 	else
		 	{	 
				++that.index;
		 	}
		 	that.showButton();
		});
	},
	//手动切换上一张
	oLeftClick:function(){
		var that=this;
		this.left.bind("click",function(){
			if(that.photo.is(':animated'))
			{
				return;	 
			}
			that.animate(that.width);
			if(that.index==1)
			{
				that.index=that.picture;	 
			}
			else
			{	 
				--that.index ;
			}
			that.showButton();
		});
	},
	//圆点切换
    clickButton:function(){
    	var that=this;
    	this.button.each(function(){
			$(this).bind('click',function(){
			 	if(that.photo.is(':animated')||$(this).attr('class')=="on")
				{
			     	return;	  
			 	}
			 	var myindex = parseInt($(this).attr("index"));
			 	itarget =(myindex - that.index)*-that.width;
			 	that.index = myindex;
			 	that.animate(itarget);
			 	that.showButton();
			})
		 })
    },
    //显示对应圆点
	showButton:function(){
	 	this.button.eq(this.index-1).addClass("on").siblings().removeClass("on");
	}
}
