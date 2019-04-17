// Declaration..................................................
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    
    type = document.getElementById('type'),
    flag = 0, // 普通
    maxlength = canvas.height,
    touch2 = new Array(9),
    center_x = new Array(9), // 物体中心点坐标
    center_y = new Array(9),
    d = new Array(9), // 距离
    cos2 = new Array(9), // 吸引
    sin2 = new Array(9),
    
    move2 = arrow2.height,
    
    arrow_x2,
    arrow_y2,
    
    x2, // 伸到最长后的箭头坐标
    y2,
    
    f = 0, // 每次释放的范围里有无物体
    t = 0, // 物体是否都被吸引到箭头位置
    
    obj_step;

// Functions.....................................................
//
function init2() {
	for(i = 0;i < 9;i++) {
		touch2[i] = false;
		center_x[i] = 0;
		center_y[i] = canvas.height;
		d[i] = 0;
		cos2[i] = 0;
		sin2[i] = 0;
	}
	
	center_x[0] = 100 + CirclePop.width / 2;
	center_y[0] = 120 + CirclePop.height / 2;
	center_x[1] = 400 + CirclePop.width / 2;
	center_y[1] = 120 + CirclePop.height / 2;
	center_x[2] = 700 + CirclePop.width / 2;
	center_y[2] = 120 + CirclePop.height / 2;
	
	center_x[3] = 250 + HeartPop.width / 2;
	center_y[3] = 240 + HeartPop.height / 2;
	center_x[4] = 800 + HeartPop.width / 2;
	center_y[4] = 240 + HeartPop.height / 2;
	
	center_x[5] = 50 + frag1.width / 2;
	center_y[5] = 20 + frag1.height / 2;
	center_x[6] = 280 + frag2.width / 2;
	center_y[6] = 100 + frag2.height / 2;
	center_x[7] = 560 + frag3.width / 2;
	center_y[7] = 60 + frag3.height / 2;
	center_x[8] = 840 + frag4.width / 2;
	center_y[8] = 40 + frag4.height / 2;
	
	t = 0;
	f = 0;
	flag = 0;
}

// 释放箭的直线运动.....................................
// 箭的直线运动
function leaveLinearMotion2() { 
	"use strict";
	context.save();
	if(release == 1)
	arrow_step = 2; // 释放
	else if(release == 3) { // 返回
		arrow_step = -1;
	}
	else
	arrow_step = 0;
	
	if(f == 0) {
		arrow_step = 2;
		if(release == 3) // 返回
		arrow_step = -1;
	}
	
	move2 += arrow_step;
	context.translate(canvas.width / 2, canvas.height);
    context.rotate(angle + Math.PI / 2);
    context.translate(-arrow2.width / 2, 0);
    context.drawImage(arrow2, 0, move2 - arrow2.height);
	context.restore();
}

// 转换到原坐标系箭头的坐标
function transformCoord2() {
	"use strict";
	arrow_x2 = canvas.width / 2 - move2 * Math.cos(angle);
	arrow_y2 = canvas.height - move2 * Math.sin(angle);
}

// 箭与弓之间的连线.................................
function drawLine2() {
	context.save();
	context.strokeStyle = 'yellow';
	context.lineWidth = 3;
	context.beginPath();
	context.moveTo(canvas.width / 2, canvas.height);
	transformCoord2();
	context.lineTo(arrow_x2 + (arrow2.height - 5) * Math.cos(angle),
		arrow_y2 + (arrow2.height - 5) * Math.sin(angle));
	context.stroke();
	context.restore();
}

// 箭直线释放运动动画 (高级)
function animateLineLeave2() {
	"use strict";
	
    erase();
    draw();  // 画背景
	
	drawBow();
	leaveLinearMotion2();
	drawLine2();	
    
    if(move2 > maxlength) { 
    	release = 2;
    		
    	cancelAnimationFrame(animateLineLeave2);
    }
    else {
    	
    	requestAnimationFrame(animateLineLeave2);
    }
    
    drawScore();
}

