// 报名网页地址
var recruitPath = '';

var nickname = document.getElementById('name');
var tone = document.getElementById('tone');
var hearts = [
	document.getElementById('heart1'),
	document.getElementById('heart2'),
	document.getElementById('heart3'),
	document.getElementById('heart4'),
	document.getElementById('heart5')
];

var desc = document.getElementById('desc');
var player = document.getElementById('play-button');
/*
var voice = document.getElementById('voice');
var pointer = document.getElementById('pointer');
*/
//var save = document.getElementById('save');
var progressCtl = document.getElementById('progress-controller');

var bottom = document.getElementById('bottom2');

var centerer = document.getElementById('centerer');
var alertMsg = document.getElementById('alertMsg');

var screenshotShow = document.getElementById('screenshotShow');
var screenshot = document.getElementById('screenshot');

var main = document.getElementById('main');

var heartPath = ["img/heartOff.png","img/heartOn.png"];
var voiceUrl = undefined;

var voicePlayer = null;
var voicePlaying = false;

var shotting = false;
var shotIndex = 0;
var screenshoted = false;

function init () {
    var now = new Date();
    cookieCheck();
    initData();
	initVoicePlayer();
    initEvents();
    if(now<startDate) return showAlert('活动未开始！');
    if(now>endDate) return showAlert('活动已结束！');
}
function cookieCheck(){
    if(getCookie('emcee_name') && getCookie('emcee_tone') &&
        getCookie('emcee_description') && getCookie('emcee_stars') &&
        getCookie('emcee_voice_url')) return;
    window.location.replace("index.html");
}
function initData () {
	nickname.innerHTML = getCookie('emcee_name');
	tone.innerHTML = getCookie('emcee_tone');
	desc.innerHTML = getCookie('emcee_description');
	voiceUrl = getCookie('emcee_voice_url');
	var heart = Number(getCookie('emcee_stars'));
	for(var i in hearts)
		hearts[i].src = heartPath[(i<heart)?1:0];
}
function initEvents () {
    initPlayer();
    initOthers();
}
function initOthers () {
    main.addEventListener('pointerdown', onTouchStart);
    main.addEventListener('pointerup', onTouchEnd);    
    main.oncontextmenu = function(){return false;}

    progressCtl.addEventListener('pointerdown',onBottomFieldTouchStart);
    progressCtl.addEventListener('pointerup',onBottomFieldTouchEnd);

    screenshotShow.addEventListener('click', hideScreenshot);
    centerer.addEventListener('click', hideAlert);

    bottom.addEventListener('click',gotoRecruit);
}
// 报名按钮
function gotoRecruit () {
    window.location.replace(recruitPath);
}
function onBottomFieldTouchStart(event) {
    event.stopPropagation();
}
function onBottomFieldTouchEnd(event) {
    event.stopPropagation();
}

function initVoicePlayer () {
	voicePlayer = document.createElement("audio");
	voicePlayer.autoplay = false;
	voicePlayer.src = voiceUrl;
	voicePlayer.addEventListener('ended', pause);
	//document.body.appendChild(voicePlayer);
}
function onVoicePlay () {
    voicePlaying ? pause() : play();
}
function play() {
	voicePlaying = true;	
    player.src = "img/playButtonPlaying.png";
    playVoice();
    /*
	rotatePointer();
	setTimeout(activeVoiceRotate,100);
	setTimeout(playVoice,100);*/
}
function pause() {
	voicePlaying = false;
    player.src = "img/playButtonPause.png";
    /*
	stopPointer();
	deactiveVoiceRotate();*/
	pauseVoice();
}
function rotatePointer () {
    pointer.style.animationName = 'pointerRotate';
    pointer.style.animationDuration = '0.1s';
    pointer.style.animationTimingFunction = 'linear';
    pointer.style.animationDelay = '0';
    pointer.style.animationFillMode = 'both';
}
function activeVoiceRotate(){
    voice.style.animationName = 'voiceRotate';
    voice.style.animationDuration = '2s';
    voice.style.animationTimingFunction = 'linear';
    voice.style.animationDelay = '0';
    voice.style.animationFillMode = 'both';
    voice.style.animationIterationCount = 'infinite';
}
function stopPointer () {
    pointer.style.animationName = '';
}
function deactiveVoiceRotate(){
    voice.style.animationName = '';
}

function playVoice(){
	voicePlayer.play();
}
function pauseVoice(){
	voicePlayer.pause();
}

function onTouchStart(event) {
    if(!shotting) {
        shotting = true; shotIndex++;
        setTimeout(saveResult.bind(this,shotIndex),777);
    }
}
function onTouchEnd(event) {
    if(shotting) shotting = false;
}
function saveResult (index) {
    if(!shotting || shotIndex!=index) return;
	if(screenshoted) showScreenshot();
	else{
		screenShot($('#main'),function(canvas,width,height){
			canvas = canvas.toDataURL("image/png");
			screenshoted = true;
			screenshot.src = canvas;
			showScreenshot();
		});		
	}
}

