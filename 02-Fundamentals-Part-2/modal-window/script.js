let buttons = document.querySelectorAll(".show-modal");
let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let closeModalBtn = document.querySelector(".close-modal");
let modalTitle = document.querySelector(".modal-title");


buttons.forEach(button => {
    button.addEventListener('click', function(){
        console.log("Button clicked:", button.textContent);
        modalTitle.textContent = `I'm a modal window - ${button.textContent}`;
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    })
})
// Close modal when clicking on the close button
closeModalBtn.addEventListener('click', closeModal);

// Close modal when clicking on the overlay (outside the modal)
overlay.addEventListener('click', closeModal);

// Close modal function
function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}