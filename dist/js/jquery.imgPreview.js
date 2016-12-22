(function() {
    var wrapInnerHtml = "<div>" +
        "<input type='file'/>" +
        "<i class='iconfont icon-upload1'></i>" +
        "<i class='iconfont icon-cha upload-delete'></i>" +
        "<span class='upload-picbg'></span>" +
        "</div>";
    jQuery.fn.extend({
        imgPreview: function(opts) {
            $(this).each(function(index, ele) {
                opts = jQuery.extend({
                    imgType: ["gif", "jpeg", "jpg", "bmp", "png"],

                    // 布局方式 默认方式是平铺
                    present: 'full-fill',
                    multi: 1,
                    width: '',
                    height: '',
                }, opts || {});

                /**
                 *-----------------------------
                 *-----------------------------
                 * 为容器元素布局
                */
                function setWrap(_dom) {

                    /**
                     *
                     * 对wrap容器的宽高设置分几种情况
                     *  
                     * 根据情况来对应wrap容器的宽高
                     *
                     * 优先顺序是js设置opts.width-->html设置data-width-->css设置 width
                    */
                    var divWidth, divHeight;
                    if (opts.width == '' && opts.height != '') {
                        divHeight = opts.height;
                        divWidth = _dom.css('width')
                    } else if (opts.height == '' && opts.width != '') {
                        divWidth = opts.width;
                        divHeight = _dom.css('height');
                    } else if (opts.height != '' && opts.width != '') {
                        divWidth = opts.width;
                        divHeight = opts.height;
                    } else if (opts.height == '' && opts.width == '') {
                        divWidth = _dom.css('width');
                        divHeight = _dom.css('height');
                    }
                    var inputHeight = _dom.children('input[type="file"]').height();
                    var inputWidth = _dom.children('.icon-upload1').width();
                    var lessWidth = parseInt(divWidth) - inputWidth;
                    var lessHeight = parseInt(divHeight) - inputHeight;
                    _dom.width(divWidth);
                    _dom.height(divHeight);
                    _dom.children('.icon-upload1').css({
                        'top': lessHeight / 2 + 'px',
                        'left': lessWidth / 2 + 'px'
                    });
                    _dom.children('input[type="file"]').css({
                        'top': lessHeight / 2 + 'px',
                        'left': lessWidth / 2 + 'px',
                        'position': 'absolute',
                        'opacity': 0,
                        'z-index': 1000
                    });

                }

                // 为容器wrap添加元素，并调用具体布局方法
                $(ele).append(wrapInnerHtml);
                setWrap($(ele).children('div'))

                // 判断布局方法然后来决定要不要img这个标签，‘back-clip’则不需要img标签
                if (opts.present == 'full-fill' || opts.present == 'white-space') {
                    $(ele).children('div').append('<img/>');
                }

                // 判断是不是多图预览，多图的话就加multiple属性
                if (opts.multi == 1) {
                    if ($(ele).data('multi') > 1) {
                        $(ele).find('input').attr('multiple', 'multiple')
                    }
                } else if (opts.multi > 1) {
                    $(ele).find('input').attr('multiple', 'multiple')
                }

                /**
                 *--------------------------------------------------
                 *--------------------------------------------------
                 * 根据present的值来对wrap容器进行相应的操作，wrap容器的布局
                 * 图片预览后对图片个wrap容器的操作
                 */
                var handleDiv = function(_dom, type) {
                    if (type == 'back-clip') {
                        _dom.css({
                            'background-position': 'center center',
                            'background-repeat': 'no-repeat',
                            'background-size': 'cover'
                        })
                        _dom.mouseenter(function() {
                            if ($(this).css('background-image') == 'none') {

                            } else {
                                $(this).children('.upload-delete').css('display', 'block');
                                $(this).children('.upload-picbg').css('display', 'block');
                            }

                        })
                        _dom.mouseleave(function() {
                            $(this).children('.upload-delete').css('display', 'none');
                            $(this).children('.upload-picbg').css('display', 'none');
                        })
                        _dom.children('.upload-delete').click(function() {
                            if (opts.multi > 1 || $(ele).data('multi') > 1) {
                                curImgCount--;
                                $(this).parent('div').remove();
                                var imgNums = $(ele).children('div').length;
                            }
                            $(this).parent('div').css('background-image', 'url()');
                            $(this).css('display', 'none');
                            $(this).siblings('.upload-picbg').css('display', 'none');
                            $(this).parents('div').unbind('mouseenter');
                        })
                    } else if (type == 'full-fill') {
                        _dom.mouseenter(function() {
                            // 判断图片没有src值
                            if ($(this).children('img').attr('src') == undefined) {

                            } else {
                                $(this).children('.upload-delete').css('display', 'block');
                                $(this).children('.upload-picbg').css('display', 'block');
                            }
                        })
                        _dom.mouseleave(function() {
                            $(this).children('.upload-delete').css('display', 'none');
                            $(this).children('.upload-picbg').css('display', 'none');
                        })
                        _dom.children('.upload-delete').click(function() {
                            if (opts.multi > 1 || $(ele).data('multi') > 1) {
                                $(this).parent('div').remove();
                                curImgCount--;
                            }
                            $(this).siblings('img').removeAttr('src');
                            $(this).css('display', 'none');
                            $(this).siblings('.upload-picbg').css('display', 'none');
                            $(this).parent('div').unbind('mouseenter');
                        })
                    } else if (type == 'white-space') {
                        _dom.css({
                            'vertical-align': 'middle',
                            'position': 'relative',
                            'margin': '0 auto'
                        });
                        _dom.children('img').css({
                            'max-width': '100%',
                            'max-height': '100%',
                            'margin': '0 auto',
                            'position': 'absolute',
                            'top': '50%',
                            'left': '50%',
                            'transform': 'translate(-50%,-50%)',
                            'width': 'auto',
                            'height': 'auto'
                        });
                        _dom.children('img').on('load', function() {
                            if ($(this).width() < $(this).parent('div').width() && $(this).height() < $(this).parent('div').height()) {
                                $(this).width($(this).parent('div').width());
                            };
                        });
                        _dom.mouseenter(function() {
                            if ($(this).children('img').attr('src') != undefined) {
                                $(this).children('.upload-delete').css('display', 'block');
                                $(this).children('.upload-picbg').css('display', 'block');
                            }
                        })
                        _dom.mouseleave(function() {
                            $(this).children('.upload-delete').css('display', 'none');
                            $(this).children('.upload-picbg').css('display', 'none');
                        })
                        _dom.children('.upload-delete').click(function() {
                            if (opts.multi > 1 || $(ele).data('multi') > 1) {
                                $(this).parent('div').remove();
                                var imgNums = $(ele).children('div').length;
                                curImgCount--;

                            }
                            $(this).siblings('img').removeAttr('src');
                            $(this).siblings('img').width('');
                            $(this).css('display', 'none');
                            $(this).siblings('.upload-picbg').css('display', 'none');
                            $(this).parent('div').unbind('mouseenter');
                        })

                    }

                };

                /**
                 * --------------------------------------------------
                 *
                 * --------------------------------------------------
                 *
                 * 预览图片前先获得上传的文件路径Url，多张图片时就有多个Url
                 */
                ele.getElementsByTagName('input').getObjectURL = function(file) {
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

                /**
                 * --------------------------------------------------
                 *
                 * --------------------------------------------------
                 *
                 * 选择多张图片上传时创建多个div
                 */
                var createDiv = function(_dom, files, type) {
                    for (var n = 0; n < files.length; n++) {
                        var _self = $(_dom).parents('div').children('div');
                        var divIndex = $(_dom).parent('div').index();
                        $(_dom).parents('.img-preview-wrap').prepend(wrapInnerHtml);
                        var _newDiv = $(_dom).parents('div').children('div').eq(0);
                        setWrap(_newDiv)
                        if (type == 'back-clip') {
                            _newDiv.css('background-image', 'url(' + ele.getElementsByTagName('input').getObjectURL(files[n]) + ')')
                            handleDiv(_newDiv, type);

                        } else {
                            _newDiv.append('<img/>')
                            _newDiv.children('img').attr('src', ele.getElementsByTagName('input').getObjectURL(files[n]));
                            handleDiv(_newDiv, type);
                        }

                    }
                };

                /**
                 * --------------------------------------------------
                 *
                 * --------------------------------------------------
                 *
                 * 监听每个wrap的input的click事件
                 * 要是页面上的wrap下的div数量超过了设置的multi的数量
                 * click就不能点击，return false
                 */
                $(ele).find('input[type="file"]').click(function(e) {
                    var itemLength = $(ele).children('div').length;
                    if (opts.multi == 1) {
                        if ($(ele).data('multi') != undefined && itemLength > $(ele).data('multi')) {
                            alert('超过了' + $(ele).data('multi') + '张限制了')
                            return false
                        } else if ($(ele).data('multi') == undefined && itemLength > opts.multi) {
                            alert('超过了' + opts.multi + '张限制了')
                            return false;
                        }
                    } else if (opts.multi > 1 && itemLength > opts.multi) {
                        alert('上传超过' + opts.multi + '张了,预览失败');
                        return false
                    }
                })

                /**
                 * --------------------------------------------------
                 *
                 * --------------------------------------------------
                 *
                 * 通过判断opts.multi跟data-multi来生成一个公共方法
                 * 这个公共方法是根据js调用的present跟data-present来成生成相应的布局方法跟div
                 */
                function setPre(_dom, _doms, present) {
                    if (opts.multi == 1) {
                        if ($(ele).data('multi') > 1) {
                            createDiv(_doms, _doms.files, present);
                        } else {
                            if (present == 'back-clip') {
                                _dom.parent('div').css('background-image', 'url(' + ele.getElementsByTagName('input').getObjectURL(_doms.files[0]) + ')');
                            } else {
                                _dom.siblings('img').attr('src', ele.getElementsByTagName('input').getObjectURL(_doms.files[0]));
                            }

                            handleDiv(_dom.parent('div'), present);
                        }
                    } else {
                        createDiv(_doms, _doms.files, present);
                    }
                }

                /**
                 * --------------------------------------------------
                 *
                 * --------------------------------------------------
                 *
                 * 监听每个wrap的input的change事件
                 */
                var curImgCount = 0;
                $(ele).find('input[type="file"]').change(function(e) {

                    /**
                     * --------------------------------------------------
                     *
                     * --------------------------------------------------
                     *
                     * 现在默认值是opts.multi==1
                     * 如果opts.multi>1就不能设置data-multi 因为已经默认多张了
                     * if opts.multi==1，{然后在wrap容器设置data-multi，要是上传的数量多于data-multi就会报错alert}
                     * else(opt.multi==1,也没有设置data-mult){上传的数量就不能多于1张}
                     * else(opt.multi>1)就不能设置data-multi{上传的数量就不能大于opts.multi的值}
                     */
                    if (opts.multi == 1) {
                        if ($(ele).data('multi') != undefined && e.target.files.length > ($(ele).data('multi') - curImgCount)) {
                            alert('超过了' + $(ele).data('multi') + '张限制了')
                            return false
                        } 
                    } else if (opts.multi > 1 && e.target.files.length > (opts.multi - curImgCount)) {
                        alert('超过了' + opts.multi + '张限制了')
                        return false
                    }

                    curImgCount += e.target.files.length

                    // 根据present来设置相应的操作
                    if (opts.present == 'full-fill') {
                        if ($(ele).data('present') != undefined) {
                            if ($(ele).data('present') == 'white-space') {
                                setPre($(this), this, 'white-space')
                            } else if ($(ele).data('present') == 'back-clip') {
                                setPre($(this), this, 'back-clip')
                            }
                        } else if ($(ele).data('present') == undefined) {
                            setPre($(this), this, opts.present)
                        }
                    } else if (opts.present == 'white-space') {
                        setPre($(this), this, 'white-space')

                    } else if (opts.present == 'back-clip') {
                        setPre($(this), this, 'back-clip')
                    }

                    // 解决input不能重复选同一个图片的问题
                    $(this).wrap('<form>').closest('form').get(0).reset();
                    $(this).unwrap('<form>');

                    // 判断图片的类型，图片的类型只能是opts.imgtType里面的类型
                    if (this.value) {
                        if (!RegExp("\.(" + opts.imgType.join('|') + ")$", "i").test(this.value.toLowerCase())) {
                            alert('选择文件错误，图片类型必须是' + opts.imgType.join(',') + '中的一种');
                            this.value = '';
                            return false;
                        }
                    }

                })
            })
        }
    });
})()
