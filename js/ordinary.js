// Declaration..................................................
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    
    animateButton = document.getElementById('animateButton'),
    start = false,
    animate,
    
    releaseButton = document.getElementById('releaseButton'),
    count = 0,
    release = 0,
    
	arrow1 = new Image(),
	arrow2 = new Image(),
	bow = new Image(),
	
    angle,
    angle_step,       // 角度变化值
    clockwise = true, // 顺时针方向
    
    arrow_step, 	  // 释放箭速度的变化值
    maxMove,          // 在此方向距旋转中心的最大长度
    move,             // 现在距旋转中心的长度
    
    arrow_x,          // 转换到原来坐标系箭的x值
    arrow_y,          // 转换到原来坐标系箭的y值
    
    i = 0,
    touch = new Array(10),
    loc_x = new Array(9),
    loc_y = new Array(9),
    
    obj_step,
    obj_x,
    obj_y,
    
    score = 0,              //时光碎片数量
    mimage = new Image(),   //填充文本的图片
    mypattern,
    max,
    
    finalImage = new Image(); //最后页面背景图

// Functions.....................................................

//初始化（重置）touch数组 和 物体坐标数组 等
function init() {
	for(i = 0;i < 10;i++) {
		touch[i] = false;
	}
	loc_x[0] = 100;
	loc_y[0] = 120;
	loc_x[1] = 400;
	loc_y[1] = 120;
	loc_x[2] = 700;
	loc_y[2] = 120;
	
	loc_x[3] = 250;
	loc_y[3] = 240;
	loc_x[4] = 800;
	loc_y[4] = 240;
	
	loc_x[5] = 50;
	loc_y[5] = 20;
	loc_x[6] = 280;
	loc_y[6] = 100;
	loc_x[7] = 560;
	loc_y[7] = 60;
	loc_x[8] = 840;
	loc_y[8] = 40;
	
	angle = Math.PI / 2;
	angle_step = Math.PI / 360;

	arrow_step = 2;
	move = arrow2.height;

	obj_step = 1;
	
	start = false;
	clockwise = true;
	i = 0;
	count = 0;
	release = 0;
	score = 0;
	flag = 0;
	type.value = 'ordinary',
	
	max = 4;
}

// 画弓 和 箭..................................
// 画弓
function drawBow() {
    "use strict";   
    context.save();
    context.translate(canvas.width / 2, canvas.height);
    context.rotate(angle + 3 * Math.PI / 4);
    context.drawImage(bow, 0, 0);
    context.restore();
}

// 画箭
function drawArrow() {
    "use strict";   
    context.save();
    context.translate(canvas.width / 2, canvas.height);
    context.rotate(angle + 3 * Math.PI / 4);
    context.drawImage(arrow1, 0, 0);
    context.restore();
}

// 弓 和 箭 30°到150°旋转运动................................
// 计算钩子(丘比特之箭)所转角度
function calculateAngle() {
	if(release == 0)
	angle_step = Math.PI / 360;
	else 
	angle_step = 0;
	
	if(clockwise) { // 顺时针
		angle += angle_step;
		
		// 转到右边最大角 150°
		if(angle >= 5 * Math.PI / 6) {
			clockwise = false;
		}
	}
	
	else { // 逆时针
		angle -= angle_step;
		
		// 转到左边最小角 30°
		if(angle <=  Math.PI / 6) {
			clockwise = true;
		}
	}
	
	return angle;
}

// 弓和箭旋转动画
function animateBowArrow() {
	"use strict";
	
	if(flag == 0) {
		max = 4;
	}
	else {
		max = 2;
	}
	
	if(count >= max && release == 0) {
		drawFinal();
		bg.pause();
	}
	
	else {
		erase();
		draw();  // 画背景    

		angle = calculateAngle();
		drawBow();
		drawArrow();
		drawScore();
	}
	
	if(!start) {
		cancelAnimationFrame(animateBowArrow);
	}
	
	else
	requestAnimationFrame(animateBowArrow); 
}

// 释放箭的直线运动.....................................
// 箭的直线运动
function leaveLinearMotion() { 
	"use strict";
	context.save();
	if(release == 1)
	arrow_step = 2; // 释放
	else if(release == 2) { // 返回
		if(i < 3 || i == 7)
		arrow_step = -1.5;
		else if(i == 9)
		arrow_step = -2;
		else 
		arrow_step = -1;
	}
	else
	arrow_step = 0;
	
	move += arrow_step;
	context.translate(canvas.width / 2, canvas.height);
    context.rotate(angle + Math.PI / 2);
    context.translate(-arrow2.width / 2, 0);
    context.drawImage(arrow2, 0, move - arrow2.height);
	context.restore();
}

// 转换到原坐标系箭头的坐标
function transformCoord() {
	"use strict";
	arrow_x = canvas.width / 2 - move * Math.cos(angle);
	arrow_y = canvas.height - move * Math.sin(angle);
}

// 箭与弓之间的连线.................................
function drawLine() {
	context.save();
	context.strokeStyle = 'yellow';
	context.lineWidth = 3;
	context.beginPath();
	context.moveTo(canvas.width / 2, canvas.height);
	transformCoord();
	context.lineTo(arrow_x + (arrow2.height - 5) * Math.cos(angle),
		arrow_y + (arrow2.height - 5) * Math.sin(angle));
	context.stroke();
	context.restore();
}

