@echo off
echo 🚀 Deploying Carbon Calculator to Railway...

echo.
echo 📦 Building the project...
call npm run build

echo.
echo 📝 Committing changes...
git add .
git commit -m "Deploy: %date% %time%"

echo.
echo 🌐 Pushing to repository...
git push origin main

echo.
echo ✅ Deployment initiated! Check Railway dashboard for status.
echo 🔗 Your app will be available at: https://your-app-name.railway.app

pause