// set random body background pattern
function set_wallpaper() {
    const wallpapers = ["a.jpg", "aa.png", "ab.png", "ac.png", "ae.jpg", "ah.png", "ai.png", "aj.png", "ak.png", "am.jpg", "ao.gif", "ap.jpg", "at.png", "au.jpg", "aw.png", "ax.jpg", "ay.jpg", "b.jpg", "bb.jpg", "bc.png", "d.png", "e.png", "g.gif", "i.jpg", "j.jpg", "logo.png", "n.jpg", "p.gif", "q.png", "r.png", "s.png", "t.gif", "title-mask.png", "v.png", "w.png", "u.png", "x.png", "y.png", "z.png"];
    const wallpaper_selection = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    const wallpaper_prefix = "http://thepatternlibrary.com/img/";
    const wallpaper_url = wallpaper_prefix.concat(wallpaper_selection);

    let wallpaper_image = new Image();
    let wallpaper_style = "linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7) ), url('";
    wallpaper_style = wallpaper_style.concat(wallpaper_url, "')");
    document.getElementById("wallpaper").style.background = wallpaper_style;
    document.getElementById("wallpaper").style.opacity = 0;
    document.getElementById("wallpaper").style.height = "75%";
    wallpaper_image.onload = function() {
        let wallpaper = $("#wallpaper");
        wallpaper.animate({
            height: "100%"
        }, {
            duration: 600,
            queue: false
        });
        wallpaper.animate({
            opacity: 1
        }, {
            duration: 1000
        });
        // $("#wallpaper").animate({opacity: 1, height:"100%"}, 1000);
    }
    wallpaper_image.src = wallpaper_url;
}
function new_wallpaper() {
    $("#wallpaper").animate({
        opacity: 0,
        height: "30%"
    }, 200, function() {
        set_wallpaper();
    });
}
function hide_wallpaper(hide){
    if(hide){
        $("#wallpaper").animate({
            opacity: 0
        }, {
            duration: 400
        });
    }
    else{
        $("#wallpaper").animate({
            opacity: 1
        }, {
            duration: 400
        });
    }
}

let mobile_layout_open = false;
set_wallpaper();

// is viewport mobile
const desktop_width = 550;
let was_desktop = $(window).width() <= desktop_width; //set to false for first execution
function set_environment(){
    if ($(window).width() <= desktop_width && was_desktop) {
        was_desktop = false;
        // alert("going mobile");
        document.getElementById("mobile-wrapper").style.opacity = "0";
        document.getElementById("mobile-wrapper").style.display = "block";
        $("#mobile-wrapper").animate({opacity:"1"},200);
        
        document.getElementById("wrapper").style.opacity = "1";
        $("#wrapper").animate({opacity:"0"},200, () => {
            document.getElementById("wrapper").style.display = "none";});

        hide_wallpaper(mobile_layout_open);
    }
    else if($(window).width() > desktop_width && !was_desktop){
        was_desktop = true;
        // alert("going desktop");
        hide_wallpaper(false);
        document.getElementById("wrapper").style.opacity = "0";
        document.getElementById("wrapper").style.display = "block";
        $("#wrapper").animate({opacity:"1"},200);
        
        document.getElementById("mobile-wrapper").style.opacity = "1";
        $("#mobile-wrapper").animate({opacity:"0"},200, () => {
            document.getElementById("mobile-wrapper").style.display = "none";});
    }
}
//$(window).on("resize", set_environment);
set_environment();

// mobile - load page
let layout_container_auto_height;
let layout_container_auto_width;
function mobile_load_page(src){
    //set mobile iframe src
    document.getElementById("mobile-iframe").src = src;
    mobile_animate_iframe(false)
}

function mobile_close_page(){
    mobile_animate_iframe(true)
}

