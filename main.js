window.onload = function () {
  /*
    拖拽 box1元素
       --拖拽的流程：
           1.当鼠标在拖拽元素上按下时，开始拖拽  onmousedown
           2.当鼠标移动时，拖拽元素跟随鼠标移动  onmousemove
           3.当鼠标松开时，被拖拽元素固定在当前位置  onmouseup
  */

  //获取 box1,box2,img1
  var box1 = document.getElementById("box1");
  var box2 = document.getElementById("box2");
  var img1 = document.getElementById("img1");

  //开启 box1的拖拽
  drag(box1);
  //开启 box2的拖拽
  drag(box2);
  //开启 img1的拖拽
  drag(img1);

};

/*
   提取一个专门用来设置拖拽的函数
   参数：开启拖拽的元素
*/
function drag(obj) {
  //为 obj绑定一个鼠标按下事件
  //当鼠标在拖拽元素上按下时，开始拖拽  onmousedown
  obj.onmousedown = function (event) {

    //设置 obj捕获所有鼠标按下的事件  
    /*
      捕获：setCapture()
        --只有IE支持。但是在火狐中调用时不会报错
            而使用 chrome调用，会报错
    */
    //兼容写法一：
    // if (obj.setCapture) {
    //     obj.setCapture();
    // }
    //兼容写法二：    
    obj.setCapture && obj.setCapture();

    event = event || window.event;
    //  alert("鼠标按下，开始拖拽");

    //求出 div的水平偏移量 ：鼠标.clientX - 元素.offsetLeft
    //求出 div的垂直偏移量 ：鼠标.clientY - 元素.offsetTop
    var ol = event.clientX - obj.offsetLeft;
    var ot = event.clientY - obj.offsetTop;

    //为 document绑定一个 onmousemove事件
    document.onmousemove = function (event) {
      event = event || window.event;
      //当鼠标移动时，拖拽元素跟随鼠标移动  onmousemove
      //获取鼠标的坐标
      var left = event.clientX - ol;
      var top = event.clientY - ot;

      //修改 box1的位置
      obj.style.left = left + "px";
      obj.style.top = top + "px";

    }

    //为 document绑定一个鼠标松开事件
    document.onmouseup = function () {

      //当鼠标松开时，被拖拽元素固定在当前位置  onmouseup
      //取消 document的 onmousemove事件
      document.onmousemove = null;

      //取消 document的 onmouseup事件
      document.onmouseup = null;

      //当鼠标松开时，取消对事件的捕获  释放：releaseCapture();
      obj.releaseCapture && obj.releaseCapture();

    };

    /*
      当我们去拖拽一个网页中的内容时，浏览器会默认去搜索内容
         此时会导致拖拽的异常，这个是浏览器提供的默认行为
         如果不希望发生这个行为，则可以通过 return false来取消默认行为

       但是这招对 IE8不起作用
    */
    return false;

  }
};
