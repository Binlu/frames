define(["general"],function(general){
    var select_ele=general.fn.getEle(".js-select-div");

    // 绑定事件
    for(var i=0,len=select_ele.length;i<len;i++){
        general.fn.addEvent(select_ele[i],"click",function(e){
            var ev=e || window.event;
            var target=ev.target || ev.srcElement;
            var node_name=target.nodeName.toLowerCase();
            if(node_name==="span"){
                var oul=general.fn.getNextEle(target);
                if(!target.is_show){
                    display_str="block";
                    target.is_show=true;
                }else{
                    display_str="none";
                    target.is_show=false;
                }
                oul.style.display=display_str;
            }else if(node_name==="li"){
                var ospn=general.fn.getEle("span",target.parentNode.parentNode)[0];
                var txt=target.innerText,id=target.getAttribute("value") || "";
                ospn.innerText=txt;
                ospn.setAttribute("value",id);
                target.parentNode.style.display="none";
                ospn.is_show=false;
                ospn.className="select-spn now-choice";
                general.fn.getNextEle(target.parentNode.parentNode).style.display="none";
            }

            general.fn.stopBubble(e);
        });
    };
    general.fn.addEvent(document.body,"click",function(e){
        for(var i=0,len=select_ele.length;i<len;i++){
            var oul=general.fn.getEle("ul",select_ele[i])[0];
            oul.style.display="none";
            general.fn.getEle("span",select_ele[i])[0].is_show=false;
        }
    });
});