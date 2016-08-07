carousel组件
======
###carousel组件简介：支持IE7以上及firefox，chrome浏览器
###carousel功能介绍：
>
1丶图片轮播
>       
2丶圆点菜单快速切换图片
###插件使用操作如下：
--------
####一丶首先将creatByjs.js或者creatByjQ.js(任选其一)添加至html页面中
JS：
~~~
<script src="js/creatByjs.js"></script> //javascript
~~~
>
JQ： 
~~~
<script src="js/creatByjQ.js"></script> //javascript
~~~
>
如果使用creatByjQ.js请记得添加jQuery库文件
####二丶然后在html页面中添加如下模块
~~~
<div id="carousel"  >
    <div id="photo">
        <img src="img/u=4044760137,311478207&amp;fm=21&amp;gp=0.jpg"  >
        <img src="img/u=2850280430,1334810191&amp;fm=21&amp;gp=0.jpg"  > 
        <img src="img/u=3510970221,2753307148&amp;fm=21&amp;gp=0.jpg" >
        <img src="img/u=3519742742,130478020&amp;fm=21&amp;gp=0.jpg" >
        <img src="img/u=3720731954,4235281607&amp;fm=21&amp;gp=0.jpg" >
        <img src="img/u=3724082920,1705522025&amp;fm=21&amp;gp=0.jpg" >
        <img src="img/u=4044760137,311478207&amp;fm=21&amp;gp=0.jpg" >
        <img src="img/u=2850280430,1334810191&amp;fm=21&amp;gp=0.jpg" > 
    </div>
    <div id="button">
        <span class="on" index='1'></span>
        <span index='2'></span>
        <span index='3'></span>
        <span index='4'></span>
        <span index='5'></span>
        <span index='6'></span>
    </div>
    <a href="#" id="left">&lt;</a>
    <a href="#" id="right">&gt;</a>
</div>
~~~
#####1丶上述代码中\<div id='carousel'>可任意设置,此为容纳轮播图框架的父标签
#####2丶\<div id='carousel'>标签的子标签请按上图所示设置
#####3丶img标签轮播图片摆放参照上图123456，6张图片摆放方式61234561，7张图片摆放为712345671。
#####4丶若图片张数发生变化，请在框架内相应增减<img>和<span>两个标签数量。
#####5丶整个框架样式写在CSS中，若有需求可自行修改。
####三丶最后在html页面设置相关参数
~~~
<script>
	window.onload=function()
	{
	var plus=new Plug({
			width:'400'   , 
			fast:'100'  ,
			name:'carousel',
			time:'3',
			picture:'6'
		})
	}
</script>
~~~
#####1丶上图width:图片宽度；fast：图片切换速度；name：轮播图框架父级标签；time：轮播切换时间间隔；picture：图片张数
####四丶参数设置见index.js
![](https://github.com/lidingkorol/calendar-/raw/master/photo/QQ图片20160802192652.png)

#以上是readme所有内容
