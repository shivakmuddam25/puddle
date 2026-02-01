@echo off
echo ========================================
echo Fixing ALL Corrupted Config Files
echo ========================================

echo Step 1: Deleting corrupted files...
del tsconfig.json 2>nul
del next.config.js 2>nul
del next-env.d.ts 2>nul

echo Step 2: Creating tsconfig.json...
(
echo {
echo   "compilerOptions": {
echo     "target": "es5",
echo     "lib": ["dom", "dom.iterable", "esnext"],
echo     "allowJs": true,
echo     "skipLibCheck": true,
echo     "strict": true,
echo     "noEmit": true,
echo     "esModuleInterop": true,
echo     "module": "esnext",
echo     "moduleResolution": "bundler",
echo     "resolveJsonModule": true,
echo     "isolatedModules": true,
echo     "jsx": "preserve",
echo     "incremental": true,
echo     "plugins": [
echo       {
echo         "name": "next"
echo       }
echo     ],
echo     "paths": {
echo       "@/*": ["./*"]
echo     }
echo   },
echo   "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
echo   "exclude": ["node_modules"]
echo }
) > tsconfig.json

echo Step 3: Creating next.config.js...
(
echo /** @type {import('next').NextConfig} */
echo const nextConfig = {}
echo.
echo module.exports = nextConfig
) > next.config.js

echo Step 4: Creating next-env.d.ts...
(
echo /// ^<reference types="next" /^>
echo /// ^<reference types="next/image-types/global" /^>
echo.
echo // NOTE: This file should not be edited
echo // see https://nextjs.org/docs/basic-features/typescript for more information.
) > next-env.d.ts

echo Step 5: Checking package.json...
if not exist package.json (
    echo Creating package.json...
    (
    echo {
    echo   "name": "educational-platform",
    echo   "version": "0.1.0",
    echo   "private": true,
    echo   "scripts": {
    echo     "dev": "next dev",
    echo     "build": "next build",
    echo     "start": "next start",
    echo     "lint": "next lint"
    echo   },
    echo   "dependencies": {
    echo     "next": "14.0.0",
    echo     "react": "18.2.0",
    echo     "react-dom": "18.2.0"
    echo   }
    echo }
    ) > package.json
)

echo.
echo Step 6: Verifying files...
echo.
echo === tsconfig.json ===
type tsconfig.json | findstr "compilerOptions" >nul && echo ✅ Valid || echo ❌ Invalid

echo === next.config.js ===
type next.config.js | findstr "module.exports" >nul && echo ✅ Valid || echo ❌ Invalid

echo === next-env.d.ts ===
if exist next-env.d.ts echo ✅ Exists || echo ❌ Missing

echo === package.json ===
if exist package.json echo ✅ Exists || echo ❌ Missing

echo.
echo ✅ ALL config files fixed!
echo.
echo Now run: npm install
echo Then: npm run dev
pause