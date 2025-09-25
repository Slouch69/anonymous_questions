document.addEventListener('DOMContentLoaded', () => {
    const questionsList = document.getElementById('questions-list');

    async function fetchQuestions() {
        try {
            const response = await fetch('/api/questions');
            const result = await response.json();

            if (response.ok) {
                renderQuestions(result.data);
            } else {
                console.error('Error fetching questions:', result.error);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    function renderQuestions(questions) {
        questionsList.innerHTML = '';
        if (questions.length === 0) {
            questionsList.innerHTML = '<p>No questions have been asked yet.</p>';
            return;
        }

        questions.forEach(question => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.innerHTML = `
                <p><strong>To: ${question.directed_to}</strong></p>
                <p>${question.text}</p>
                <div class="vote-controls">
                    <button class="upvote-btn" data-id="${question.id}">⬆</button>
                    <span class="vote-count">${question.votes}</span>
                    <button class="downvote-btn" data-id="${question.id}">⬇</button>
                    <button class="delete-btn" data-id="${question.id}">❌</button>
                </div>
            `;
            questionsList.appendChild(questionDiv);
        });
    }

    questionsList.addEventListener('click', async (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (target.classList.contains('upvote-btn')) {
            await vote(id, 'upvote');
        } else if (target.classList.contains('downvote-btn')) {
            await vote(id, 'downvote');
        } else if (target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this question?')) {
                await deleteQuestion(id);
            }
        }
    });

    async function vote(id, type) {
        try {
            const response = await fetch(`/api/questions/${id}/${type}`, {
                method: 'POST',
            });

            if (response.ok) {
                fetchQuestions(); // Refresh the list to show the new vote count
            } else {
                const errorData = await response.json();
                console.error(`Error ${type}ing question:`, errorData.error);
            }
        } catch (error) {
            console.error(`Error ${type}ing question:`, error);
        }
    }

    async function deleteQuestion(id) {
        try {
            const response = await fetch(`/api/questions/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchQuestions(); // Refresh the list
            } else {
                const errorData = await response.json();
                console.error('Error deleting question:', errorData.error);
            }
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    }

    fetchQuestions();
});