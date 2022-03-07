//settings
const fps = 60;
const speedMutiplier = 1.4;
const brightness = 200;

//vars
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let object = document.getElementById("object");
let objectWidth = 0;
let objectHeight = 0;
let posLeft=0;
let posTop=0;
let dirRight = true;
let dirDown = true;
let mainInterval = 0;

function move(){
	if(posLeft + speedMutiplier > windowWidth - objectWidth){
		dirRight = false;
		colorShift();
	}
	else if(posLeft - speedMutiplier < 0){
		dirRight = true;
		colorShift();
	}
	if(posTop + speedMutiplier > windowHeight - objectHeight){
		dirDown = false;
		colorShift();
	}
	else if(posTop - speedMutiplier < 0){
		dirDown = true;
		colorShift();
	}

	if(dirDown){
		posTop+=speedMutiplier;
	}
	else{
		posTop-=speedMutiplier;
	}
	if(dirRight){
		posLeft+=speedMutiplier;
	}
	else{
		posLeft-=speedMutiplier;
	}
	setPosition();
}
function setPosition(){
	object.style.left = posLeft + 'px';
	object.style.top = posTop + 'px';
}

function colorShift(){
	let r=parseInt(Math.random()*256);
	let g=parseInt(Math.random()*256);
	let b=parseInt(Math.random()*256);
	if(r+g+b < brightness){
		let k = brightness/(r+g+b);
		r*=k;
		g*=k;
		b*=k;
	}
	object.style.fill="rgb("+r+","+g+","+b+")";
	console.log(object.style.fill);
}

function init(){
	mainInterval = setInterval(move, 1000/fps);

	$("#object").animate({'opacity':'1'},500,()=>{
		objectWidth = object.width.animVal.value;
		objectHeight = object.height.animVal.value;
		});

	setInterval(()=>{navigator.wakeLock.request('screen');}, 100000);

}init();

$(window).resize(()=>{
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	});
