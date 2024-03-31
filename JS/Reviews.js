var slidesCopy_ = document.querySelectorAll('.Reviews-item'); // массив слайдов
var slidesS_ = new Array();
for (i = 0; i < slidesCopy_.length; i++) {
    slidesS_[i] = slidesCopy_[i]; // Коп-ем слайды в нов масс и далее раб-м тольк с ним 
}
var VisibleConutSl = 5; // Число видимых слайдов !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var centralSl = 3; // Центральный (большой) слайд !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var kr_p_ = VisibleConutSl; // Номер крайнего слайда справа
var incrSlide = 1.555; // Величина превосходства центр. слайда
var slickTime_ = 480; // Время движения слайда в мс
var root_ = document.querySelector(':root');
var kr_l_ = 1; // Номер крайнего слайда слева
const ArrowL_Btn_ = document.querySelector('.Reviews-slider_panel_controls-left');
const ArrowR_Btn_ = document.querySelector('.Reviews-slider_panel_controls-right');
for (var num0 = 0; num0 < slidesS_.length; num0++) { // Назначм всем слам номера по порядку
    slidesS_[num0].style.order = (num0 + 1);
}
var Reviews_quote = document.querySelector('.Reviews-slider_quote');
var Reviews_name = document.querySelector('.Reviews-slider_name');
var Reviews_proff = document.querySelector('.Reviews-slider_proff');
Reviews_quote.textContent = slidesS_[centralSl - 1].querySelector('.Reviews-item_quote').textContent;
Reviews_name.textContent = slidesS_[centralSl - 1].querySelector('.Reviews-item_name').textContent;
Reviews_proff.textContent = slidesS_[centralSl - 1].querySelector('.Reviews-item_proff').textContent;
///////////////////////////////////////////////////  
const slidesAll_ = new Array(slidesS_.length); // Масс для хранения div-ов слайдов 
for (var i = 0; i < slidesAll_.length; i++) { // Хранение инф о слайдах
    slidesAll_[i] = new Array(4);
    slidesAll_[i][0] = slidesS_[i].querySelector('.Reviews-item_image').src;
    slidesAll_[i][1] = slidesS_[i].querySelector('.Reviews-item_name').textContent;
    slidesAll_[i][2] = slidesS_[i].querySelector('.Reviews-item_proff').textContent;
    slidesAll_[i][3] = slidesS_[i].querySelector('.Reviews-item_quote').textContent;
} // В этом 2-ом массиве храним заголовки и src всех слайдов 
//Удаляем все элементы, кроме первых VisibleConutSl
var slidesS_Length = slidesS_.length;
for (var i = VisibleConutSl; i < slidesS_Length; i++) {
    slidesS_[i].parentNode.removeChild(slidesS_[i]); // Удаление DOM-слайдов
}
for (var n = VisibleConutSl; n < slidesS_Length; n++) {
    slidesS_.splice(n, slidesS_Length - VisibleConutSl); // Удаление ссылок на слайды (массив)
}
///////////////////////////////////////
//ScaleCentrSlide(centralSl-1); //Расчет и присвоение отступов центр. слайду    
//setWidthMovSlide();// Задание длины перемещения слайда в анимацию css 
var slide_mr = window.getComputedStyle(slidesS_[0]).marginRight;
//////////////////////////////////////////////////////////////////////////////////////////////
function FeedChangeSlide(sign) { // Главн ф-ия. Вызыв-ся при нажатии на стрелку
    if (sign < 0) { // Щелк на левую кнопку
        ClickLeftBtn_();
    }
    else { // Щелк на правую кнопку
        ClickRightBtn_();
    }
    setTimeout(() => {
        for (var numSl = 0; numSl < slidesS_.length; numSl++) {
            slidesS_[numSl].querySelector('.Reviews-item_image').style.transform = '';
            if (slidesS_[numSl].style.order == centralSl) { //уст. "крупным" изображением 3-му слайду
                ScaleCentrSlide(numSl);
                Reviews_quote.textContent = slidesS_[numSl].querySelector('.Reviews-item_quote').textContent;
                Reviews_name.textContent = slidesS_[numSl].querySelector('.Reviews-item_name').textContent;
                Reviews_proff.textContent = slidesS_[numSl].querySelector('.Reviews-item_proff').textContent;
            }
            else {
                slidesS_[numSl].style.marginRight = slide_mr;
                slidesS_[numSl].style.marginLeft = 0 + 'px';
            }
            slidesS_[slidesS_.length - 1].style.marginRight = 0;
        }
    }, slickTime_);
}

