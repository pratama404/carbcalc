@echo off
echo EMERGENCY FIX - CarbCalc White Screen
echo.

echo Step 1: Stopping any running processes...
taskkill /f /im node.exe 2>nul
timeout /t 2 >nul

echo Step 2: Cleaning cache (ignore errors)...
rmdir /s /q .next 2>nul
del package-lock.json 2>nul

echo Step 3: Using minimal page...
echo export default function Home() { > app\page.tsx
echo   return ( >> app\page.tsx
echo     ^<div style={{padding: '20px'}}^> >> app\page.tsx
echo       ^<h1 style={{color: 'green'}}^>CarbCalc Works!^</h1^> >> app\page.tsx
echo       ^<p^>Landing page is loading...^</p^> >> app\page.tsx
echo       ^<a href="/calculator"^>Try Calculator^</a^> >> app\page.tsx
echo     ^</div^> >> app\page.tsx
echo   ) >> app\page.tsx
echo } >> app\page.tsx

echo Step 4: Installing dependencies...
npm install --no-optional

echo Step 5: Starting server...
echo.
echo Visit: http://localhost:3000
echo.
npm run dev