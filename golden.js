// set random body background pattern
function set_wallpaper() {
    const wallpapers = ["science.jpg", "a.jpg", "aa.png", "ab.png", "ac.png", "ae.jpg", "ah.png", "ai.png", "aj.png", "ak.png", "am.jpg", "ao.gif", "ap.jpg", "at.png", "au.jpg", "aw.png", "ax.jpg", "ay.jpg", "b.jpg", "bb.jpg", "bc.png", "d.png", "e.png", "g.gif", "i.jpg", "j.jpg", "logo.png", "n.jpg", "p.gif", "q.png", "r.png", "s.png", "t.gif", "title-mask.png", "v.png", "w.png", "u.png", "x.png", "y.png", "z.png"];
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
    let auxclick = "window.open('" + url + "', '_blank');";
    auxclick = '"' + auxclick + '"';
    var element = $("<li onauxclick=" + auxclick + ">" + image + "</li>");
    $("#menuContainer").append(element);
    var newItemConfig = {
        title: title,
        type: "component",
        componentName: "webbox",
        componentState: {
            url: url
        }
    };
    element.click(function() {
        myLayout.root.contentItems[0].addChild(newItemConfig);
    });

    //mobile
    $("#mobile-menuContainer")[0].innerHTML += '<li onclick="mobile_load_page(`'+url+'`);">'+title+image+'</li>';
};

$(window).resize(function () {
    myLayout.updateSize("100%", "100%");
});

// myLayout.on( 'stateChanged', function(){
// });
addMenuItem("Test", "http://aim5.iptime.org:8080", `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M114.66667,22.93333c-7.41411,0 -13.73214,4.83131 -16.125,11.46667h-75.60833c-2.06765,-0.02924 -3.99087,1.05709 -5.03322,2.843c-1.04236,1.78592 -1.04236,3.99474 0,5.78066c1.04236,1.78592 2.96558,2.87225 5.03322,2.843h75.60833c2.39286,6.63536 8.71089,11.46667 16.125,11.46667c7.41411,0 13.73214,-4.83131 16.125,-11.46667h18.275c2.06765,0.02924 3.99087,-1.05709 5.03322,-2.843c1.04236,-1.78592 1.04236,-3.99474 0,-5.78066c-1.04236,-1.78592 -2.96558,-2.87225 -5.03322,-2.843h-18.275c-2.39286,-6.63536 -8.71089,-11.46667 -16.125,-11.46667zM114.66667,34.4c3.11796,0 5.49498,2.34385 5.66614,5.40859c-0.0127,0.22004 -0.0127,0.44063 0,0.66068c-0.17655,3.05911 -2.55204,5.3974 -5.66614,5.3974c-3.11796,0 -5.49498,-2.34385 -5.66614,-5.40859c0.0127,-0.22004 0.0127,-0.44063 0,-0.66068c0.17655,-3.05911 2.55204,-5.3974 5.66614,-5.3974zM68.8,68.8c-7.41411,0 -13.73214,4.83131 -16.125,11.46667h-29.74167c-2.06765,-0.02924 -3.99087,1.05709 -5.03322,2.843c-1.04236,1.78592 -1.04236,3.99474 0,5.78066c1.04236,1.78592 2.96558,2.87225 5.03322,2.843h29.74167c2.39286,6.63536 8.71089,11.46667 16.125,11.46667c7.41411,0 13.73214,-4.83131 16.125,-11.46667h64.14167c2.06765,0.02924 3.99087,-1.05709 5.03322,-2.843c1.04236,-1.78592 1.04236,-3.99474 0,-5.78066c-1.04236,-1.78592 -2.96558,-2.87225 -5.03322,-2.843h-64.14167c-2.39286,-6.63536 -8.71089,-11.46667 -16.125,-11.46667zM68.8,80.26667c3.11796,0 5.49498,2.34386 5.66614,5.40859c-0.0127,0.22004 -0.0127,0.44064 0,0.66068c-0.17655,3.05911 -2.55204,5.39739 -5.66614,5.39739c-3.11796,0 -5.49498,-2.34386 -5.66614,-5.40859c0.0127,-0.22004 0.0127,-0.44064 0,-0.66068c0.17655,-3.05911 2.55204,-5.39739 5.66614,-5.39739zM91.73333,114.66667c-7.41411,0 -13.73214,4.83131 -16.125,11.46667h-52.675c-2.06765,-0.02924 -3.99087,1.05709 -5.03322,2.843c-1.04236,1.78592 -1.04236,3.99474 0,5.78066c1.04236,1.78592 2.96558,2.87225 5.03322,2.843h52.675c2.39286,6.63536 8.71089,11.46667 16.125,11.46667c7.41411,0 13.73214,-4.83131 16.125,-11.46667h41.20833c2.06765,0.02924 3.99087,-1.05709 5.03322,-2.843c1.04236,-1.78592 1.04236,-3.99474 0,-5.78066c-1.04236,-1.78592 -2.96558,-2.87225 -5.03322,-2.843h-41.20833c-2.39286,-6.63536 -8.71089,-11.46667 -16.125,-11.46667zM91.73333,126.13333c3.11796,0 5.49498,2.34386 5.66614,5.40859c-0.0127,0.22004 -0.0127,0.44064 0,0.66068c-0.17655,3.05911 -2.55204,5.39739 -5.66614,5.39739c-3.11796,0 -5.49498,-2.34386 -5.66614,-5.40859c0.0127,-0.22004 0.0127,-0.44064 0,-0.66068c0.17655,-3.05911 2.55204,-5.39739 5.66614,-5.39739z"></path></g></g></svg>`);