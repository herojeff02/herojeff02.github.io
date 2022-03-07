let map;
let game_in_progress = true;
let first_click = true;
let flags;


let map_width = prompt("맵 너비");
let map_height = prompt("맵 높이");
let bomb_count = prompt("지뢰 수");

if(!map_width){map_width = 9;}
if(!map_height){map_height = 9;}
if(!bomb_count){bomb_count = 10;}
if(bomb_count >= map_height*map_width){bomb_count = map_height*map_width - 1;}

const Cell = class {
	constructor(x,y,bomb,flag,counter){
		this.x = x;
		this.y = y;
		this.bomb = bomb;
		this.flag = flag;
		this.isOpen = false;
		
		document.write("<button onclick='cell_click(" + x +","+ y + ");' oncontextmenu='cell_right_click(" + x +","+ y + ");return false;' id='button" + x +"_"+ y + "'></button>");
	}
	
	reveal(){
		this.isOpen = true;
		let k = "button" + this.x + "_" + this.y;
		
		if(this.bomb){
			document.getElementById(k).style.backgroundColor = "red";
		}
		else if(!this.flag){
			let a = cell_get_count(this.x, this.y);
			if (a){
				document.getElementById(k).innerHTML = a;
				document.getElementById(k).style.backgroundColor = "rgba(0,0,0,0.1)";
			}
			else{
				document.getElementById(k).style.backgroundColor = "rgba(0,0,0,0.2)";
			}
		}
	}
	
	end_reveal(){
		let k = "button" + this.x + "_" + this.y;
		if(this.bomb && this.flag){
			document.getElementById(k).style.backgroundColor = "#660000";
			document.getElementById(k).style.color = "white";
			this.isOpen = true;
		}
		else if (this.bomb){
			document.getElementById(k).style.backgroundColor = "red";
		}
	}
	
	relay(stop, origin_x, origin_y){
		this.reveal();
		if(!stop){
			if(this.y>0 && !cell(this.x, this.y-1).isOpen){
				cell(this.x, this.y-1).relay(stop = !cell_get_count(this.x, this.y-1) == 0, origin_x, origin_y);
			}
			if(this.y<map_height-1 && !cell(this.x, this.y+1).isOpen){
				cell(this.x, this.y+1).relay(stop = !cell_get_count(this.x, this.y+1) == 0, origin_x, origin_y);
			}
			if(this.x>0 && !cell(this.x-1, this.y).isOpen){
				cell(this.x-1, this.y).relay(stop = !cell_get_count(this.x-1, this.y) == 0, origin_x, origin_y);
			}
			if(this.x<map_width-1 && !cell(this.x+1, this.y).isOpen){
				cell(this.x+1, this.y).relay(stop = !cell_get_count(this.x+1, this.y) == 0, origin_x, origin_y);
			}
			
			if(this.x>0 && this.y>0 && !cell(this.x-1, this.y-1).isOpen){
				cell(this.x-1, this.y-1).relay(stop = !cell_get_count(this.x-1, this.y-1) == 0, origin_x, origin_y);
			}
			if(this.x>0 && this.y<map_height-1 && !cell(this.x-1, this.y+1).isOpen){
				cell(this.x-1, this.y+1).relay(stop = !cell_get_count(this.x-1, this.y+1) == 0, origin_x, origin_y);
			}
			if(this.x<map_width-1 && this.y>0 && !cell(this.x+1, this.y-1).isOpen){
				cell(this.x+1, this.y-1).relay(stop = !cell_get_count(this.x+1, this.y-1) == 0, origin_x, origin_y);
			}
			if(this.x<map_width-1 && this.y<map_height-1 && !cell(this.x+1, this.y+1).isOpen){
				cell(this.x+1, this.y+1).relay(stop = !cell_get_count(this.x+1, this.y+1) == 0, origin_x, origin_y);
			}
		}
	}
	
	toggle_flag(){
		if(!this.isOpen){
			let k = "button" + this.x + "_" + this.y;
			if(true){
				this.flag = !this.flag;
				if(this.flag){
					flags++;
					document.getElementById(k).innerHTML = "!";
					document.getElementById(k).style.backgroundColor = "#00E577";
				}
				else{
					flags--;
					document.getElementById(k).innerHTML = "";
					document.getElementById(k).style.backgroundColor = "white";
				}
			}
			else{
				if(this.flag){
					this.flag = !this.flag;
					flags--;
					document.getElementById(k).innerHTML = "";
					document.getElementById(k).style.backgroundColor = "white";
				}
			}
		}
	}
}

