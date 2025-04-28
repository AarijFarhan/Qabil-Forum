🚀 Project Setup Guide

Follow these steps to set up and run the project locally.

📦 Install Dependencies

First, install all the required Node.js packages:

npm install

⚙️ Environment Setup

Create a .env file in the root directory.

Copy the contents from .env.example and paste them into your .env file.

Update the following environment variable in .env:

MONGODB_CONNECTION_URL=your_mongodb_connection_string_here

Replace your_mongodb_connection_string_here with your actual MongoDB Atlas URL.

🚀 Start the Project

Run the development server using:

npm run dev

Nodemon will monitor file changes and automatically restart the server.

📁 Project Structure (Example)

root/
|
├— models/
├— routes/
├— controllers/
├— middlewares/
├— utils/
├— server.js
├— .env
├— .env.example
├— package.json
├— README.md

💬 Notes

Ensure MongoDB is running, or use a cloud database like MongoDB Atlas.

Verify that all environment variables are correctly configured in the .env file.

For production deployment, you can create a start script in package.json.


