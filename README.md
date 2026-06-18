# PopX React App

React implementation of the PopX qualifier task: Landing, Signup, Login, and Account Settings screens, with form validation and a localStorage-based user store (signup -> login -> profile).

## Run locally
```
npm install
npm run dev
```

## Build for production
```
npm run build
```

## Push to GitHub
```
git init
git add .
git commit -m "PopX assignment"
git branch -M main
git remote add origin https://github.com/<your-username>/popx-app.git
git push -u origin main
```

## Deploy
- Vercel: go to vercel.com, "Add New Project", import the GitHub repo, leave default settings (Vite is auto-detected), Deploy.
- Netlify: go to netlify.com, "Add new site" -> "Import an existing project", connect the repo, build command `npm run build`, publish directory `dist`.