// 箭返回的运动...................................................
// 判断箭是否碰到物体(高级)
function isTouch2() {
	"use strict";
	
	// 箭头的坐标
	x2 = canvas.width / 2 - maxlength * Math.cos(angle);
	y2 = canvas.height - maxlength * Math.sin(angle);	
	
	f = 0;
		
	for(i = 0; i < 3; i++) {
		if(Math.sqrt(Math.pow(center_x[i]- x2, 2) 
			+ Math.pow(center_y[i] - y2, 2)) < 200 && touch[i] == false) {
				touch[i] = true;
				touch2[i] = true;
				d[i] = Math.sqrt(Math.pow(center_x[i] - x2, 2) 
					+ Math.pow(center_y[i] - y2, 2));
				cos2[i] = Math.abs(center_x[i] - x2) / d[i];
				sin2[i] = Math.abs(center_y[i] - y2) / d[i];
				f = 1;
				t++;
		}
	}
	
	
	for(i = 3; i < 5; i++) {
		if(Math.sqrt(Math.pow(center_x[i]- x2, 2) 
			+ Math.pow(center_y[i] - y2, 2)) < 200 && touch[i] == false) {
				touch[i] = true;
				touch2[i] = true;
				d[i] = Math.sqrt(Math.pow(center_x[i] - x2, 2) 
					+ Math.pow(center_y[i] - y2, 2));
				cos2[i] = Math.abs(center_x[i] - x2) / d[i];
				sin2[i] = Math.abs(center_y[i] - y2) / d[i];
				f = 1;
				t++;
		}
	}
	
	if (Math.sqrt(Math.pow(center_x[5] - x2, 2) 
			+ Math.pow(center_y[5] - y2, 2)) < 200 && touch[5] == false) {
		touch[5] = true;
		touch2[5] = true;
		d[5] = Math.sqrt(Math.pow(center_x[5] - x2, 2) 
					+ Math.pow(center_y[5] - y2, 2));
		cos2[5] = Math.abs(center_x[5] - x2) / d[5];
		sin2[5] = Math.abs(center_y[5] - y2) / d[5];
		f = 1;
		t++;
	}
	
	if (Math.sqrt(Math.pow(center_x[6] - x2, 2) 
			+ Math.pow(center_y[6] - y2, 2)) < 200 && touch[6] == false) {
		touch[6] = true;
		touch2[6] = true;
		d[6] = Math.sqrt(Math.pow(center_x[6] - x2, 2) 
					+ Math.pow(center_y[6] - y2, 2));
		cos2[6] = Math.abs(center_x[6] - x2) / d[6];
		sin2[6] = Math.abs(center_y[6] - y2) / d[6];
		f = 1;
		t++;
	}
	
	if (Math.sqrt(Math.pow(center_x[7] - x2, 2) 
			+ Math.pow(center_y[7] - y2, 2)) < 200 && touch[7] == false) {
		touch[7] = true;
		touch2[7] = true;
		d[7] = Math.sqrt(Math.pow(center_x[7] - x2, 2) 
					+ Math.pow(center_y[7] - y2, 2));
		cos2[7] = Math.abs(center_x[7] - x2) / d[7];
		sin2[7] = Math.abs(center_y[7] - y2) / d[7];
		f = 1;
		t++;
	}
		
	if (Math.sqrt(Math.pow(center_x[8] - x2, 2) 
			+ Math.pow(center_y[8] - y2, 2)) < 200 && touch[8] == false){
		touch[8] = true;
		touch2[8] = true;
		d[8] = Math.sqrt(Math.pow(center_x[8] - x2, 2) 
					+ Math.pow(center_y[8] - y2, 2));
		cos2[8] = Math.abs(center_x[8] - x2) / d[8];
		sin2[8] = Math.abs(center_y[8] - y2) / d[8];
		f = 1;
		t++;
	}
}

// 吸引物体
function backLinearMotion1(i) { 
	"use strict";
	
	context.save();
	if(touch2[i] == true && release == 2) {
		if(i < 3 || i == 7)
			obj_step = 1.5;
		else if(i == 9)
			obj_step = 2;
		else 
			obj_step = 1;
	}
	else {
		obj_step = 0;
	}
	
	if(Math.abs(x2 - center_x[i]) < 2) {
		cos2[i] = 0;
	}
	if(Math.abs(y2 - center_y[i]) < 2) {
		sin2[i] = 0;
	}
	
	if(touch2[i] == true && cos2[i] == 0 && sin2[i] == 0) {
		t--; 
	}
	
	if(x2 > center_x[i]) {
		loc_x[i] += obj_step * cos2[i];
		center_x[i] += obj_step * cos2[i];
	}
	else {
		loc_x[i] -= obj_step * cos2[i];
		center_x[i] -= obj_step * cos2[i];
	}
	
	if(y2 > center_y[i]) {
		loc_y[i] += obj_step * sin2[i];
		center_y[i] += obj_step * sin2[i];
	}
	else {
		loc_y[i] -= obj_step * sin2[i];
		center_y[i] -= obj_step * sin2[i];
	}
	
	if(i < 3)
    context.drawImage(CirclePop, loc_x[i], loc_y[i]);
    else if(i > 2 && i < 5)
    context.drawImage(HeartPop, loc_x[i], loc_y[i]);
    else if(i == 5)
    context.drawImage(frag1, loc_x[i], loc_y[i]);
    else if(i == 6)
    context.drawImage(frag2, loc_x[i], loc_y[i]);
    else if(i == 7)
    context.drawImage(frag3, loc_x[i], loc_y[i]);
    else if(i == 8)
    context.drawImage(frag4, loc_x[i], loc_y[i]);
    
	context.restore();
}

