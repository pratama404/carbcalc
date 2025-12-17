@echo off
echo Fixing CarbCalc dependencies and starting development server...

echo.
echo 1. Cleaning node_modules and package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

echo.
echo 2. Installing updated dependencies...
npm install

echo.
echo 3. Starting development server...
echo Visit: http://localhost:3000
echo.
npm run dev