// 箭直线释放运动动画
function animateLineLeave() {
	"use strict";
	
    erase();
    draw();  // 画背景
	
	drawBow();
	leaveLinearMotion();
	drawLine();
	
	transformCoord();
	
    
    i = isTouch();
    if(touch[i]                           // 碰到物体
    	||1000 < arrow_x || arrow_x < 0   // 超出边界
		|| 700 < arrow_y || arrow_y < 0) { 
    		obj_x = loc_x[i];
    		obj_y = loc_y[i];
    		loc_x[i] = 0;
    		loc_y[i] = canvas.height;
    		release = 2;
    	
    		cancelAnimationFrame(animateLineLeave);
    	}
    else {
    	
    	requestAnimationFrame(animateLineLeave);
    }
	  
    drawScore();
}

// 箭返回的运动...................................................
// 判断箭是否碰到物体(普通)
function isTouch() {
	"use strict";
	
	// 箭柄的中心坐标
	var x = arrow_x + arrow2.height / 2 * Math.cos(angle),
		y = arrow_y + arrow2.height / 2* Math.sin(angle);
		
	for(i = 0; i < 3; i++) {
		if(loc_x[i] <= x && x <= loc_x[i] + CirclePop.width 
			&& loc_y[i] <= y && y <= loc_y[i] + CirclePop.height) {
				touch[i] = true;
				return i;
		}
	}
	
	for(i = 3; i < 5; i++) {
		if(loc_x[i] <= x && x <= loc_x[i] + HeartPop.width 
			&& loc_y[i] <= y && y <= loc_y[i] + HeartPop.height) {
				touch[i] = true;
				return i;
		}
	}
	
	if(loc_x[5] <= x && x <= loc_x[5] + frag1.width 
		&& loc_y[5] <= y && y <= loc_y[5] + frag1.height) {
		touch[5] = true;
		return 5;
	}
	
	else if(loc_x[6] <= x && x <= loc_x[6] + frag2.width 
		&& loc_y[6] <= y && y <= loc_y[6] + frag2.height) {
		touch[6] = true;
		return 6;
	}
	
	else if(loc_x[7] <= x && x <= loc_x[7] + frag3.width 
		&& loc_y[7] <= y && y <= loc_y[7] + frag3.height) {
		touch[7] = true;
		return 7;
	}
		
	else if(loc_x[8] <= x && x <= loc_x[8] + frag4.width 
		&& loc_y[8] <= y && y <= loc_y[8] + frag4.height) {
		touch[8] = true;
		return 8;
	}
	
	return 9;
}


// 物体被带回的直线运动
function backLinearMotion(i) { 
	"use strict";
	
	context.save();
	if(i < 3 || i == 7)
		obj_step = 1.5;
	else if(i == 9)
		obj_step = 2;
	else 
		obj_step = 1;
	
	obj_x += obj_step * Math.cos(angle);
	obj_y += obj_step * Math.sin(angle);
	
	if(i < 3)
    context.drawImage(CirclePop, obj_x, obj_y);
    else if(i > 2 && i < 5)
    context.drawImage(HeartPop, obj_x, obj_y);
    else if(i == 5)
    context.drawImage(frag1, obj_x, obj_y);
    else if(i == 6)
    context.drawImage(frag2, obj_x, obj_y);
    else if(i == 7)
    context.drawImage(frag3, obj_x, obj_y);
    else if(i == 8)
    context.drawImage(frag4, obj_x, obj_y);
    
	context.restore();
}



// 箭 和 物体直线返回动画
function animateLineBack() {
	erase();
	draw();  // 画背景 
	
	drawBow();
	leaveLinearMotion(); // 箭返回
	drawLine();
	
	backLinearMotion(i); // 物体返回

	if(move <= arrow2.height) {
		draw();
    	drawBow();
    	drawArrow();
    	
    	calculateScore();
    	
    	release = 0;
		cancelAnimationFrame(animateLineBack);
	}
	
	else {
		requestAnimationFrame(animateLineBack);
	}
	
	drawScore();
}

// 时光碎片数量.............................................
// 计算时光碎片的数量(普通)
function calculateScore() {
	if(0 <= i && i < 3)
		score -= 1;
	else if(3 <= i && i < 5)
		score -= 2;
	else if(i == 5 || i == 6 || i == 8)
		score += 2;
	else if(i == 7)
		score += 1;
}

// 显示时光碎片的数量 (文本)
function drawScore() {
	context.save();
	context.fillStyle = 'lightcoral';
	context.font = "100px French Script MT";
	//使用图像对象填充
	context.fillText("Score: ", 0, canvas.height - 100);
	context.fillText(score, 200, canvas.height - 100);
	context.restore();
}

// 最终页面.....................................................
// 绘最终时光碎片数量
function drawFinalScore() {
	context.save();
	if(judgeGo()) { // 成功
		context.fillStyle = 'red';
		context.font = "200px French Script MT";
		context.fillText("succeed", 300, canvas.height - 100);
	}
	else {          // 失败
		context.fillStyle = 'lightskyblue';
		context.font = "200px French Script MT";
		context.fillText("defeat", 300, canvas.height - 100);
	}
	context.fillText("Score", 300, 200);
	context.fillText(score, canvas.width / 2 - 50, canvas.height / 2 + 50);
	context.restore();
}

// 判断碎片数量能否穿越
function judgeGo() {
	if(score < 4) {
		return false;
	}
	else {
		return true;
	}
}

// 绘背景图 和 音效
function drawFinalBackground() {
	if(judgeGo()) {  //成功
		finalImage.src = './images/may.jpg';
		happy.play();
	}
	else {           //失败
		finalImage.src = './images/sad.jpg';
		sad.play();
	}
	context.drawImage(finalImage, 0, 0);
}

// 画最终页面
function drawFinal() {
	context.save();
	erase();
	drawFinalBackground();
	drawFinalScore();
	context.restore();
}