const HireCloseBtn = document.querySelector('.Hire_modal_close');
const HireModal = document.querySelector('.HireUs-Modal');
const Team_hireBtn = document.querySelector('.Team_hireBtn');
const Team_hireBtnSend = document.querySelector('.HireUs-Modal_content-submit');
ModalWindow(Team_hireBtn, HireModal, HireCloseBtn);

function ModalWindow(openModalBtn, modal, closeBtn) {
    openModalBtn.onclick = () => {
        modal.classList.add("modal_active");
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', hideModal);
        Team_hireBtnSend.addEventListener('click', information);
        Team_hireBtnSend.addEventListener('click', closeModal);

        function closeModal() {
            modal.classList.remove("modal_active");
            closeBtn.removeEventListener('click', closeModal);
            modal.removeEventListener('click', hideModal);
            Team_hireBtnSend.removeEventListener('click', closeModal);
            Team_hireBtnSend.removeEventListener('click', information);
        }

        function hideModal(event) {
            if (event.target === modal) {
                closeModal();
            }
        }
    };
}

function information() {
    alert('Your data has been sucessful sent!');
}