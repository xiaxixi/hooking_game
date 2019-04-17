// Declaration..................................................
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    
    // 游戏说明画布
    help = document.getElementById('help'), 
    c = help.getContext('2d'),
    // 游戏说明图片
    s = new Image(),
    E = new Image(),
    h = new Image(),
    // 游戏说明文本
	text1,
	text2,
	text3,
	text4,
    
    // 背景图片 和 物体图片
    background = new Image(),
    CirclePop = new Image(),   
    HeartPop = new Image(),
    frag1 = new Image(),
    frag2 = new Image(),
    frag3 = new Image(),
    frag4 = new Image();

// Functions.....................................................
// 清空
function erase() {
    "use strict";
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// 背景
function drawBackground() {
    "use strict";
    context.save();
    context.drawImage(background, 0, 0);
    context.restore();
}

// 游戏说明
function Help() {
    "use strict";
    c.save();
    c.drawImage(s, 0, 0);
    c.drawImage(E, 160, 240);
    c.drawImage(h, 10, 20);
    c.font = '20px 华文行楷';
    c.strokeStyle = 'cornflowerblue';
    c.fillText(text1, 10, 410);
    c.fillText(text2, 10, 435);
    c.fillText(text3, 10, 460);
    c.fillText(text4, 10, 485);
    c.restore();
}

// small
// 圆形棒棒糖1
function drawCirclePop1() {
    "use strict";
    
    context.save();
    context.drawImage(CirclePop, 100, 120);
    context.restore();
}

// 圆形棒棒糖2
function drawCirclePop2() {
    "use strict";
    
    context.save();
    context.drawImage(CirclePop, 400, 120);
    context.restore();
}

// 圆形棒棒糖3
function drawCirclePop3() {
    "use strict";

    context.save();
    context.drawImage(CirclePop, 700, 120);
    context.restore();
}

//big
// 心形棒棒糖1
function drawHeartPop1() {
    "use strict";

    context.save();
    context.drawImage(HeartPop, 250, 240);
    context.restore();
}

// 心形棒棒糖2
function drawHeartPop2() {
    "use strict";

    context.save();
    context.drawImage(HeartPop, 800, 240);
    context.restore();
}

// 时光碎片
// 时光碎片1
function drawFragment1() {
    "use strict";
    context.save();
    context.drawImage(frag1, 50, 20);
    context.restore();
}

// 时光碎片2
function drawFragment2() {
    "use strict";
    context.save();
    context.drawImage(frag2, 280, 100);
    context.restore();
}

// 时光碎片3
function drawFragment3() {
    "use strict";
    context.save();
    context.drawImage(frag3, 560, 60);
    context.restore();
}

// 时光碎片4
function drawFragment4() {
    "use strict";
    context.save();
    context.drawImage(frag4, 840, 40);
    context.restore();
}

// 绘制背景 和 未被碰到的物体图片
function draw() {
    "use strict";
    drawBackground();
    Help();
    
    if(!touch[0])
    drawCirclePop1();
    if(!touch[1])
    drawCirclePop2();
    if(!touch[2])
    drawCirclePop3();
    if(!touch[3])
    drawHeartPop1();
    if(!touch[4])
    drawHeartPop2();
    if(!touch[5])
    drawFragment1();
    if(!touch[6])
    drawFragment2();
    if(!touch[7])
    drawFragment3();
    if(!touch[8])
    drawFragment4();
}

// Initialization................................................
// 背景图片 和 物体图片
background.src = './images/StarrySky2.jpg';
CirclePop.src = './images/lollipop2.png';
HeartPop.src = './images/lollipop3.png';
frag1.src = './images/fragment1.jpg';
frag2.src = './images/fragment2.jpg';
frag3.src = './images/fragment3.jpg';
frag4.src = './images/fragment4.jpg';

// 游戏说明图片
s.src = './images/sky.png';
E.src = './images/E.png';
h.src = './images/h.png';
// 游戏说明文本
text1 = 'ordinary模式：四次机会抓取碎片';
text2 = 'advanced模式：两次机会抓取碎片';
text3 = '碎片加分，棒棒糖减分';
text4 = 'score达到4成功穿越';