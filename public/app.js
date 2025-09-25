document.addEventListener('DOMContentLoaded', () => {
    const questionForm = document.getElementById('question-form');

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
                    alert('Your question has been submitted successfully!');
                    document.getElementById('question-text').value = '';
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error submitting question:', error);
                alert('An error occurred while submitting your question. Please try again.');
            }
        });
    }
});