function ClickLeftBtn_() {
    On_Off_Click_(0); // Отключает кликабельность кнопки
    for (let numSl = 0; numSl < slidesS_.length; numSl++) {
        Animation_('LeftAnim', slidesS_, numSl); // Анимация слайда (переход вправо)
        if (slidesS_[numSl].style.order == VisibleConutSl) { //выб-ем кр.пр слайд
            setTimeout(() => {
                slidesS_[numSl].parentNode.removeChild(slidesS_[numSl]); //уд. его
                slidesS_.splice(numSl, 1); //65465467476465
                if (kr_p_ == 1) { //если кр.пр слайд - первый
                    kr_p_ = slidesAll_.length; //кр. пр-ым становится наиб. слайд
                }
                else kr_p_--; //иначе кр.пр-м стан-ся меньший на ед-цу (т.к. левая кнопка дв-ет сл-ды назад)
                if (kr_l_ == 1) { //Если кр.лев слайд - первый
                    createNewSlide_(slidesAll_.length, 1, 'inception'); //Создать новый - наиб-ий и поставить первым
                    kr_l_ = slidesAll_.length; //Обновить кр.левый до максим-го номера (т.к. кр.лев теперь посл-ий)
                }
                else { //Если кр.лев слайд не первый, 
                    createNewSlide_(--kr_l_, 1, 'inception'); //то кр.левый делаем на ед-цу меньше, т.к. лев.кнопка двигает сл-ды вправо. И создаем новый, меньший на единицу и ставим его первым
                }
            }, slickTime_);
        }
        else {
            setTimeout(() => {
                slidesS_[numSl].style.order = Number(slidesS_[numSl].style.order) + 1;
            }, slickTime_);
        }
    }
}

function ClickRightBtn_() { //kr_l_ = 1, kr_p_ = 3
    On_Off_Click_(0);
    var slidesS_LengthRbtn = slidesS_.length;
    for (let numSl = 0; numSl < slidesS_LengthRbtn; numSl++) {
        Animation_('RightAnim', slidesS_, numSl);
        if (slidesS_[numSl].style.order == 1) {
            setTimeout(() => {
                slidesS_[numSl].parentNode.removeChild(slidesS_[numSl]); // Удаляем кр. левый эл.т
                slidesS_.splice(numSl, 1); //54776587687
                slidesS_[numSl].style.order = 1; ////////////////////////////////
                if (kr_l_ == slidesAll_.length) { //Если кр.л равен посл-му
                    kr_l_ = 1;
                }
                else kr_l_++; // 2
                if (kr_p_ != slidesAll_.length) { // Если элемент не посл
                    createNewSlide_(++kr_p_, (VisibleConutSl + 1), 'end'); //Новый эл-т с пор VisibleConutSl + 1, т.к. на след. шаге б. умен 
                }
                else {
                    kr_p_ = 1;
                    createNewSlide_(kr_p_, (VisibleConutSl + 1), 'end');
                }
            }, slickTime_);
        }
        else {
            setTimeout(() => {
                slidesS_[numSl].style.order = Number(slidesS_[numSl].style.order) - 1;
            }, slickTime_);
        }
    }
}

