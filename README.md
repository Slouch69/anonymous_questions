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

## How to Run Locally

1.  Navigate to the `backend` directory: `cd backend`
2.  Install dependencies: `npm install`
3.  Start the server: `npm start`
4.  Open your browser and go to `http://localhost:3000`

## How to Deploy to Render (for Public Sharing)

Render is a modern hosting platform with a free tier that is perfect for this project. It supports SQLite by using a persistent disk.

### Step 1: Push to GitHub
(This is already complete.)

### Step 2: Deploy on Render

1.  **Create an Account:**
    *   Go to [Render.com](https://render.com) and sign up for a free account (signing up with GitHub is easiest).

2.  **Create the Web Service:**
    *   From your Render Dashboard, click **"New"** > **"Web Service"**.
    *   Connect your GitHub account and select your `anonymous_questions` repository.
    *   Give your service a unique name (e.g., `beatles-q-and-a`).
    *   Set the **Root Directory** to `backend`. This tells Render to run commands from within the `backend` folder.
    *   Set the **Build Command** to `npm install`.
    *   Set the **Start Command** to `npm start`.

3.  **Add a Persistent Disk and Environment Variable:**
    *   Scroll down to the **"Advanced"** section.
    *   Click **"Add Disk"**.
        *   **Mount Path:** `/data/db`
        *   **Size:** `1 GB`
    *   Just below the disk settings, click **"Add Environment Variable"**.
        *   **Key:** `DATABASE_PATH`
        *   **Value:** `/data/db/questions.db`

4.  **Deploy!**
    *   Scroll to the bottom and click **"Create Web Service"**.
    *   Render will now build and deploy your application. It may take a few minutes.
    *   Once it's live, Render will provide you with a public URL (e.g., `https://beatles-q-and-a.onrender.com`).

### Admin Access

To delete questions, navigate to the hidden admin page by adding `/admin.html` to your Render URL (e.g., `https://beatles-q-and-a.onrender.com/admin.html`).
