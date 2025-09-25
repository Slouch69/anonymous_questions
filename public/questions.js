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
                </div>
            `;
            questionsList.appendChild(questionDiv);
        });
    }

    questionsList.addEventListener('click', async (e) => {
        const target = e.target;
        const id = parseInt(target.dataset.id, 10);

        if (!id || target.disabled) {
            return; // Don't do anything if the button is disabled or not a vote button
        }

        if (target.classList.contains('upvote-btn')) {
            await vote(id, 'upvote');
        } else if (target.classList.contains('downvote-btn')) {
            await vote(id, 'downvote');
        }
    });

    async function vote(id, type) {
        try {
            const response = await fetch(`/api/questions/${id}/${type}`, {
                method: 'POST',
            });

            if (response.ok) {
                addVotedId(id); // Add the ID to localStorage after a successful vote
                fetchQuestions(); // Refresh the list to show the new vote count and disabled buttons
            } else {
                const errorData = await response.json();
                console.error(`Error ${type}ing question:`, errorData.error);
            }
        } catch (error) {
            console.error(`Error ${type}ing question:`, error);
        }
    }

    fetchQuestions();
});