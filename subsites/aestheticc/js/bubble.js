var bubbleContainer = document.getElementById("bubble_container");
var pulseIntervalList = [];

const Bubble = class{
	constructor(x,y,r,r_init,interval,color,delay){
		this.x = x;
		this.y = y;
		this.r = r;
		this.r_init = r_init;
		this.interval = interval;
		this.div = document.createElement("div");
		this.div.class = "bubble";
		this.div.style = `
			background: `+color+`;
			position: absolute;
			top: `+(y-r_init*0.8)+`px;
			left: `+(x-r_init*0.8)+`px;
			height: `+r_init*1.6+`px;
			width: `+r_init*1.6+`px;
			border-radius: `+100+`px;
			opacity: 0;
		`;
		bubbleContainer.appendChild(this.div);
		$(this.div).delay(delay).animate({'opacity':'1', "width": r_init*2 + "px", "height": r_init*2 + "px", "top": (y-r_init)+"px", "left": (x-r_init)+"px"}, 200, ()=>{
			pulseIntervalList.push(setInterval(()=>{
				let min = this.r;
				let max = new Date()%BUBBLE_MAX_R+BUBBLE_MIN_R;
				$(this.div).animate({"width": min*2 + "px", "height": min*2 + "px", "top": (this.y-min)+"px", "left": (this.x-min)+"px"}, DUR_DEFLATE, ()=>{
					$(this.div).animate({"width": max*2 + "px", "height": max*2 + "px", "top": (this.y-max)+"px", "left": (this.x-max)+"px"}, DUR_INFLATE);
				});
			}, this.interval));
		});
	}
}

function draw(){
	const WIDTH = window.innerWidth - PADDING_LR*2;
	const HEIGHT = window.innerHeight - 90;
	const HOR_COUNT = parseInt(WIDTH/SPACING)
	const LEFT_FIRST_SPACING = ((WIDTH - HOR_COUNT*SPACING) + SPACING)/2 + PADDING_LR;
	const VERT_COUNT = parseInt(HEIGHT/SPACING)
	const TOP_FIRST_SPACING = ((HEIGHT - VERT_COUNT*SPACING) + SPACING)/2 + 70;

console.log(HOR_COUNT*VERT_COUNT);

	for(let i=0;i<HOR_COUNT;i++){
		for(let j=0;j<VERT_COUNT;j++){
			let color = COLOR_1;
			if(Math.random() > 0.9){
				color = COLOR_2;
			}
			let r_init = ((1+i)*(1+j)*new Date())%BUBBLE_MAX_R+BUBBLE_MIN_R;
			new Bubble(SPACING*i+LEFT_FIRST_SPACING,SPACING*j+TOP_FIRST_SPACING,BUBBLE_MIN_R,r_init,INTERVAL,color,DELAY_MULTIPLIER*(i*DELAY_X_WISE+j*DELAY_Y_WISE+1)/(DELAY_X_WISE+DELAY_Y_WISE));
		}
	}
}

function redraw(){
	$(bubbleContainer).stop().animate({'opacity':'0'}, 300, ()=>{
		bubbleContainer.innerHTML = "";
		bubbleContainer.style["opacity"] = 1;
		pulseIntervalList.forEach((el)=>{
			clearInterval(el);
		});
		pulseIntervalList = [];
		draw();
	});
}