function On_Off_Click_(duo_) { // Вкл/Выкл кликабельность стрел-ой кн-ки
    if (duo_ == 0) {
        ArrowL_Btn_.classList.add('pointerEvents'); // Отключает кликабельность кнопки L
        ArrowR_Btn_.classList.add('pointerEvents'); // Отключает кликабельность кнопки R
    }
    else if (duo_ == 1) {
        ArrowL_Btn_.classList.remove('pointerEvents'); // Отключает кликабельность кнопки L
        ArrowR_Btn_.classList.remove('pointerEvents'); // Отключает кликабельность кнопки R
    }
}

function Animation_(animType_, slides_, num) { // Анимация слайда (переход вправо)
    if (animType_ == 'LeftAnim') {
        if (slides_[num].style.order == VisibleConutSl) {
            goingAnim_unlockBtn_('FeedleftAnimK', slides_, num);
        }
        else {
            for (var i = 0; i < slides_.length; i++) {
                slides_[i].classList.remove('FeedrightAnim');
            }
            goingAnim_unlockBtn_('FeedleftAnim', slides_, num);
        }
    }
    else if (animType_ == 'RightAnim') {
        if (slides_[num].style.order == 1) {
            goingAnim_unlockBtn_('FeedrightAnimK', slides_, num);
        }
        else {
            goingAnim_unlockBtn_('FeedrightAnim', slides_, num);
        }
    }
}

function goingAnim_unlockBtn_(classAnim_, slides_, num) {
    root_.style.setProperty('--time', slickTime_ / 990 + 's'); // Ставм врмя аним
    slides_[num].classList.add(classAnim_);
    setTimeout(() => {
        root_.style.setProperty('--time', 0 + 's'); // Делаем время аним меньше 0
        slides_[num].classList.remove(classAnim_), On_Off_Click_(1);
    }, slickTime_);
}

function createNewSlide_(numSlide_, ord_, position) {
    var Reviews_items = document.querySelector('.Reviews-slider_panel_items');
    var newItem = document.createElement('div');
    if (position == 'end') {
        setMyElement_(newItem, Reviews_items, 'Reviews-item');
    }
    else if (position == 'inception') {
        var itemsFirstChild = Reviews_items.firstChild;
        newItem.classList.add('Reviews-item');
        Reviews_items.insertBefore(newItem, itemsFirstChild);
    }
    else return 0;
    var newItem_image = document.createElement('img');
    setMyElement_(newItem_image, newItem, 'Reviews-item_image');
    newItem_image.src = slidesAll_[numSlide_ - 1][0];
    newItem_image.alt = "";
    var newItem_name = document.createElement('div');
    setMyElement_(newItem_name, newItem, 'Reviews-item_name');
    newItem_name.classList.add('displayNone');
    newItem_name.textContent = slidesAll_[numSlide_ - 1][1];
    var newItem_proff = document.createElement('div');
    setMyElement_(newItem_proff, newItem, 'Reviews-item_proff');
    newItem_proff.classList.add('displayNone');
    newItem_proff.textContent = slidesAll_[numSlide_ - 1][2];
    var newItem_quote = document.createElement('div');
    setMyElement_(newItem_quote, newItem, 'Reviews-item_quote');
    newItem_quote.classList.add('displayNone');
    newItem_quote.textContent = slidesAll_[numSlide_ - 1][3];
    if (position == 'end') {
        slidesS_.push(newItem); // добавляем новый эл. ко всем в массив в конец
    }
    else if (position == 'inception') {
        slidesS_.unshift(newItem); // Добавляем newItem в начало массива
    }
    newItem.style.order = ord_;
    //   newItem.style.height = imageBigHeight; //Прин-но уст. высоту слайда по размеру наиб. изоб
    setListTouch(newItem);
}

