const OurworksArea = document.querySelector('.Our_works');
const LoadBtn = OurworksArea.querySelector('.Our_works-btnLoad');
const imagesToLoad = OurworksArea.querySelectorAll('.displayNone');
LoadBtn.addEventListener('click', LoadImages);
var LoadBtnOn = false;

function LoadImages() {
    if (LoadBtnOn == false) {
        for (var i = 0; i < imagesToLoad.length; i++) {
            imagesToLoad[i].classList.remove('displayNone');
            imagesToLoad[i].classList.add('slide-in-blurred-top');
        }
        LoadBtnOn = true;
        LoadBtn.textContent = 'hide more';
        LoadBtn.removeAttribute("href", "#works"); //
    }
    else{
        for (var i = 0; i < imagesToLoad.length; i++) {
            imagesToLoad[i].classList.add('displayNone');
            imagesToLoad[i].classList.remove('slide-in-blurred-top');
        }
        LoadBtnOn = false;
        LoadBtn.textContent = 'load more';
        LoadBtn.setAttribute("href", "#works"); //
    }
}
// LoadBtn.setAttribute("href", "#works");

