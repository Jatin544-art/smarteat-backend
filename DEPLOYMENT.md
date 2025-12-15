# Deployment Guide — Vercel (frontend) + Render (backend)

This guide walks through deploying the Next.js frontend to Vercel and the Spring Boot backend to Render.

Prerequisites
- A GitHub (or Git provider) repository with this project pushed.
- Vercel account (for frontend) and Render account (for backend).

Frontend (Vercel)
1. Push your repository to GitHub.
2. In Vercel, click **New Project** → Import from GitHub and select this repo.
3. In the project settings set Environment Variables:
   - `NEXT_PUBLIC_API_URL` = `https://<your-backend>.onrender.com/api` (replace with your backend URL)
4. Build & Output settings (Vercel detects Next.js automatically):
   - Build Command: `npm run build`
   - Output Directory: (leave blank for Next.js app)
5. Deploy. Vercel will run the build and publish the frontend to a stable URL.

Backend (Render)
1. In Render, create a new **Web Service** and connect your GitHub repo.
2. For Environment:
   - Branch: `main` (or your deployment branch)
   - Build Command: `./mvnw -DskipTests package`
   - Start Command: `java -jar target/smarteat-backend-0.0.1-SNAPSHOT.jar`
3. Render provides a `PORT` environment variable. The application reads `PORT` (fallback 8080) because `server.port=${PORT:8080}` is set in `application.properties`.
4. Optionally, set the `SPRING_PROFILES_ACTIVE` or database credentials if you connect to a managed DB.
5. Deploy. Render will build using Maven and start your Spring Boot app.

CORS
The backend currently allows CORS from any origin (`@CrossOrigin(origins = "*")`). For production tighten this to your frontend URL.

Local Build & Smoke Test
- Frontend build (local):
```powershell
cd 'C:\Users\JATIN\Downloads\smarteat-backend'
npm install
npm run build
```
- Backend package (local):
```powershell
cd 'C:\Users\JATIN\Downloads\smarteat-backend\smarteat-backend'
.\mvnw.cmd -DskipTests package
java -jar target\smarteat-backend-0.0.1-SNAPSHOT.jar
```

Environment variables (Vercel)
- `NEXT_PUBLIC_API_URL` — the public API URL for the backend (include `/api`).

Notes & Next Steps
- I added `jsconfig.json` so imports using `@/...` resolve correctly for the Next.js build.
- I added `server.port=${PORT:8080}` to `application.properties` so hosts that provide `PORT` env (Render) work out of the box.
- If you want a single-host deployment, I can also add `Dockerfile`s and a `docker-compose.yml` to run both services together and push images to Docker Hub.

If you'd like, I can: push these changes to your GitHub, connect Vercel/Render, and complete the deployments — I'll need your permission and either access or you can follow the steps above while I guide.