function game_start(){
	document.write('<link rel="stylesheet" type="text/css" href="./minesweeper.css"></link><h1>MineSweeper</h1>');

	document.write("<div id='wallpaper'></div>");
	document.write('<button id="new_game" onclick="new_game();">다시 하기</button>');
	document.write("<div id='bomb_stat'>0 / " + bomb_count + "</div>");
	document.write("<div id='card'>");
	map_init();
	document.write("</div>");
	game_in_progress = true;
	first_click = true;
	flags = 0;

	document.getElementById("row").style.width = map_width*27;
	document.getElementById("card").style.width = map_width*27+50;
	document.getElementById("card").style.height = map_width*27+60;
	set_wallpaper();
}
function game_end(status){
	game_in_progress = false;
	switch(status){
		case 0:
			alert("승리의 비결이 뭡니까? 지뢰.");
			break;
		case 1:
			alert("Too bad!");
			break;
		default:
			break;
	}
	for(let i=0;i<map_height;i++){
		for(let j=0;j<map_width;j++){
			cell(j,i).end_reveal();
		}
	}
}
function new_game(){
	document.body.innerHTML = '';
	game_start();
}
function map_init(){
	map = new Array(map_height);
	document.write("<div id='map' oncontextmenu='return false;'>");
	for(let i=0;i<map_height;i++){
		document.write("<div id='row'>");
		map[i] = new Array(map_width);
		for(let j=0;j<map_width;j++){
			//let cell =  new Cell(j,i,0,0,0);
			map[i][j] = new Cell(j,i,0,0,0);
		}
		document.write("</div>");
	}
	document.write("</div>");
	
	for(let i=0;i<bomb_count;i++){
		let x=Math.random()*map_width;
		let y=Math.random()*map_height;
		x -= x%1;
		y -= y%1;
		
		if(cell(x,y).bomb){
			i-=1;
		}
		else{
			cell(x,y).bomb = 1;
		}
	}
	// alert(Math.random());
}
function first_gone_wrong(x,y){
	cell(x,y).bomb = 0;
	
	for(let i=0;i<50;i++){
		let ax=Math.random()*map_width;
		let ay=Math.random()*map_height;
		ax -= ax%1;
		ay -= ay%1;
		
		if(cell(ax,ay).bomb == 0 && ax!=x && ay!=y){
			cell(ax,ay).bomb = 1;
			return;
		}
	}
	for(let i=0;i<map_height;i++){
		for(let j=0;j<map_width;j++){
			if(cell(j,i).bomb == 0 && j!=x && i!=y){
				cell(j,i).bomb = 1;
				return;
			}
		}
	}
}
function check_game_status(){
	let counter = 0, naive_counter = 0;
	for(let i=0;i<map_height;i++){
		for(let j=0;j<map_width;j++){
			if(cell(j,i).flag == 1){
				if(cell(j,i).bomb == 1){
					counter++;
				}
				naive_counter++;
			}
		}
	}
	document.getElementById("bomb_stat").innerHTML = naive_counter + " / " + bomb_count;
	if(counter == bomb_count && naive_counter == counter){
		game_end(0);
	}
}
function cell_click(x, y){
	if(game_in_progress && !cell(x,y).isOpen){
		if(first_click){
			if(cell(x, y).bomb){
				first_gone_wrong(x,y);
			}
			first_click = false;
		}
		
		if(cell(x,y).flag){
			
		}
		else if(cell(x, y).bomb){
			cell(x,y).reveal();
			game_end(1);
		}
		else if(cell_get_count(x,y) == 0){
			cell(x,y).relay(false, x, y);
		}
		else{
			cell(x,y).reveal();
		}
	}
	check_game_status();
}
function cell_right_click(x,y){
	if(game_in_progress){
		cell(x,y).toggle_flag();
		check_game_status();
	}
}
function cell_get_count(x, y){
	let l=true,r=true,t=true,b=true;
	if(x==0){
		l = false;
	}
	if(x==map_width-1){
		r = false;
	}
	if(y==0){
		t = false;
	}
	if(y==map_height-1){
		b = false;
	}
	
	let cnt = 0;
	if(l){cnt+=cell(x-1,y).bomb};
	if(r){cnt+=cell(x+1,y).bomb};
	if(t){cnt+=cell(x,y-1).bomb};
	if(b){cnt+=cell(x,y+1).bomb};
	if(l&&t){cnt+=cell(x-1,y-1).bomb};
	if(l&&b){cnt+=cell(x-1,y+1).bomb};
	if(r&&t){cnt+=cell(x+1,y-1).bomb};
	if(r&&b){cnt+=cell(x+1,y+1).bomb};
	return cnt;
}
function cell(x, y){
	return map[y][x];
}

setTimeout(game_start, 100)