/*网页轮播组件
*本插件是一个网页轮播组件，用于轮播图动画效果显示，使用方法见readme.txt
*传入参数介绍
* width:	轮播图框宽度(具体数字即可，不需在后加入px)
* fast:		轮播图切换时速度
* name:		轮播图纳入的DIV框架id（自行设定）
* time:		轮播图时隔多久切换一次（单位：s）
* picture	图片张数
*/
//定义工具函数
var Class = {
    create: function () {
        return function () {
            this.init.apply(this,arguments); //这个语句的作用是，每次插件初始化的时候，都会运行一次插件原型链上面的init方法
        }
    }
}
//后面一个属性对象方法传给前一个
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
		this.fast=this.options.fast;
		this.name=this.options.name;
		this.time=this.options.time;
		this.picture=this.options.picture;
		this.set();
	    this.autoPlay();
	    this.stopPlay();
	    this.oRightClick();
	   	this.oLeftClick();
		this.cLickButton();
	},
	//初始化   
	setOption:function(options){
		this.options={
			width:null,
			time:null,
			name:null,
			fast:null
		};
		Extend(this.options, options || {}); //空对象指防止options不存在时候函数报错
	},
	//设置属性
	set:function(){
		this.ocarousel = document.getElementById(this.name);
		this.ophoto = document.getElementById("photo");
		this.obutton = document.getElementById("button").getElementsByTagName("span");
		this.oleft = document.getElementById("left");
		this.oright = document.getElementById("right");
		this.img = this.ophoto.getElementsByTagName("img");
		this.animated=false;
		this.index=1;
		this.timer1=null;
		this.picture=parseInt(this.picture);
		this.allPicture=this.picture+2;
		this.ocarousel.style.width = this.width+'px';
		this.ophoto.style.left = -this.width + 'px';
		this.ophoto.style.width = this.width*this.allPicture +'px';
		
		for(var i=0;i<this.allPicture;i++)
		{
		    this.img[i].style.width = this.width +'px';
		}
	},
	//按钮显示
	showButton:function(){
		for(var j=0;j<this.obutton.length;j++)
		{
		    if(this.obutton[j].className=="on")
		    {
		    	this.obutton[j].className="";
		        	   	
		    }
		    this.obutton[this.index-1].className="on";      
		}
		   
	},
	//按钮切换
	cLickButton:function(){
		for(var i=0;i<this.obutton.length;i++)
        {
           	var that=this;
	        this.obutton[i].onclick=function(){   
	        	if(that.animated)
				{return;}
				var offset_index=parseInt(this.getAttribute('index'));	
				var itarget=-that.width*(offset_index-that.index);
				that.animate(itarget);	
				that.index=offset_index;
				that.showButton();	
	        }
	    }	
	},
	//自动轮播
	autoPlay:function(){   
		var self=this;
		this.ocarousel.onmouseout=function()
		{  	
		    self.timer1=setInterval(function(){
			   	if(self.animated)
				{return;}
				self.animate(-self.width);
				if(self.index==self.picture)
				{
					self.index=1;	
				}
				else
				{
					++self.index;	
			    }
				self.showButton();
			},self.time*1000);
		}
	},
	//停止轮播
	stopPlay:function()
	{   
		var self=this;
		this.ocarousel.onmouseover=function(){
			clearInterval(self.timer1);
		}
	},
	//轮播动画
	animate:function(itarget)
	{  
		var newLeft = parseInt(this.ophoto.style.left) + parseInt(itarget);
	    var interval = 10;
	    var speed = itarget/(this.fast/interval);
		this.animated =true;
		var those=this;
		var timer2 =setInterval(function(){  
			if(speed>0&&newLeft>parseInt(those.ophoto.style.left)||speed<0&&newLeft<parseInt(those.ophoto.style.left))
			{     
				those.ophoto.style.left = Math.ceil(parseInt(those.ophoto.style.left) + speed) + 'px';
			}
			else
			{     
				clearInterval(timer2); 
				if(newLeft>-those.width)
			    {  
			    	those.ophoto.style.left = -those.picture*those.width+ 'px';	
			    }
			    if(newLeft<-those.picture*those.width)
			    {  
			        those.ophoto.style.left= -those.width + 'px';
			    }
				those.animated = false;
			}
		
		},30);			 
	},
	//切换下一张
    oRightClick:function(){  
	    var that= this;
	    this.oright.onclick=function(){
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
		}
    },
    //切换上一张
	oLeftClick:function(){   
	 	var that=this;
	 	this.oleft.onclick=function(){
		    if(that.animated)
			{return;}
		    that.animate(that.width);
			if(that.index==1)
			{
				that.index=that.picture;	
			}
			else
		    {
		      	--that.index;		   
		    }
			that.showButton();
		}
	}
}
