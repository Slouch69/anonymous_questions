# Anonymous Question Board

This is a simple web application that allows users to post questions anonymously, view them on a separate page, and vote them up or down. The questions are sorted by the number of votes.

The application is built with a simple frontend (HTML, CSS, vanilla JavaScript) and a Node.js/Express backend with a SQLite database.

## Project Structure

```
/anonymous-q-and-a
|-- /backend
|   |-- server.js        # The Express server
|   |-- database.js      # Database connection and schema setup
|   |-- package.json
|-- /public
|   |-- index.html       # Question submission page
|   |-- questions.html   # Question display page
|   |-- admin.html       # Hidden admin page for deleting questions
|   |-- styles.css
|   |-- app.js           # JS for submission page
|   |-- questions.js     # JS for display page
|   |-- admin.js         # JS for admin page
|-- .gitignore           # Tells Git which files to ignore
|-- README.md
```

## How to Run Locally (for Development)

1.  Navigate to the `backend` directory: `cd backend`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev` (This uses `nodemon` to restart automatically on file changes).
4.  Open your browser and go to `http://localhost:3000`

---

## How to Deploy and Update on an Internal Server

This guide uses `git` for updating the code and `pm2` to keep the application running reliably.

### Step 1: Initial Server Setup (One Time Only)

1.  **Install `pm2`:**
    *   On the server, install `pm2` globally: `npm install pm2 -g`

2.  **Clone the Repository:**
    *   Clone your project from GitHub: `git clone https://github.com/Slouch69/anonymous_questions.git`

3.  **Install Dependencies:**
    *   Navigate into the backend directory: `cd anonymous_questions/backend`
    *   Install the project dependencies: `npm install`

4.  **First Start:**
    *   Start the application with `pm2`: `pm2 start server.js --name "beatles-q-and-a"`

Your application is now running. `pm2` will automatically restart it if it crashes.

### Step 2: Updating the Application (The Workflow)

Any time you make changes and push them to GitHub, follow these steps on the server to deploy the update:

1.  **Navigate to the Directory:**
    *   Go to the project folder on the server: `cd anonymous_questions`

2.  **Pull the Latest Code:**
    *   Fetch the latest changes from GitHub: `git pull`

3.  **Restart the Application:**
    *   Tell `pm2` to gracefully restart your app with the new code: `pm2 restart beatles-q-and-a`

That's it! `pm2` handles the stop/start process in one simple command, ensuring a smooth update.

### Admin Access

To delete questions, navigate to the hidden admin page by adding `/admin.html` to your server's URL (e.g., `http://17.203.210.47:3000/admin.html`).
