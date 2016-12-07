###图片预览
-----
###单图片上传
-----
######开始，基于jQuery，因为jQuery插件
```
<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'>
	<title>图片上传</title>
	<link rel="stylesheet" type="text/css" href="assets/css/uploadImg.css">
	<link rel="stylesheet" type="text/css" href="assets/css/iconfont/iconfont.css">	
	<script type="text/javascript" src='assets/js/jquery-2.2.0.min.js'></script>
</head>
<body>
</body>
	<script type="text/javascript" src='assets/js/uploadImg.js'></script>
</html>
```
#####三种效果展示：
1.图片占满整个容器

2.图片两边留空，水平垂直居中

3.图片背景裁剪
#####html代码
######三种class都可以
```
	<div class='img-preview-wrap' data-width='100px' data-height='100px'>
		
	</div>
```
```
	<div class='img-preview-wrap1'>
	</div>
```
```
	<div class='img-preview-wrap2' data-width='100px' data-height='200px'>
	</div>
```
#####方法调用
```
	$('.img-preview-wrap').uploadPreview({
		
	});
```
######三种方法调用代码
* 默认`full-fill`的展示方法
   
	js调用代码
	
```
	$('.img-preview-wrap').uploadPreview({
	
	});	
```
* `white-space`展示方法
	
	js调用代码
	
```
	$('.img-preview-wrap').uploadPreview({
		presentation:'white-space',
	});	
```
* `back-clip`展示方法
 
	js调用代码
	
```
	$('.img-preview-wrap').uploadPreview({
		presentation:'back-clip',
	});	
```
#####默认设置
`.img-upload-wrap`的`width`默认为100px,`height`默认为100px
调用的`presentation`默认是`full-fill`
#####三种表现形式
参数`presentation`:通过传递参数值来决定你想要图片以哪种形式展示

|名称             |      值
| ------------- |:-------------:
| full-fill(默认值) | 图片将div容器全占满全占满 
| white-space      | 图片或占满容器的宽度或占满容器的高度，但都会在容器里居中   
| back-clip        | 图片展示在div容器的背景图上，图片会随着容器的高度宽度适应裁剪

#####div.img-upload-wrap的宽度和高度自定义设置
默认是width:100px,heigh:100px

可以在页面上设置高度，宽度，设置方法如下：


```
  <div class='img-upload-wrap' data-width='100px' data-height='200px'>    
		
	</div>
```
通过data-width和data-height设置

###多图预览
___
方法跟单图预览一样

只是html代码多了一层

```
	<div class='img-preview-box clearfix'>
		<div class='img-preview-wrap' data-width='100px' data-height='100px'>
		</div>
	</div>
```