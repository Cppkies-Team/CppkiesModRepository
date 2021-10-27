set -e

export NODE_ENV=development
echo "Installing packages..."
cd apiLibrary
npm i
cd ../frontend
npm i
cd ../backend
npm i
cd ..
export NODE_ENV=production
cd apiLibrary
echo "Building api library..."
npm run prodBuild
cd ../frontend
echo "Building frontend..."
npm run build
cd ../backend
echo "Building backend..."
npx knex migrate:latest
npm run build
cd ..