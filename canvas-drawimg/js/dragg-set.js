(function(w){
    w.dragObj = {

        def: {
            drag_point: {   //当前移动元素信息
                x: 0,
                y: 0
            }
        },
    
        dragStart: function(obj, str){
            var _this = this;
    
            if(typeof obj == 'string'){
                obj = document.querySelector(obj);
            }else{
                obj = obj || document;
            }
            obj.onmousedown = function(event){
                
                // obj.setCapture && obj.setCapture();
                // event = event || window.event;
                str = str||'js-drag-box';
                var _tag = event.target, classN = _tag.className;
                if(!_tag.classList.contains(str)){	// 是不是需要移动的元素
                    return;
                }
                
                var ol = event.clientX - _tag.offsetLeft;
                var ot = event.clientY - _tag.offsetTop;
    
                // 初始化元素位移信息
                _this.def.drag_point.x = 0;
                _this.def.drag_point.y = 0;
                
                //为document绑定一个onmousemove事件
                document.onmousemove = function(event){							
                    if(event.clientX > document.documentElement.clientWidth||event.clientY > document.documentElement.clientHeight){   //超过边界不移动
                        return;
                    }
                    _this.def.drag_point.x = event.clientX - ol;
                    _this.def.drag_point.y = event.clientY - ot;
                    //修改box1的位置
                    _tag.style.left = _this.def.drag_point.x + "px";
                    _tag.style.top = _this.def.drag_point.y + "px";
                    
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

// 使用 dragObj.dragStart('body','cc1');