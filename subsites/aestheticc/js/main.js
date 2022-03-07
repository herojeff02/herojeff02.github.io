var timeElement = document.getElementById("time_counter");
var globalInterval = 0;

function zeroFill2(num){
	if(num<10){
		return "0" + num;
	}
	return num;
}

function setDate(){
	let today = new Date();
	let year = today.getYear() + 1900;
	let month = zeroFill2(today.getMonth() + 1);
	let date = zeroFill2(today.getDate());
	let hour = zeroFill2(today.getHours());
	let minute = zeroFill2(today.getMinutes());
	let second = zeroFill2(today.getSeconds());

	timeElement.innerText = year+"/"+month+"/"+date+"  "+hour+":"+minute+":"+second;
}

function requestFullscreen(){
	 document.documentElement.requestFullscreen();
}

function removeFullscreenButton(){

}
function displayFullscreenButton(){

}

function init(){
	setDate();
	globalInterval = setInterval(setDate, 250);
	draw();
	$(window).resize(()=>{
		if(document.fullscreenEnabled){
			removeFullscreenButton();
		}
		else{
			displayFullscreenButton();
			requestFullscreen();
		}
		redraw();
	});
	setInterval(redraw, REDRAW_INTERVAL);
	setInterval(()=>{navigator.wakeLock.request('screen');}, 100000);

}init();
