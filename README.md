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
(You have already completed this step!)

### Step 2: Set up on Render

1.  **Create an Account:**
    *   Go to [Render.com](https://render.com) and sign up for a free account. It's easiest to sign up using your GitHub account.

2.  **Create a Persistent Disk:**
    *   From your Render Dashboard, click **"New"** > **"Disk"**.
    *   Give it a name (e.g., `beatles-db`).
    *   Set the size to **1 GB** (the smallest and free option).
    *   Click **"Create Disk"**.

3.  **Create the Web Service:**
    *   From your Dashboard, click **"New"** > **"Web Service"**.
    *   Connect your GitHub account and select your repository (`anonymous_questions`).
    *   Give your service a unique name (e.g., `beatles-q-and-a`).
    *   Set the **Root Directory** to `backend`. This tells Render to run commands from within the `backend` folder.
    *   Set the **Build Command** to `npm install`.
    *   Set the **Start Command** to `npm start`.

4.  **Add the Persistent Disk:**
    *   Scroll down to the **"Advanced"** section.
    *   Click **"Add Disk"**.
    *   For **Mount Path**, enter `/data/db`. This is where the disk will be accessible inside your application.
    *   Select the disk you created earlier (`beatles-db`).

5.  **Set the Database Path Environment Variable:**
    *   Still in the "Advanced" section, click **"Add Environment Variable"**.
    *   For the **Key**, enter `DATABASE_PATH`.
    *   For the **Value**, enter `/data/db/questions.db`. This tells our app where to create and find the database file on the persistent disk.

6.  **Deploy!**
    *   Scroll to the bottom and click **"Create Web Service"**.
    *   Render will now build and deploy your application. It may take a few minutes.
    *   Once it's live, Render will provide you with a public URL (e.g., `https://beatles-q-and-a.onrender.com`).

### Step 3: Update Database Code

The final step is to tell our `database.js` file to use the `DATABASE_PATH` environment variable if it exists.

I will make this change now.
