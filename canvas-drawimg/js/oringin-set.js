
(function(w){

    //使用 dragOrigin.originStart('js-origin-icon')
    
    w.dragObj = {

        def: {
    
            scale: 1,
            
        },
    
        getStyle: function(obj,name){
            console.log(obj)
            if(obj.currentStyle){
                return obj.currentStyle[name];
            }else{
                return getComputedStyle(obj, false)[name];
            }
        },
    
        originStart: function(str, obj){
            
            var _this = this;
    
            if(typeof obj == 'string'){
                obj = document.querySelector(obj);
            }else{
                obj = obj || document;
            }
            
    
            obj.onmousedown = function(event){
                
                str = str || 'js-origin-icon';
                
                var _tag = event.target, parent_node = _tag.parentNode;
                if(!_tag.classList.contains(str)){	// 是不是需要移动的元素
                    return;
                }
                var parent_obj = {
                    _w: parseFloat(_this.getStyle(parent_node, 'width')),
                    _h: parseFloat(_this.getStyle(parent_node, 'height')),
                    _x: 0,
                    _y: 0,
                    _l: 0,		//斜对角半长
                    _left: 0,
                    _top: 0,
                    _oring: 0
                }
                // 父元素中心点的位置
                parent_obj._x = parent_node.offsetLeft + parent_obj._w/2;
                parent_obj._y = parent_node.offsetTop + parent_obj._h/2;
                
                parent_obj._l = Math.sqrt(parent_obj._w*parent_obj._w+parent_obj._h*parent_obj._h)/2;
    
                parent_obj._left = parseFloat(_this.getStyle(parent_node, 'left'));
                parent_obj._top = parseFloat(_this.getStyle(parent_node, 'left'));
                
                var tag_w = parseFloat(_this.getStyle(_tag, 'width'))/2;
                var tag_h = parseFloat(_this.getStyle(_tag, 'height'))/2;
    
                var ol = event.clientX - _tag.offsetLeft - parent_node.offsetLeft - tag_w;
                var ot = event.clientY - _tag.offsetTop - parent_node.offsetTop - tag_h;
                // 初始右下角所在角度
                parent_obj._oring = Math.atan2(parent_obj._h*-1,parent_obj._w)/(Math.PI*2);
                //为document绑定一个onmousemove事件
                document.onmousemove = function(event){		
                    if(event.clientX > document.documentElement.clientWidth||event.clientY > document.documentElement.clientHeight){
                        return;
                    }
                    
                    var mx = event.clientX - ol - parent_obj._x;
                    var my = event.clientY - ot - parent_obj._y;
                    _this.def.scale = (Math.sqrt(mx*mx+my*my))/parent_obj._l;
                    
                    var n_w = parent_obj._w*_this.def.scale;
                    var n_h = parent_obj._h*_this.def.scale;
                    var n_l = (n_w-parent_obj._w)/2;
                    var n_t = (n_h-parent_obj._h)/2;
                    parent_node.style.width = n_w +'px';
                    parent_node.style.height = n_h+'px';
                    parent_node.style.left = parent_obj._left-n_l + 'px';
                    parent_node.style.top = parent_obj._top-n_t+'px';
                    
                    // 旋转角度
                    var oringin_d = (Math.atan2(my*-1,mx)/(Math.PI*2) -parent_obj._oring) *-360;
                    parent_node.style.transform = 'rotate('+oringin_d+'deg)'; 
                    
                };
                
                document.onmouseup = function(){
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                
                return false;
                
            };
        },
    
    }


})(this)