// 吸引物体动画
function animateLineBack1() {
	erase();
	draw();  // 画背景 
	
	drawBow();
	drawArrow();
	
	if(f == 0) { // 什么都没有
		release = 3;
		arrow_step = -1;
		cancelAnimationFrame(animateLineBack1);
	}
	
	else {
		for(i = 0; i < 9; i++) {
			backLinearMotion1(i);
		}
		if(t == 0) {
			release = 3;
			cancelAnimationFrame(animateLineBack1);
		}
		else {
			requestAnimationFrame(animateLineBack1);
			
		}
	}
}

// 物体被带回的直线运动(高级)
function backLinearMotion2(i) { 
	"use strict";
	
	context.save();
	if(touch2[i] == true && release == 3)
	obj_step = 1;
	else
	obj_step = 0;
	
	loc_x[i] += obj_step * Math.cos(angle);
	loc_y[i] += obj_step * Math.sin(angle);
	
	if(i < 3)
    context.drawImage(CirclePop, loc_x[i], loc_y[i]);
    else if(i > 2 && i < 5)
    context.drawImage(HeartPop, loc_x[i], loc_y[i]);
    else if(i == 5)
    context.drawImage(frag1, loc_x[i], loc_y[i]);
    else if(i == 6)
    context.drawImage(frag2, loc_x[i], loc_y[i]);
    else if(i == 7)
    context.drawImage(frag3, loc_x[i], loc_y[i]);
    else if(i == 8)
    context.drawImage(frag4, loc_x[i], loc_y[i]);
    
	context.restore();
}

// 箭 和 物体直线返回动画
function animateLineBack2() {
	erase();
	draw();  // 画背景 
	
	drawBow();
	leaveLinearMotion2();
	drawLine2();
	
	for(i = 0; i < 9 ; i++) {
		backLinearMotion2(i);
	}
	
	
	if(move2 <= arrow2.height) {
		draw();
    	drawBow();
    	drawArrow();
    	
    	calculateScore2();
    	
    	release = 0;
    	for(i = 0; i < 9; i++) {
    		if(touch2[i] == true) {
    			touch2[i] = false;
    			loc_x[i] = 0;
    			loc_y[i] = canvas.height;
    			center_x[i] = 0;
    			center_y[i] = canvas.height;
    		}
    	}
		cancelAnimationFrame(animateLineBack2);
	}
	
	else {
		requestAnimationFrame(animateLineBack2);
	}
	
	drawScore();
}

// 时光碎片数量.............................................
// 计算时光碎片的数量(高级)
function calculateScore2() {
	for(i = 0; i < 3; i++) {
		if(touch2[i] == true) {
			score -= 1;
		}
	}
	
	for(i = 3; i < 5; i++) {
		if(touch2[i] == true) {
			score -= 2;
		}
	}
	
	if(touch2[5] == true) {
		score += 2;
	}
	
	if(touch2[6] == true) {
		score += 2;
	}
	
	if(touch2[7] == true) {
		score += 1;
	}
	
	if(touch2[8] == true) {
		score += 2;
	}
}

// Event handlers................................................
background.onload = function (e) {
    "use strict";
    if(!start) {
    	init();
    	init2();
    	draw();
    	Help();
    	drawBow();
   		drawArrow();
   		drawScore();
   		
   		bg.play();
    }
};

// 开始游戏按钮
animateButton.onclick = function (e) {
    "use strict";
    
    if (!start) {
    	start = true;
        animateButton.value = '重新游戏';
        bg.play();
        
        if(start)
        	animateBowArrow(); 
    } 
    else if(start && release == 0){
    	start = false;
        animateButton.value = '开始游戏';
        init();
        init2();
        draw();
    	drawBow();
   		drawArrow();
   		drawScore();
   		happy.pause();
        sad.pause();
    }

};

// 键盘事件（任意键都可释放箭矢）
document.onkeyup = function (e) {
	
	if(start) {
		piu.play();
	}
	
    if (start && flag == 0 && release == 0) {
    	count++;
    	maxMove = canvas.width / 2 / Math.abs(Math.cos(angle));
    	move = arrow2.height;
    	release = 1;
    	
    	animateLineLeave();
    		
      	animateLineBack();
    } 
    
    else if(start && flag == 1 && release == 0) {
		count++;
    	move2 = arrow2.height;
    	release = 1;
    	
    	animateLineLeave2();
    	
    	transformCoord2();
    	isTouch2();
    	
		animateLineBack1();
    	
    	animateLineBack2();
    	
    }
}

// 选择弓的类型
type.onclick = function (e) {
	if(type.value == 'ordinary') {
		flag = 0;
	}
	else {
		flag = 1;
	}
}

// Initialization................................................
arrow1.src = './images/arrow1.png';
arrow2.src = './images/arrow2.png';
bow.src = './images/bow.png';
finalImage.src = './images/sad.jpg';


angle = Math.PI / 2;
angle_step = Math.PI / 360;

arrow_step = 2;
move = arrow2.height;

obj_step = 1;
t = 0;
f = 0;