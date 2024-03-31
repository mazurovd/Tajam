
function reload(){
    window.location.reload();
}

window.addEventListener('load', reload);
 window.removeEventListener('load', reload);



const BtnMenuMedia = document.querySelector('.header-top_menu-media');
const MenuMedia = document.querySelector('.header-top_menu');
BtnMenuMedia.onclick = OpenMenu;
var openFlag = 0;

window.onresize = function (event) { // 
    if (document.documentElement.clientWidth >= 769) {
        MenuMedia.classList.add("block");
        MenuMedia.classList.remove("slide-out-top");
    } else {
        MenuMedia.classList.remove("block");
        openFlag = 0;
    }
};

function OpenMenu() {
    if (openFlag == 0) {
        openFlag = 1;
        MenuMedia.classList.remove("slide-out-top");
        MenuMedia.classList.add("slide-in-top");
        MenuMedia.classList.add("block");
    } else if (openFlag == 1) {
        openFlag = 0;
        MenuMedia.classList.remove("slide-in-top");
        MenuMedia.classList.add("slide-out-top");
        setTimeout(() => {
            MenuMedia.classList.remove("block");
        }, 100);
    }
}

/*//////////////////////////////////////////////////////
                  HEADER-SLIDER
/////////////////////////////////////////////////////*/

const slides = document.querySelectorAll('.header-slider_item');
const dots = document.querySelectorAll('.header-slider_dot');
const dotsArea = document.querySelector('.header-slider_dots');

var indexSlide = 0;

for (var i = dots.length - 1; i >= 0; i--) {
    dots[i].id = i + 1; // присваиваем точкам id
}

var eveTarg;
dotsArea.onclick = () => { // при тыке в область точек
    eveTarg = event.target; //объект тыка записываем в eveTarg
    console.log(Number(eveTarg.id));

    if ((Number(eveTarg.id)) > 0) {
        changeDot(eveTarg.id - 1); // выз. ф. с аргум. id точки
    }
};

function changeDot(index) {
    indexSlide = index;

    for (let numSl = 0; numSl < slides.length; numSl++) {
        slides[numSl].classList.remove('active');
        slides[numSl].classList.remove('fade-in');
        dots[numSl].classList.remove('activeDot');
    }

    slides[indexSlide].classList.add('active'); // Смена слайда
    slides[indexSlide].classList.add('fade-in');
    dots[indexSlide].classList.add('activeDot');
}

///////////////////////////////////////////////////////
// LEARN MORE //
const LearnCloseBtn = document.querySelector('.Learn_modal_close');
const LearnModal = document.querySelector('.LearnUs-Modal');
const LearnBtn = document.querySelectorAll('.header-slider_item-button');

var LearnMoreTexts = document.querySelectorAll('.header-slider_learn-more');
var LearnMoreTextField = document.querySelector('.LearnUs-Modal_content-text');

for (var i = 0; i < LearnBtn.length; i++) {
    ModalWindow(LearnBtn[i], LearnModal, LearnCloseBtn);
}

function ModalWindow(openModalBtn, modal, closeBtn) {
    openModalBtn.onclick = () => {
        modal.classList.add("modal_active");
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', hideModal);

        openModalBtn.classList.add('clicked');
        for (var i = 0; i < LearnBtn.length; i++) {
            if (LearnBtn[i].classList.contains('clicked')) {
                LearnMoreTextField.textContent = LearnMoreTexts[i].textContent;
                console.log(LearnMoreTexts[i].textContent);
            }
        }
        openModalBtn.classList.remove('clicked');

        function closeModal() {
            modal.classList.remove("modal_active");
            closeBtn.removeEventListener('click', closeModal);
            modal.removeEventListener('click', hideModal);
        }

        function hideModal(event) {
            if (event.target == modal) {
                closeModal();
                console.log("close");
            }
        }
    };
}
///////////////////////////////////////////////////////////////
// Set height slider-content // Уст. высоту блока текста с кнопкой, для центровки его по вертикали
var sliderLine = document.querySelector('.header-slider_item-line');
var sliderDots = document.querySelector('.header-slider_dots');
var Y_line = sliderLine.getBoundingClientRect().top;
var Y_dots = sliderDots.getBoundingClientRect().top;
console.log(Y_line + " Координата Y");
console.log(Y_dots + " Координата Y");

var sliderText_heightZH = (Y_dots - Y_line) + "px";
var sliderText_heights = document.querySelectorAll('.header-slider-item_content');
for (var i = 0; i < sliderText_heights.length; i++) {
    sliderText_heights[i].style.height = sliderText_heightZH;
}
///////////////////////////////////////////////////////////////











