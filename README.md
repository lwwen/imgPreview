#图片预览
-----
##图片预览说明
实现图片上传前的预览功能，有单图预览跟多图预览，

图片包括三种布局方法：

1.full-fill：图片随着div改变，图片根据div的宽高来拉伸，直到占满div

2.white-space:当图片尺寸比例刚好跟div的宽高比例对等，就会占满div；当图片尺寸不对等时，会子适应本身图片的尺寸比例来适应div，图片不会变形拉伸，会在div里面垂直水平居中

3.back-clip:上传的图片放在div的background-image背景图上，图片会占满整个div,但是会根据尺寸来剪裁图片
	


##下载方式
____
###下载源代码
你可以在右上角👆点击下载
##npm
😯暂时没有
##用法
_____
一、引入css

```
<link hre='path-to-root/imgPreview.css />'
```

本插件也使用到iconfont的图标库，也需要引入iconfont的图片库，压缩包里有打包

```
<link hre="path-to-root/iconfont.css" />'
```
二、引入js

```
	<script type="text/javascript" src='path-to-root/uploadImg.js'></script>
```

##使用方法

###通过data属性
你可以通过data-multi属性来决定不是多图预览还是单图预览

也可以通过data-present：来决定你是选择哪种布局方法，具体的布局方式👆有

###通过js调用
```
	$('.img-preview-wrap').imgPreview({
		width:'100px',
		height:'200px',
		present:'white-space',
		multi:3
	});
```
注意：js的参数会优先调用，就是说，你要是在js设置了present,那么很遗憾，😯，你的data-present就没有用了；当然，data-multi也是这样子的😄,


##图片预览开始😄
-----
###快速开始，基于jQuery，因为jQuery插件

```
<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'>
	<title>图片上传</title>
	<link rel="stylesheet" type="text/css" href="path/uploadImg.css">
	<link rel="stylesheet" type="text/css" href="path/iconfont/iconfont.css">	
	<script type="text/javascript" src='path/jquery-2.2.0.min.js'></script>
		<script type="text/javascript" src='path/uploadImg.js'></script
</head>
<body>
</body>
>
</html>
```
####三种效果展示：
1.图片占满整个容器

2.图片两边留空，水平垂直居中

3.图片背景裁剪
####html代码
```
	<div class='img-preview-wrap'>
		
	</div>
```
注意，在html上可以设置data-present,data-multi参数，很遗憾😄不能设置data-width,data-height属性

####方法调用
```
	$('.img-preview-wrap').uploadPreview({
		//set opts.....
	});
```
#####默认设置
`.img-upload-wrap`的`data-multi`=1,默认是单图

调用的`present`默认是`full-fill`

####参数
参数`present`:通过传递参数值来决定你想要图片以哪种形式展示

参数`width`:图片的父元素容器的宽度

参数`height`:图片的父元素的高度

参数`multi`:图片最多上传的张数

|名称             |类型|   默认值|   描述
| ------------- |:-------------:
| width | string|100px|图片的父元素容器的宽度 
| height | string|100px|图片的父元素容器的高度 
| multi  |number|1    | 图片最多可以预览的张数，当值为1时，是单图预览，值大于1时是多图预览
|present  |string    | 'full-fill' | 图片展示在父元素的布局效果

####data-属性

|名称             |类型|   默认值|   描述
| ------------- |:-------------: 
| data-multi  |number|1    | 图片最多可以预览的张数，当值为1时，是单图预览，值大于1时是多图预览
|data-present  |string    | 'full-fill' | 图片展示在父元素的布局效果

####注意📢：js调用的参数会把data-属性的参数覆盖掉，换个意思说就是js的参数的优先级比html的参数的优先级要高