function mobile_animate_iframe(minimize){
    if (!minimize) {
        //change ease
        let layoutContainer = $("#mobile-layoutContainer");
        layout_container_auto_height = layoutContainer.height();
        layout_container_auto_width = layoutContainer.width();
        layoutContainer.animate({"height":"100%", "width":"100%", "border-radius":"1em", "bottom":"0", "left":"0"},300);
        hide_wallpaper(true);
        $("#mobile-menuContainer").animate({"opacity":"0"},300, () => {
            document.getElementById("mobile-menuContainer").style.display = "none";
        });
        //$("#mobile-close-button").animate({"height":"4.5em"},300);

        document.getElementById('mobile-iframe').style.display = "block";
        $('#mobile-iframe').animate({"opacity": "1"}, 300);
        $("#mobile-close-button").animate({"height": "4.5em"}, 300);
        $("#mobile-close-button-svg").animate({"opacity": "1"}, 500);
        $("#mobile-new-wall").animate({"top": "-100px"}, 300);
        mobile_layout_open = true;
    }
    else{
        $("#mobile-layoutContainer").animate({"height":layout_container_auto_height, "width":layout_container_auto_width, "border-radius":"2.06em", "bottom":"22px", "left":"6px"},300);//2.38em when no margin
        hide_wallpaper(false);
        $("#mobile-iframe").animate({"opacity": "0"}, 300, () => {
            document.getElementById('mobile-iframe').style.display = "none";
            document.getElementById('mobile-iframe').src=""
        });
        document.getElementById("mobile-menuContainer").style.display = "block";
        $("#mobile-menuContainer").animate({"opacity":"1"},300);
        $("#mobile-close-button").animate({"height":"0"},300);
        $("#mobile-close-button-svg").animate({"opacity":"0"},200);
        $("#mobile-new-wall").animate({"top": "0"}, 300);

        mobile_layout_open = false;
    }
}



// http://golden-layout.com/tutorials/getting-started.html
var config = {
    settings: {
        hasHeaders: true,
        constrainDragToContainer: true,
        reorderEnabled: true,
        selectionEnabled: false,
        popoutWholeStack: false,
        blockedPopoutsThrowError: true,
        closePopoutsOnUnload: true,
        showPopoutIcon: true,
        showMaximiseIcon: false,
        showCloseIcon: true
    },
    dimensions: {
        borderWidth: 5,
        minItemHeight: 10,
        minItemWidth: 10,
        headerHeight: 30,
    },
    content: [{
        type: "row",
        isClosable: false,
        id: "no-drop-target",
        // 빈 공간이 생기는 이유? 다 지우면 myLayout.root.contentItems.length가 0이 됨
        height: 0,
        width: 0
    }]
};

var myLayout = new GoldenLayout(config,$("#layoutContainer"));
myLayout.registerComponent("webbox", function(container, state) {
    container.getElement().html('<iframe src="' + state.url + '"/>');
});

myLayout.init();

var addMenuItem = function(title, url, image) {
    //desktop
    let img = document.createElement("img");
    img.src = image;
    let element = document.createElement("li");
    element.onauxclick = ()=>{window.open(url, "_blank");};
    element.append(img);

    $("#menuContainer").append(element);
    var newItemConfig = {
        title: title,
        type: "component",
        componentName: "webbox",
        componentState: {
            url: url
        }
    };
    element.onclick = ()=>{
        myLayout.root.contentItems[0].addChild(newItemConfig);
        myLayout.root.contentItems[0].oncontextmenu = () => {return false;};
    };

    //mobile
    let img2 = document.createElement("img");
    img2.src = image;
    let li = document.createElement("li");
    li.onclick = ()=>{mobile_load_page(url)}
    li.innerHTML = title
    li.append(img2);
    $("#mobile-menuContainer")[0].append(li);
};


$(window).resize(function () {
    myLayout.updateSize("100%", "100%");
});

// myLayout.on( 'stateChanged', function(){
// });






////////////////
addMenuItem("Aestheticc", "./subsites/aestheticc/index.html", `./images/dvd.svg`);
addMenuItem("DVD", "./subsites/dvd/index.html", "./images/aestheticc.svg");
addMenuItem("MineSweeper", "./subsites/minesweeper/index.html", "./images/minesweeper.svg");