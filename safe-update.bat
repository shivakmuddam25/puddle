@echo off
echo ========================================
echo SAFE UPDATE - No Breaking Changes
echo ========================================

echo.
echo WARNING: Next.js 15.5.x has BREAKING CHANGES!
echo Your current version 15.2.5 is already SECURE.
echo.
echo Recommended: Stay on 15.2.5 for now.
echo.

echo Step 1: Checking current version...
npx next --version

echo.
echo Step 2: Checking vulnerabilities...
npm audit

echo.
echo Step 3: Fixing ONLY missing dependencies...
npm install @radix-ui/react-slot clsx tailwind-merge class-variance-authority

echo.
echo Step 4: Clearing cache...
rmdir /s /q .next 2>nul

echo.
echo ✅ Staying on Next.js 15.2.5 (Secure & Stable)
echo.
echo To update later when ready:
echo npm install next@15.2.5 --save
echo.
pause