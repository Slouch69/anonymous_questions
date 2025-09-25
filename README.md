# Anonymous Question Board

This is a simple web application that allows users to post questions anonymously, view them on a separate page, and vote them up or down. The questions are sorted by the number of votes.

The application is built with a simple frontend (HTML, CSS, vanilla JavaScript) and a Node.js/Express backend with a SQLite database.

## Project Structure

```
/anonymous-q-and-a
|-- /backend
|   |-- server.js        # The Express server
|   |-- database.js      # Database connection and schema setup
|   |-- questions.db     # The SQLite database file (created on first run)
|   |-- package.json
|-- /public
|   |-- index.html       # Question submission page
|   |-- questions.html   # Question display page
|   |-- admin.html       # Hidden admin page for deleting questions
|   |-- styles.css
|   |-- app.js           # JS for submission page
|   |-- questions.js     # JS for display page
|   |-- admin.js         # JS for admin page
|-- README.md
```

## How to Run Locally

1.  Navigate to the `backend` directory: `cd backend`
2.  Install dependencies: `npm install`
3.  Start the server: `npm start`
4.  Open your browser and go to `http://localhost:3000`

## How to Deploy to Glitch (for Public Sharing)

Glitch is a free and simple platform for hosting Node.js applications. It's perfect for this project because it supports SQLite out of the box.

1.  **Prepare the Project:**
    *   Navigate to the `anonymous-q-and-a` folder on your computer.
    *   Create a ZIP archive of the entire folder. (e.g., right-click -> "Compress 'anonymous-q-and-a'").

2.  **Deploy on Glitch:**
    *   Go to [Glitch.com](https://glitch.com) and sign up for a free account.
    *   Once logged in, click **New Project** > **Import from GitHub**.
    *   In the popup window, look for a small link or button that says **"Upload a project"** and click it.
    *   Select the ZIP file you created in the first step.

3.  **Go Live:**
    *   Glitch will automatically unpack your project, run `npm install`, and start your server using the `npm start` command from `package.json`.
    *   After a moment, it will provide you with a public URL (e.g., `your-project-name.glitch.me`).
    *   You can now share this URL with anyone!

### Admin Access

To delete questions, navigate to the hidden admin page by adding `/admin.html` to your Glitch URL (e.g., `your-project-name.glitch.me/admin.html`).