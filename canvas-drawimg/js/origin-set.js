//使用 dragOrigin.originStart('js-origin-btn')

define([],function(){
    var dragObj = {

        def: {

            originList: [

            ]
            
        },

        getStyle: function(obj,name){
            if(obj.currentStyle){
                return obj.currentStyle[name];
            }else{
                return getComputedStyle(obj, false)[name];
            }
        },

        originStart: function( str, index, obj){
            index = index||0;
            var _this = this, already_origin = false, parent_obj='';

            if(typeof obj == 'string'){
                obj = document.querySelector(obj);
            }else{
                obj = obj || document;
            }
            
            if( _this.def.originList[index] ){
                already_origin = true;
                parent_obj = _this.def.originList[index];
            }else{
                parent_obj = {
                    _w: 0,
                    _h: 0,
                    _x: 0,
                    _y: 0,
                    _l: 0,      //斜对角半长
                    _left: 0,
                    _top: 0,
                    _oring: 0,
                    scale: 1,
                    now_oring: 0,
                    mx: 0,
                    my: 0
                }
            }

            

            obj.onmousedown = function(event){
                str = str || 'js-origin-btn';
                var _tag = event.target, parent_node = _tag.parentNode;
                if(!_tag.classList.contains(str)){  // 是不是需要移动的元素
                    return;
                }
                console.log(222)
                // 初始化旋转数据
                // 父元素中心点的位置
                if( !already_origin ){
                    parent_obj._w = parseFloat(_this.getStyle(parent_node, 'width'));
                    parent_obj._h = parseFloat(_this.getStyle(parent_node, 'height'));

                    parent_obj._x = parent_node.offsetLeft + parent_obj._w/2;
                    parent_obj._y = parent_node.offsetTop + parent_obj._h/2;
                    
                    parent_obj._l = Math.sqrt(parent_obj._w*parent_obj._w+parent_obj._h*parent_obj._h)/2;

                    parent_obj._left = parseFloat(_this.getStyle(parent_node, 'left'));
                    parent_obj._top = parseFloat(_this.getStyle(parent_node, 'top'));
                    
                    // 初始右下角所在角度
                    parent_obj._oring = Math.atan2(parent_obj._h*-1,parent_obj._w)/(Math.PI*2);

                }
                var tag_w = parseFloat(_this.getStyle(_tag, 'width'))/2;
                var tag_h = parseFloat(_this.getStyle(_tag, 'height'))/2;
                var ol = event.clientX - _tag.offsetLeft - parent_node.offsetLeft - tag_w;
                var ot = event.clientY - _tag.offsetTop - parent_node.offsetTop - tag_h;
                if( already_origin ){   // 以前有转动过
                    ol = event.clientX - parent_obj._x - parent_obj.mx;
                    ot = event.clientY - parent_obj._y - parent_obj.my;
                }
                already_origin = true;
                //为document绑定一个onmousemove事件
                document.onmousemove = function(event){     
                    if(event.clientX > document.documentElement.clientWidth||event.clientY > document.documentElement.clientHeight){
                        return;
                    }
                    
                    // 相对中心点位移
                    parent_obj.mx = event.clientX - ol - parent_obj._x;
                    parent_obj.my = event.clientY - ot - parent_obj._y;

                    // 放大比例
                    parent_obj.scale = (Math.sqrt(parent_obj.mx*parent_obj.mx+parent_obj.my*parent_obj.my))/parent_obj._l;
                    
                    var n_w = parent_obj._w*parent_obj.scale;
                    var n_h = parent_obj._h*parent_obj.scale;
                    var n_l = (n_w-parent_obj._w)/2;
                    var n_t = (n_h-parent_obj._h)/2;
                    parent_node.style.width = n_w +'px';
                    parent_node.style.height = n_h+'px';
                    parent_node.style.left = parent_obj._left-n_l + 'px';
                    parent_node.style.top = parent_obj._top-n_t+'px';
                    
                    // 旋转角度
                    var now_oring = (Math.atan2(parent_obj.my*-1,parent_obj.mx)/(Math.PI*2) -parent_obj._oring) *-360 ;
                    parent_node.style.transform = 'rotate('+now_oring+'deg)'; 

                    parent_obj.now_oring = Math.atan2(parent_obj.my*-1,parent_obj.mx)/(Math.PI*2);
                    
                    
                };
                
                document.onmouseup = function(){
                    _this.def.originList[index] = parent_obj;
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                
                
                return false;
                
            };
        },
    
    };

    return dragObj;
});


