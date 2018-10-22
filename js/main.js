
var centerer = document.getElementById('centerer');
var alertMsg = document.getElementById('alertMsg');

var nextBtn = document.getElementById('next-over');
var nameInput = document.getElementById('name');
var sexSels = [{
	tag: 'Boy', value:'男',
	btn: document.getElementById('sex-boy'),
	frameImg: 'sexBoyFrame.png',
	normalImg: 'sexButtonFrameNormal.png'
},{
	tag: 'Girl', value:'女',
	btn: document.getElementById('sex-girl'),
	frameImg: 'sexGirlFrame.png',
	normalImg: 'sexButtonFrameNormal.png'
}];

var langSels = [{
	tag: 'Chi', value:'国',
	btn: document.getElementById('lang-chi'),
	frameImg: 'langChiFrame.png',
	normalImg: 'langButtonFrameNormal.png'
},{
	tag: 'Con', value:'粤',
	btn: document.getElementById('lang-con'),
	frameImg: 'langConFrame.png',
	normalImg: 'langButtonFrameNormal.png'
},{
	tag: 'Eng', value:'英',
	btn: document.getElementById('lang-eng'),
	frameImg: 'langEngFrame.png',
	normalImg: 'langButtonFrameNormal.png'
}];

function init () {
	initEventListeners();
	initSelection();
}

function initEventListeners () {
	initSels();
	initOthers();
}
function initSels () {
	initSexSels();
	initLangSels();
}
function initOthers () {
	centerer.addEventListener('click', hideAlert);
	nextBtn.addEventListener('click', onNext);
}
function initSelection () {
	onSelsSelect(sexSels,0);
	onSelsSelect(langSels,0);
}
function initSexSels () {
	for(var i in sexSels){
		var obj = sexSels[i];
		obj.btn.addEventListener('click', onSelsSelect.bind(this,sexSels,i));
	}
}
function initLangSels () {
	for(var i in langSels){
		var obj = langSels[i];
		obj.btn.addEventListener('click', onSelsSelect.bind(this,langSels,i));
	}
}
function onSelsSelect (sels, index) {
	sels.selected = index;
	for(var i in sels){
		var obj = sels[i];
		if(!obj) continue;
		obj.btn.style.backgroundImage = 'url(img/'+
			((obj.selected = (i==index)) ? 
			obj.frameImg : obj.normalImg)+')'
	}
}
function validate() {
	var now = new Date();
	if(now<startDate) return {msg:'活动未开始！', valid: false};
	if(now>endDate) return {msg:'活动已结束！', valid: false};
	if(nameInput.value=='') return {msg:'请输入昵称！', valid: false};
	if(sexSels.selected==undefined) return {msg:'请选择性别！', valid: false};
	if(langSels.selected==undefined) return {msg:'请选择偏好语种！', valid: false};
	return {valid: true};
}
function onNext() {
	var valid = validate();
	if(valid.valid){
		setCookie('emcee_name',nameInput.value);
		setCookie('emcee_sex',sexSels[sexSels.selected].value);
		setCookie('emcee_lang',langSels[langSels.selected].value);
		window.location.assign("./record.html");
	}else showAlert(valid.msg);
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
window.addEventListener('load',init);