function showScreenshot() {   
    screenshotShow.style.display = 'block';
    screenshot.style.animationName = 'alertShowAni';
    screenshot.style.animationDuration = '0.2s';
    screenshot.style.animationTimingFunction = 'linear';
    screenshot.style.animationDelay = '0';
    screenshot.style.animationFillMode = 'both';
}
function hideScreenshot() {
    screenshot.style.animationName = 'alertHideAni';
    screenshot.style.animationDuration = '0.2s';
    screenshot.style.animationTimingFunction = 'linear';
    screenshot.style.animationDelay = '0';
    screenshot.style.animationFillMode = 'both';
    setTimeout(function(){screenshotShow.style.display = 'none';},200);
}

function showAlert(msg) {   
    centerer.style.display = 'block';
    alertWindow.style.animationName = 'alertShowAni';
    alertWindow.style.animationDuration = '0.2s';
    alertWindow.style.animationTimingFunction = 'linear';
    alertWindow.style.animationDelay = '0';
    alertWindow.style.animationFillMode = 'both';
    alertMsg.innerHTML = msg;
}
function hideAlert() {
    alertWindow.style.animationName = 'alertHideAni';
    alertWindow.style.animationDuration = '0.2s';
    alertWindow.style.animationTimingFunction = 'linear';
    alertWindow.style.animationDelay = '0';
    alertWindow.style.animationFillMode = 'both';
    setTimeout(function(){centerer.style.display = 'none';},200);
}

// ScreenShot Core
function screenShot(targetDom,cb){/*
    var copyDom = targetDom.clone();//克隆dom节点
    copyDom.css('display','block');
    targetDom. copyDom
    $('body').append(copyDom);//把copy的截图对象追加到body后面
    var width = copyDom.width();//dom宽
    var height = copyDom.height();//dom高
    var scale = 2;//放大倍数
    canvas.width = width*scale;//canvas宽度
    canvas.height = height*scale;//canvas高度
    var content = canvas.getContext("2d");
    content.scale(scale,scale);
    var rect = copyDom.get(0).getBoundingClientRect();//获取元素相对于视察的偏移量
    content.translate(-rect.left,-rect.top);//设置context位置，值为相对于视窗的偏移量负值，让图片复位*/
    
    var canvas = document.createElement('canvas');
    var width = targetDom.width();//dom宽
    var height = targetDom.height();//dom高
    var scale = 2;//放大倍数
    var ctx = canvas.getContext('2d');
    canvas.width = width*scale;//canvas宽度
    canvas.height = height*scale;//canvas高度
    ctx.fillRect(0,0,canvas.width,canvas.height);
    canvas.style.backgroundColor = 'black';
    canvas.style.color = 'black';
    var promise = html2canvas(targetDom[0], {
        allowTaint:true,
        tainTest:true,
        scale:scale,
        canvas:canvas,
        width:width,
        heigth:height,
        backgroundColor: '#2b2033',
        onrendered: function(canvas) {
            if(cb) cb(canvas.toDataURL("image/png"),width,height);
        }
    });
    promise.then(function(ret){
        //copyDom.css('display','none');
        if(cb) cb(ret, width, height);
    })
}

window.addEventListener('load',init);
// Voice Core
var progressAdjusting = false;

var progressBg = document.getElementById('progress-bg');
var progressBar = document.getElementById('progress-bar');
var progressBall = document.getElementById('progress-ball');

function initPlayer () {
    player.addEventListener('click',onVoicePlay);
    voicePlayer.addEventListener('timeupdate',onVoiceProgress);

    //progressBg.addEventListener('click',changeProgress);


    progressBg.addEventListener('pointerdown',onProgressTouchStart);
    progressBg.addEventListener('pointermove',onProgressTouchMove);
    progressBg.addEventListener('pointerout',onProgressTouchOut);
    progressBg.addEventListener('pointerup',onProgressTouchEnd);
}

function onVoiceProgress(event) {
    if(progressAdjusting) return;
    var currentPos = voicePlayer.currentTime; 
    var maxduration = voicePlayer.duration;
    var percentage = 100 * currentPos / maxduration; 
    setVoiceProgressBar(percentage);
}
function onProgressTouchStart(event) {
    event.stopPropagation();
    progressAdjusting = true;
}
function onProgressTouchMove(event) {
    if(progressAdjusting){
        changeProgress(event);
    }
}
function onProgressTouchOut(event) {
    if(progressAdjusting){     
        progressAdjusting = false;
    }
}
function onProgressTouchEnd(event) {
    event.stopPropagation();
    if(progressAdjusting){        
        progressAdjusting = false;
        changeProgress(event);
    }
}
function changeProgress(event) {
    var max = progressBg.offsetWidth;
    var rate = event.offsetX / max;
    setVoiceProgress(rate);
}
function setVoiceProgress(percentage) {
    voicePlayer.currentTime = voicePlayer.duration*percentage;
    setVoiceProgressBar(percentage*100)
}
function setVoiceProgressBar(percentage) {
    progressBar.style.width = percentage+'%';
}