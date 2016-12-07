
/**
 *-----------------------------
 *-----------------------------
 为容器设立初始结构
*/
// 图标在容器里面的位置

var iconHtml = "<input type='file'>" +
	"<img>" +
	"<span class='upload-picbg'></span>" +
	"<i class='iconfont icon-upload1'></i>" +
	"<i class='iconfont icon-cha upload-delete'></i>";
function setWrap(dom){
	if (dom.attr('data-width')) {
		var divWidth = dom.attr('data-width');
		var divHeight = dom.attr('data-height');
	} else {
		var divWidth = dom.css('width');
		var divHeight = dom.css('height');
	}
	var inputHeight = dom.find('input[type="file"]').height();
	var inputWidth = dom.children('.icon-upload1').width();
	var lessWidth = parseInt(divWidth) - inputWidth;
	var lessHeight = parseInt(divHeight) - inputHeight;
	dom.width(divWidth);
	dom.height(divHeight);
	dom.children('.icon-upload1').css('top', lessHeight / 2 + 'px');
	dom.children('.icon-upload1').css('left', lessWidth / 2 + 'px');
	dom.find('input[type="file"]').css('top', lessHeight / 2 + 'px');
	dom.find('input[type="file"]').css('left', lessWidth / 2 + 'px');
	dom.find('input[type="file"]').css({
		'position': 'absolute',
		'opacity': 0,
		'z-index': 1000
	});
}
for (var i = 0; i < $('.img-preview-wrap').length; i++) {
	var imgWrap = $('.img-preview-wrap').eq(i);
	imgWrap.append(iconHtml);
	setWrap(imgWrap)
}

for (var i = 0; i < $('.img-preview-wrap1').length; i++) {
	var imgWrap = $('.img-preview-wrap1').eq(i);
	imgWrap.append(iconHtml);
	setWrap(imgWrap)
}
for (var i = 0; i < $('.img-preview-wrap2').length; i++) {
	var imgWrap = $('.img-preview-wrap2').eq(i);
	imgWrap.append(iconHtml);
	setWrap(imgWrap)
}
$('.img-preview-box').find('input').attr('multiple', 'multiple');



