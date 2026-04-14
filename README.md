# Portfolio CMS & Deployment Guide

This document explains how to manage your website securely and deploy it using GitHub Pages. Keep this guide handy so you never forget how your website system works.

---

## 1. Managing Your Portfolio Content

Your entire website is generated locally on your machine. You do not need to use a complex online dashboard.

### Adding New Photo Projects
1. Navigate to the `projects/` directory.
2. Create a new folder for your project (e.g., `projects/huge-festival`).
3. Drag and drop your `.jpg` or `.png` images into this folder.
   > **Note:** The script will automatically use a file named `thumbnail.jpg` as the cover photo. If there is no file named `thumbnail.jpg`, it will just use the first photo alphabetically.
4. Add a file named `info.txt` inside your new folder with the following format:
   ```text
   Title: Huge Festival 2025
   Description: Detailed description of the concert experience here.
   ```

### Editing Your Bio & Experience
Open the `about.txt` file located in the main folder. You can edit your name, headline, bio, and categorised list of experiences freely. 
- Create new categories by wrapping them in brackets like `[演出專場攝影]`.
- List each event on a new line in the format: `《Event Name》 (Year)` 

---

## 2. Previewing Changes Locally

Whenever you modify `about.txt` or change the contents of `projects/`, you **MUST** rebuild the website so the HTML files update.

1. Double-click the **`start.command`** file.
2. A terminal window will open and your browser will automatically launch to `http://localhost:8000`.
3. If you make further changes while the server is running, simply click the **"Rebuild Content ↻"** button hovering in the bottom right corner of your local webpage.

---

## 3. First-Time GitHub Setup (One-Time Only)

If this is your first time putting the project on GitHub, follow these steps:

1. Log in to [GitHub](https://github.com/) and click the **`+`** icon in the top right to create a **New repository**.
2. Name it something like `portfolio` (Make sure it is set to **Public**). Do NOT initialize it with a README or .gitignore.
3. Open Terminal on your Mac, navigate to your portfolio folder, and run these commands one by one (replace `YOUR_REPO_URL` with the URL GitHub gives you):
   ```bash
   git init
   git add .
   git commit -m "First release"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```
4. On your GitHub repository page, click the **Settings** tab.
5. On the left sidebar, click **Pages**.
6. Under **Build and deployment**, ensure Source is `Deploy from a branch`.
7. Under **Branch**, select `main` and `/ (root)` folder mapping, then click **Save**.

Your site will be live at `https://[your-username].github.io/portfolio` in 1-2 minutes!

---

## 4. updating the Live Website (Day-to-Day Deployment)

Whenever you rebuild your site locally using `start.command` and are happy with how it looks, you deploy it to GitHub pages right from your terminal.

Open your Terminal, navigate to your portfolio folder (`cd /Users/cancerhao/Documents/Personal/Photography_Portfolio`), and run these three commands:

```bash
# 1. Stage all the new folders, images, and HTML files
git add .

# 2. Commit the changes locally
git commit -m "Added new concert photos and updated bio"

# 3. Push the changes to GitHub
git push
```

Within a minute or two of typing `git push`, GitHub Pages will detect the newly updated `index.html` file and your live website will be updated automatically! No further setup required.
