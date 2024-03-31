var button = document.querySelector('.VideoCompany_button');
var video = document.querySelector('.VideoCompany-play');
var setAtrContr = function () { // Ф-ия добавления панели управления
    video.setAttribute("controls", "");
};
var videoGoOn = 0;
var firstStart = 1;
var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);
var touchPad = window.getComputedStyle(video).top;
var koeff;
var VidWidthCust = 0.8; // 0 - 1
koeff = video.videoWidth / video.videoHeight; //Отношение ширины и высоты кадра
video.style.height = window.innerWidth * VidWidthCust / koeff + "px"; //Уст. высоту пропорционально ширине видео, уменьшенной на величину VidWidthCust

video.addEventListener("loadedmetadata", event => { //ПРИ ЗАГРУЗКЕ ВИДЕО
    koeff = video.videoWidth / video.videoHeight; //Отношение ширины и высоты кадра
    video.style.height = window.innerWidth * VidWidthCust / koeff + "px"; //Уст. высоту пропорционально ширине видео, уменьшенной на величину VidWidthCust
    console.log(video.videoWidth);
    console.log("загрузка страницы удалась");
});
var SetSizeVideo = function () { //ПРИ ИЗМЕНЕНИИ РАЗМЕРОВ ЭКРАНА
    video.style.width = 0; // Сброс значения (временно)
    video.style.height = window.innerWidth * VidWidthCust / koeff + "px"; //Уст. высоту пропорционально ширине видео, уменьшенной на величину VidWidthCust
    if (video.currentTime == 0) { //При времени воспр, равного 0
        video.style.width = window.innerWidth + 'px'; //Уст. ширину видео по всей ширине экрана  
        console.log("изменилась ширина и currentTime = 0");
        console.log(window.innerWidth + " - ширина экрана");
        console.log(video.style.width + " - ширина видео");
    }
    else { //При времени воспр более 0
        video.style.width = document.documentElement.clientWidth * VidWidthCust + "px"; //Уст. ширину видео, уменьшенной на величину VidWidthCust
    }
};
window.addEventListener("resize", SetSizeVideo);

video.addEventListener('click', function () { //ПРИ ЩЕЛЧКЕ НА ОБЛАСТЬ ВИДЕО
    if (firstStart == 0) {
        OnOffControls();
        HelpListeners(); //ф-ия, исп-яся во время окончания воспроизведения
    }
});
var onTouch = function () {
    if ((video.currentTime == 0 || videoPause == 1) && firstStart == 0) {
        video.play();
        videoPause = 0;
        console.log("video.play()");
    }
    else {
        if (firstPause == false) { //Если включаем паузу первый раз !
            var machineEvent = new Event('click'); //Делаем
            video.dispatchEvent(machineEvent); // автоклик
            firstPause == true;
            console.log("сраб");
        }
        video.pause();
        videoPause = 1;
        console.log("video.pause() " + videoPause);
        video.pause();
    }
    console.log("в");
};
var videoPause;
var firstPause = false;
video.addEventListener('touchstart', onTouch);
button.addEventListener('click', function () {
    video.play(); // Кнопка не входит в область video, поэтому нужно ей говорить play
    HelpListeners();
    OnOffControls();
    firstStart = 0;
    setTimeout(() => {
        video.classList.remove("objFitCov");
    }, 1000);
    video.style.width = window.innerWidth * VidWidthCust + "px";
    video.style.height = window.innerWidth * VidWidthCust / koeff + "px";
    //Вспм код - можно убрать (чтобы если вдруг высота будет больше, чем высота экрана)
    if (parseInt(video.style.height) > window.innerHeight) {
        video.style.width = window.innerHeight * koeff + "px";
        video.style.height = window.innerHeight + "px";
    }
});

function HelpListeners() { //ф-ия, исп-яся во время окончания воспроизведения
    button.classList.add("displayNone");
    video.addEventListener('ended', function () {
        button.classList.remove("displayNone");
        video.currentTime = 0; // принудительное возвращение в начало видео
        video.removeEventListener('mouseover', setAtrContr, false); // Убираем ожидание программой наведения курсора в область видео, добавляющего стд панель (т.к. видео завершено). Теперь только при новом клике этот слушатель активируется в ф-ии OnOffControls
        video.removeEventListener('mousemove', setAtrContr, false);
        video.removeAttribute("controls", ""); // Убираем панель управления 
        firstStart = 1;
        video.load(); //Возвращение видео в исходное положение (предпросмотровое)
        video.style.width = window.innerWidth + "px"; //Возвращение ширины видео в исходное положение (во всю ширину)
        video.classList.add("objFitCov"); //
    }, false);
    video.addEventListener('error', function () {
        button.classList.remove("displayNone");
        video.currentTime = 0; // принудительное возвращение в начало видео
        video.removeEventListener('mouseover', setAtrContr, false);
        video.removeEventListener('mousemove', setAtrContr, false);
        video.removeAttribute("controls", "");
        firstStart = 1
        video.load();
        video.style.width = window.innerWidth + "px";
        video.classList.add("objFitCov");
    }, true);
}

function OnOffControls() {
    video.addEventListener('mousemove', setAtrContr, false);
    video.addEventListener('mouseover', setAtrContr, false);
    video.addEventListener('mouseout', function () {
        video.removeEventListener('mousemove', setAtrContr, false);
        video.removeAttribute("controls", "");
    }, false);
}
/*
function PauseGo() {
    if (videoGoOn == 1) {
        console.log("Включение паузы");
        video.pause();
        videoGoOn = 0;
    } else if (videoGoOn == 0) {
        console.log("Отмена паузы");
        video.play();
        videoGoOn = 1;
    }
} */