jQuery.browser = {};
(function() {
	jQuery.browser.msie = false;
	jQuery.browser.version = 0;
	if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
		jQuery.browser.msie = true;
		jQuery.browser.version = RegExp.$1;
	}
})();
jQuery.fn.extend({
	uploadPreview: function(opts) {
		var _self = this,
			_this = $(this);

		opts = jQuery.extend({
			ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
			/**
			 *---------------------------------------------------
			 *---------------------------------------------------
			 *when presentation is sure set somthing
			 *默认方式是平铺
			*/
			presentation: 'full-fill',
			/**
			 *---------------------------------------------------
			 *---------------------------------------------------
			 *when presentation is sure set somthing
			*/
			preCss:function(dom,type){
				if(type == 'back-clip'){
					dom.css({
						'background-position': 'center center',
						'background-repeat': 'no-repeat',
						'background-size': 'cover'
					})
					dom.mouseenter(function() {
						if ($(this).css('background-image') == 'none') {

						} else {
							$(this).children('.upload-delete').css('display', 'block');
							$(this).children('.upload-picbg').css('display', 'block');
						}

					})
					dom.mouseleave(function() {
						$(this).children('.upload-delete').css('display', 'none');
						$(this).children('.upload-picbg').css('display', 'none');
					})
					dom.children('.upload-delete').click(function() {
						console.log('裁剪');
						if ($(this).parents('.img-preview-box').length > 0) {
							console.log('图片裁剪多图');
							$(this).parent('div').css('display','none');
						}
						$(this).parent('div').css('background-image', 'url()');
						$(this).css('display', 'none');
						$(this).siblings('.upload-picbg').css('display', 'none');
						$(this).parents('div').unbind('mouseenter');
					})
				}else if( type == 'full-fill'){
					dom.mouseenter(function() {
							// 判断图片没有src值
							if ($(this).children('img').attr('src') == undefined) {

							} else {
								$(this).children('.upload-delete').css('display', 'block');
								$(this).children('.upload-picbg').css('display', 'block');
							}
						})
						//upload wrap mouseleave to do something
					dom.mouseleave(function() {
							$(this).children('.upload-delete').css('display', 'none');
							$(this).children('.upload-picbg').css('display', 'none');
						})
						//upload-delete click to do delate things
					dom.children('.upload-delete').click(function() {
						if ($(this).parents('.img-preview-box').length > 0) {
							$(this).parent('div').css('display', 'none');
							console.log('true');
						} else {
							console.log('false');
						}
						$(this).siblings('img').removeAttr('src');
						$(this).css('display', 'none');
						$(this).siblings('.upload-picbg').css('display', 'none');
						$(this).parent('div').unbind('mouseenter');
					})
				}else if( type =='white-space'){
					dom.css({
						'vertical-align': 'middle'
					});
					dom.children('img').css({
						'max-width': '100%',
						'max-height': '100%',
						'margin': '0 auto',
						'position': 'absolute',
						'top': '50%',
						'left': '50%',
						'transform': 'translate(-50%,-50%)'
					});
					dom.children('img').on('load', function() {
						if ($(this).width() < $(this).parent('div').width() && $(this).height() < $(this).parent('div').height()) {
							$(this).width($(this).parent('div').width());
						};
					});
					dom.mouseenter(function() {
						if ($(this).children('img').attr('src') != undefined) {
							$(this).children('.upload-delete').css('display', 'block');
							$(this).children('.upload-picbg').css('display', 'block');
						}
					})
					dom.mouseleave(function() {
						$(this).children('.upload-delete').css('display', 'none');
						$(this).children('.upload-picbg').css('display', 'none');
					})
					dom.children('.upload-delete').click(function() {
						if ($(this).parents('.img-preview-box').length > 0) {
							$(this).parent('div').css('display', 'none');
						}
						$(this).siblings('img').removeAttr('src');
						$(this).siblings('img').width('');
						$(this).css('display', 'none');
						$(this).siblings('.ipload-picbg').css('display', 'none');
						$(this).parent('div').unbind('mouseenter');
					})

				}
				
			},
			/**
			 * --------------------------------------------------
			 * 
			 * --------------------------------------------------
			 * 
			 *   多图创建多个div容器
			 */
			createDiv:function(dom, files, type){
				for (var n = 0; n < files.length; n++) {
					var _self = $(dom).parent('div');
					var divIndex = $(dom).index();
					var iconHtml = "<input type='file'>" +
						"<img>" +
						"<span class='upload-picbg'></span>" +
						"<i class='iconfont icon-upload1'></i>" +
						"<i class='iconfont icon-cha upload-delete'></i>";
					var $imgHtml = $("<div class='" + $(dom).parent('div').attr('class') + "' data-width='" + $(dom).parent('div').width() + "px' data-height='" + $(dom).parent('div').height() + "px' " + ">" +
						iconHtml +
						"</div>");

					if (type == 'back-clip') {
						$imgHtml.css('background-image', 'url('+ _self[divIndex].getElementsByTagName('input').getObjectURL(files[n])+')')
						opts.preCss($imgHtml,type);

					}else{
						$imgHtml.children('img').attr('src', _self[divIndex].getElementsByTagName('input').getObjectURL(files[n]));
						opts.preCss($imgHtml,type);
					}

					$(dom).parents('div.img-preview-box').prepend($imgHtml);
					var imgWrap = $(dom).parents('.img-preview-box').children('div');
					setWrap(imgWrap)
				}
			},
			Callback: function() {
			}
		}, opts || {});
		for (var i = 0; i < _self.length; i++) {
			_self[i].getElementsByTagName('input').getObjectURL = function(file) {
				var url = null;
				if (window.createObjectURL != undefined) {
					url = window.createObjectURL(file)
				} else if (window.URL != undefined) {
					url = window.URL.createObjectURL(file)
				} else if (window.webkitURL != undefined) {
					url = window.webkitURL.createObjectURL(file)
				}
				return url
			};
		}
		_this.children('input[type="file"]').change(function() {
			//this.value return url of img
			if (this.value) {
				//judge img type
				if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
					alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
					this.value = "";
					return false;
				}
				//判断浏览器是不是IE浏览器
				if ($.browser.msie) {
					try {
						var divIndex=$(this).index();
						if (opts.presentation == 'back-clip') {
							$(this).siblings('img').remove();
							if($(this).parents('div.img-preview-box').length>0){
								opts.createDiv(this, this.files, opts.presentation);
							}else{
								$(this).parent('div').css('background-image', 'url('+ _self[divIndex].getElementsByTagName('input').getObjectURL(this.files[0])+')');
								opts.preCss($(this).parent('div'),opts.presentation);
							}
							
						} else {
							if($(this).parents('div.img-preview-box').length>0){
								opts.createDiv(this, this.files, opts.presentation);
							}else{
								$(this).siblings('img').attr('src', _self[divIndex].getElementsByTagName('input').getObjectURL(this.files[0]));
								opts.preCss($(this).parent('div'),opts.presentation);
							}
						}

					} catch (e) {
						var src = "";
						var obj = $("." + opts.Img);
						var div = obj.parent("div")[0];
						_self.select();
						//top就是window
						if (top != self) {
							window.parent.document.body.focus()
						} else {
							_self.blur()
						}
						src = document.selection.createRange().text;
						document.selection.empty();
						obj.hide();
						obj.parent("div").css({
							'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
							'width': opts.Width + 'px',
							'height': opts.Height + 'px'
						});
						div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src
					}
					//不是IE浏览器执行的代码
				} else {
					var divIndex=$(this).index();

					//当展示方式是back-clip时
					if (opts.presentation == 'back-clip') {
						$(this).siblings('img').remove();
						//是不是要预览多张图片时
						if($(this).parents('div.img-preview-box').length>0){
							opts.createDiv(this, this.files, opts.presentation);
						}else{
							//预览单张图片
							$(this).parent('div').css('background-image', 'url('+ _self[divIndex].getElementsByTagName('input').getObjectURL(this.files[0])+')');
							opts.preCss($(this).parent('div'),opts.presentation);
						}
					//当展示方式是full-fill或者white-space时
					} else {
						if($(this).parents('div.img-preview-box').length>0){
							opts.createDiv(this, this.files, opts.presentation);
						}else{
							$(this).siblings('img').attr('src', _self[divIndex].getElementsByTagName('input').getObjectURL(this.files[0]));
							opts.preCss($(this).parent('div'),opts.presentation);
						}
					}
					$(this).wrap('<form>').closest('form').get(0).reset();
					$(this).unwrap('<form>');
				}


				opts.Callback()
			}
		})
	}
});