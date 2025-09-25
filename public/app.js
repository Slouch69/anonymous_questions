document.addEventListener('DOMContentLoaded', () => {
    const questionForm = document.getElementById('question-form');
    const modal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeModalBtn = document.getElementById('modal-close-btn');

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    function hideModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    closeModalBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    if (questionForm) {
        questionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const questionText = document.getElementById('question-text').value;
            const directedTo = document.getElementById('directed-to').value;

            try {
                const response = await fetch('/api/questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: questionText, directed_to: directedTo }),
                });

                if (response.ok) {
                    showModal('Your question has been submitted successfully!');
                    document.getElementById('question-text').value = '';
                } else {
                    const errorData = await response.json();
                    showModal(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error submitting question:', error);
                showModal('An error occurred while submitting your question. Please try again.');
            }
        });
    }
});