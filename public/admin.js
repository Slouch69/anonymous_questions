document.addEventListener('DOMContentLoaded', () => {
    const questionsList = document.getElementById('questions-list');

    // --- localStorage helper functions ---
    function getVotedIds() {
        const voted = localStorage.getItem('votedQuestionIds');
        return voted ? JSON.parse(voted) : [];
    }

    function addVotedId(id) {
        const votedIds = getVotedIds();
        if (!votedIds.includes(id)) {
            votedIds.push(id);
            localStorage.setItem('votedQuestionIds', JSON.stringify(votedIds));
        }
    }
    // ------------------------------------

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

        const votedIds = getVotedIds(); // Get the list of voted questions

        questions.forEach(question => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            const hasVoted = votedIds.includes(question.id); // Check if user has voted

            questionDiv.innerHTML = `
                <p><strong>To: ${question.directed_to}</strong></p>
                <p>${question.text}</p>
                <div class="vote-controls">
                    <button class="upvote-btn" data-id="${question.id}" ${hasVoted ? 'disabled' : ''}>⬆</button>
                    <span class="vote-count">${question.votes}</span>
                    <button class="downvote-btn" data-id="${question.id}" ${hasVoted ? 'disabled' : ''}>⬇</button>
                    <button class="delete-btn" data-id="${question.id}">❌</button>
                </div>
            `;
            questionsList.appendChild(questionDiv);
        });
    }

    questionsList.addEventListener('click', async (e) => {
        const target = e.target;
        const id = parseInt(target.dataset.id, 10);

        if (!id) {
            return;
        }

        if (target.classList.contains('upvote-btn') && !target.disabled) {
            await vote(id, 'upvote');
        } else if (target.classList.contains('downvote-btn') && !target.disabled) {
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
                addVotedId(id); // Add the ID to localStorage after a successful vote
                fetchQuestions(); // Refresh the list
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