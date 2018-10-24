
var copywritingPath = 'php/copywriting.php';
var recordPath = 'php/emcee.php';
var testPath = 'php/upload.php';

var centerer = document.getElementById('centerer');
var alertMsg = document.getElementById('alertMsg');

var copywriting = document.getElementById('copywriting');

var recordBtn = document.getElementById('record-over');
var recordImg = document.getElementById('record-img');

var recording = false;
var recordIndex = 0;
var recordUploading = false;
//var recordStartTime = undefined;
var error = true;

function onTouchStart(event) {
    if(error) return;
    var now = new Date();
    if(now<startDate) return setTimeout(showAlert.bind(this,'活动未开始！'),100);
    if(now>endDate) return setTimeout(showAlert.bind(this,'活动已结束！'),100);
    if(!recording) {
        recording = true;
        recordIndex++;
        startRecording();
    }
}
function onTouchEnd(event) {    
    if(error) return;
    if(recording) {
        stopRecording();
        changeRecordImg(-1,recordIndex);
        recording = false;
        setTimeout(showAlert.bind(this,'录音时间太短，来不及分析'),100);
    }
}
function onRecordFinished() {
    window.location.replace("result.html");
}
function changeRecordImg(index, rIndex) {
    if(!recording || recordIndex!=rIndex) return;
    recordImg.src = (index>=0 ? 'img/recording0.png' : 'img/recordButton.png');
    if(index>=5){
        showAlert('上传结果中，请等待...');
        pushRecording();
        recording = false;
        recordUploading = true;
    }
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
    if(recordUploading || error) return;
    alertWindow.style.animationName = 'alertHideAni';
    alertWindow.style.animationDuration = '0.2s';
    alertWindow.style.animationTimingFunction = 'linear';
    alertWindow.style.animationDelay = '0';
    alertWindow.style.animationFillMode = 'both';
    setTimeout(function(){centerer.style.display = 'none';},200);
}
function init(){
    cookieCheck();
    initCopywriting();
    initRecord();
    initEvents();
}
function cookieCheck(){
    if(getCookie('emcee_name') && getCookie('emcee_sex')) return;
    window.location.replace("index.html");
}
function initEvents () {
    centerer.addEventListener('click', hideAlert);
    recordBtn.addEventListener('pointerdown', onTouchStart);
    recordBtn.addEventListener('pointerup', onTouchEnd);
    recordBtn.oncontextmenu = function(){return false;}
}
function initCopywriting(){
    $.get(copywritingPath,{}, 
        //get 成功后的回调函数
        function(ret) { 
            if(ret.error) showAlert(ret.msg);
            else copywriting.innerHTML = ret.copywriting;
        }, 'json'
    );
}
function onPushFinished(ret) {
    if(ret.error) {
        recordUploading = false;
        changeRecordImg(-1,recordIndex);
        showAlert(ret.msg);
    }else{
        var data = ret.data;
        setCookie('emcee_name',data.name);
        setCookie('emcee_tone',data.tone);
        setCookie('emcee_description',data.description);
        setCookie('emcee_stars',data.stars);
        setCookie('emcee_voice_url',data.voice_url);
        showAlert('录音完成！页面将在3秒后跳转');
        setTimeout(onRecordFinished,3000);
    }
}
window.addEventListener('load', init);
// Record core ------------------------------------------------
var audioContext;
var recorder;

function __log(e, data) {
    console.info(e + " " + (data || ''));
}
function startUserMedia(stream) {
    var input = audioContext.createMediaStreamSource(stream);
    __log('Media stream created.');

    // Uncomment if you want the audio to feedback directly
    //input.connect(audioContext.destination);
    //__log('Input connected to audio context destination.');
    
    window.recorder = new Recorder(input);
    __log('Recorder initialised.');
    error = false;
}

function startRecording() {
    //recorder && recorder.record();
    wx.startRecord({
        success: function(){
            changeRecordImg(0,recordIndex);
            setTimeout(changeRecordImg.bind(this,1,recordIndex),1000);
            setTimeout(changeRecordImg.bind(this,2,recordIndex),2000);
            setTimeout(changeRecordImg.bind(this,3,recordIndex),3000);
            setTimeout(changeRecordImg.bind(this,4,recordIndex),4000);
            setTimeout(changeRecordImg.bind(this,5,recordIndex),5000);
            __log('Recording...');
        },
        fail: function(){
            showAlert('无法录音！');
        }
    });
}
function stopRecording() {
    //recorder && recorder.stop();
    wx.stopRecord();
    __log('Stopped recording.');
    //recorder.clear();
}

function pushRecording() {
    name = getCookie('emcee_name');
    sex = getCookie('emcee_sex');
    language = getCookie('emcee_lang');
    $.post(recordPath,{name, sex, language}, 
        //post成功后的回调函数
        onPushFinished, 'json'
    );
    /*
    recorder && recorder.exportWAV(function(blob) {
        var reader = new FileReader(); 
        reader.readAsDataURL(blob);   
        reader.onload = function(e) { 
            name = getCookie('emcee_name');
            sex = getCookie('emcee_sex');
            language = getCookie('emcee_lang');
            $.post(recordPath,{
                name, sex, language, voice: e.target.result}, 
                //post成功后的回调函数
                onPushFinished, 'json'
            );
        }
    });*/
}/*
function initRecord() {
    try {
        // webkit shim
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        
        audioContext = new AudioContext;
        __log('Audio context set up.');
        __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
        //alert('No web audio support in this browser!');      
        showAlert('该浏览器无法调用录音设备！');  
    }
    
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
        __log('No live audio input: ' + e);
        showAlert('无法录音！换个浏览器试试吧QAQ');
    });
};*/

function initRecord() {
    var url = encodeURIComponent(location.href);
    var xhr = new XMLHttpRequest();
    xhr.open('POST','https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send('url='+url);
    xhr.onreadystatechange = function(){
        if(xhr.status == 200 && xhr.readyState == 4){
            var data = JSON.parse(xhr.response);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: ['startRecord','stopRecord'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            error = false;
        }
    }
}