// start play and pause coding
var play_icon = document.getElementById("play-icon");
play_icon.onclick = function()
{
	var video = document.getElementById("video");
	if(this.className === "fa fa-play")
	{
		video.play();
		this.className = "fa fa-pause";
		this.title = "Pause";
	}
	else{
		video.pause();
		this.className = "fa fa-play";
		this.title = "Play";
	}
};

// video progress coding
	 
var video = document.getElementById("video");
video.ontimeupdate = function()
{
	var progress = document.getElementById("progress");
	var time = (100/this.duration)*this.currentTime; // replace keyword this to variable name "video" no problems. "this.duration" return full length of video.
	progress.style.width = time+"%";
	video.onended = function() // onended means video fully end then what should be perform.
	{
	if(video.currentTime === video.duration) // "video.duration" means full duration of video because "duration" keyword return full duration of video.
	{
		play_icon.className = "fa fa-play";
		play_icon.title = "Play";
	}
	else{
		play_icon.className = "fa fa-pause";
		play_icon.title = "Pause";
	}
}
};

// fullscreen coding

var fullscreen = document.getElementById("dc-icon");
fullscreen.onclick = function()
{
	if(video.requestFullscreen)
	{
		video.requestFullscreen();
	}
	else if(video.webkitRequestFullscreen) // lower version browser coding.
	{
		video.webkitRequestFullscreen();
	}
	else if(video.mozRequestFullscreen)
	{
		video.mozRequestFullscreen();
	}
	else if(video.msRequestFullscreen) // internet explorer.
	{
		video.msRequestFullscreen();
	}
};

// stop icon coding
var stop_icon = document.getElementById("stop-icon");
stop_icon.onclick = function()
{
	video.currentTime = 0;
	video.pause();
	play_icon.className = "fa fa-play";
};

// start video replay coding
var replay_icon = document.getElementById("repeat-icon");
replay_icon.onclick = function()
{
	video.currentTime = 0;
	video.play();
};

var v_icon = document.getElementById("volume-icon");
v_icon.onclick = function()
{
	var show_slider = document.getElementById("volume-slider");
	if(show_slider.style.display==="none")
	{
		show_slider.style.display = "block";
		show_slider.oninput = function() // here oninput means volume increase or decrease.
		{
			video.volume = this.value; // volume is a properties.	
			if(this.value<=0)
			{
				v_icon.className = "fa fa-volume-off";
				v_icon.title = this.value*100+"%";
			}
			else{
				v_icon.className = "fa fa-volume-up";
				v_icon.title = this.value*100+"%";
			}
		}
	}
	else{
		show_slider.style.display = "none";
	}
};

// start forward and backword progress bar coding

var progress_bar = document.getElementById("progress-bar")
progress_bar.onclick = function(mevent) // that means "mouse-event" write any name no problems. important notes are "mevent" is a variable function ke parameters me agar koi value write hoit hai to vah ek variable hota hai.
{
	var percent = mevent.offsetX/this.offsetWidth; //"offsetWidth" means total width of an element.
	video.currentTime = percent*video.duration; // here is "video" global variable.
};

// start video download coding
var d_icon = document.getElementById("download");
d_icon.onclick = function()
{
	var video_src = document.getElementById("video-source").src;
	var a_tag = document.createElement("A");
	a_tag.href = video_src;
	a_tag.download = video_src;
	document.body.appendChild(a_tag);
	a_tag.click();
};

// start setting coding
var setting_icon = document.getElementById("gear")
setting_icon.onclick = function()
{
	var setting_toggle = document.getElementById("setting-div");
	if(setting_toggle.offsetHeight===0)
	{	
		setting_toggle.style.display = "block";
		setting_toggle.style.height = "250px";
		setting_toggle.style.webkitTransition = "0.5s";
	}
	else{
		setting_toggle.style.display = "none";
		setting_toggle.style.height = "0px";
		setting_toggle.style.webkitTransition = "0.5s";
	}

	// control video speed coding
	var video_slider = document.getElementById("speed-slider")
	video_slider.oninput = function()
	{
		var show_speed = video.playbackRate =  this.value;
		var Speed = document.getElementById("speed");
		Speed.innerHTML = show_speed;
	}

	// start video reset coding
	var reset_speed = document.getElementById("reset");
	reset_speed.onclick = function()
	{
		video.playbackRate = 1;
		document.getElementById("speed").innerHTML = 1;
		video_slider.value = 1;
	}
};

// start video buffering coding
video.onprogress = function()
{
	var percent = (this.buffered.end(0)/this.duration)*100;
	var buffer = document.getElementById("buffer-progress").style.width = percent+'%';
	buffer.style.width = percent+'%';
};

// strat mini player video coding
var mini_player = document.getElementById("miniplayer-icon");
mini_player.onclick = function()
{
	video.pause();
	var Pause = document.getElementById("play-icon");
	Pause.className = "fa fa-play";
	var Hide = document.getElementById("main-div");
	Hide.style.display = "none";
	var show_miniplayer = document.getElementById("miniplayer");
	show_miniplayer.style.display = "block";
	var large_video_src = document.getElementById("lv-source").src;
	var large_video_ctime = video.currentTime;
	var mini_video = document.getElementById("mini-video");
	mini_video.src = large_video_src;
	mini_video.currentTime = large_video_ctime;
	mini_video.play();
	var show_large = document.getElementById("close-icon");
	show_large.onclick = function()
	{
		document.getElementById("miniplayer").style.display = "none";
		document.getElementById("main-div").style.display = "block";
		var ctime_mini_video = document.getElementById("mini-video").currentTime;
		video.currentTime = ctime_mini_video;
		Pause.className = "fa fa-pause";
		document.getElementById("setting-div").style.display = "none";
		video.play();
	}
};

// start container theme coding
var container_theme = document.getElementById("container-theme");
container_theme.onchange = function()
{
	var Header = document.getElementById("header");
	var Footer = document.getElementById("foot");
	Header.style.backgroundColor = this.value;
	Footer.style.backgroundColor = this.value;
	var color = this.value;
	localStorage.setItem("con_theme",color);
};

// start icon theme coding
var icon_theme = document.getElementById("icon-theme");
icon_theme.onchange = function()
{
	var icon_color_change = document.getElementById("icon-div-left");
	var color = this.value;
	var i_tag = icon_color_change.getElementsByTagName("I"); // important terms only element select in "icon_color_change" parent element.
	var i;
	for(i=0; i<i_tag.length; i++)
	{
		i_tag[i].style.color = this.value;
	}
	localStorage.setItem("icon_theme",color);
};

// start active theme coding
function active_theme()
{	
	var color = [localStorage.getItem("con_theme"),localStorage.getItem("icon_theme")]; // array
	var Header = document.getElementById("header");
	var Footer = document.getElementById("foot");
	Header.style.backgroundColor = color[0];
	Footer.style.backgroundColor = color[0];
	var icon_color_change = document.getElementById("icon-div-left");
	var i_tag = icon_color_change.getElementsByTagName("I"); // important terms only element select in "icon_color_change" parent element.
	var i;
	for(i=0; i<i_tag.length; i++)
	{
		i_tag[i].style.color = color[1];
	}
};

active_theme();