function setMyElement_(elem_, conteiner_, classN_) { // Доб. эл. в конт. и уст. клсс
    conteiner_.appendChild(elem_);
    elem_.classList.add(classN_);
}
//////////////////////////////////////////////////////////////////////////////////
// Внедрение перелистывания через свайп
var X_in, X_out;
var touchEnded = function (event) {
    setTimeout(() => {
        for (var i = 0; i < slidesS_.length; i++) {
            slidesS_[i].removeEventListener('touchstart', touchStart);
            slidesS_[i].removeEventListener('touchend', touchEnded);
        } //Убираем слушателей перед началом переключения слайда
    }, 0); //Убираем слушателей перед началом переключения слайда
    X_out = event.changedTouches[0].screenX;
    console.log("При отпускании " + X_out);
    if (X_in > X_out) {
        FeedChangeSlide(1);
    }
    else if (X_in == X_out) {}
    else {
        FeedChangeSlide(-1);
    }
    setTimeout(() => {
        for (var i = 0; i < slidesS_.length; i++) {
            setListTouch(slidesS_[i]);
        } //Возвр-ем слушателей после переключения слайда
    }, slickTime_ + 1); //Возвр-ем слушателей после переключения слайда
};
var touchStart = function (event) {
    X_in = event.touches[0].screenX;
    console.log("При касании " + X_in);
};
for (var i = 0; i < slidesS_.length; i++) {
    setListTouch(slidesS_[i]);
}

function setListTouch(item) {
    item.addEventListener('touchstart', touchStart);
    item.addEventListener('touchend', touchEnded);
} // Оконч Внедрение перелистывания через свайп
//////////////////////////////////////////////////////////////////////////////////
function setWidthMovSlide() {
    var slideMargin = window.getComputedStyle(slidesS_[0]).marginRight; // получаем отступ справа;
    slideMargin = parseInt(slideMargin, 10); // Преобразование пикселей в число
    const widthSlide_ = slidesS_[0].getBoundingClientRect().width; //Получаем ширину слайда
    var rootStyles_ = getComputedStyle(root_);
    root_.style.setProperty('--widthRi', -widthSlide_ - slideMargin + 'px'); //Уст. пер. ш-ну сл
    root_.style.setProperty('--widthLe', widthSlide_ + slideMargin + 'px'); //для перехда аним.
}

function ScaleCentrSlide(num) {
    var strScale = 'scale(' + incrSlide + ')';
    var slideWidth = slidesS_[0].getBoundingClientRect().width; //Получаем ширину слайда
    var slideWidthScale = slideWidth * incrSlide; //Получаем ширину большого (центр.) слайда
    var slideMr = window.getComputedStyle(slidesS_[0]).marginRight; // Получаем отступ справа слайда, заданный в стилях
    slidesS_[num].style.marginRight = ((slideWidthScale - slideWidth) / 2) + parseInt(slideMr, 10) + 'px';
    slidesS_[num].style.marginLeft = (slideWidthScale - slideWidth) / 2 + 'px';
    slidesS_[num].querySelector('.Reviews-item_image').style.transform = strScale;
}
var ONload = function (event) {
    ScaleCentrSlide(centralSl - 1); //Расчет и присвоение отступов центр. слайду    
    setWidthMovSlide(); // Задание длины перемещения слайда в анимацию css 
    
    if (document.URL.indexOf("#") == -1) {
        // Set the URL to whatever it was plus "#".
        url = document.URL + "#";
        location = "#";
        //Reload the page
        location.reload(true);
    }
    window.removeEventListener("load", ONload);
};
var imageBig = slidesS_[0].querySelector('.Reviews-item_image');
var SlideHeight = function (event) { // Делает все обертки картинок один. по высоте
    var imageBigHeight = imageBig.height + 'px';
    for (var i = 0; i < VisibleConutSl; i++) { // Хранение инф о слайдах
        slidesS_[i].style.height = imageBigHeight;
    }
    imageBig.removeEventListener('load', SlideHeight);
};
//События и их обработчики
imageBig.addEventListener('load', SlideHeight);
window.addEventListener("load", ONload);
window.addEventListener('resize', setWidthMovSlide); // Перерасчет длины перемещения слайда