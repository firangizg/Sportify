# Sportify
Sportify is a web-based app that shows the sporting events around you, and allows you to post any recreational games you are organizing to get people to attend!

Run Locally

#1. Clone repo
$ git clone https://github.com/firangizg/Sportify.git
$ cd sportify

#2. Create .env File
duplicate .env.example in backend folder and rename it to .env

#3. Setup MongoDB
Local MongoDB
Install it from here
In .env file update MONGODB_URI=mongodb://localhost/sportify
OR Atlas Cloud MongoDB
Create database at https://cloud.mongodb.com
In .env file update MONGODB_URI=mongodb+srv://your-db-connection

#4. Run Backend
$ cd backend
$ npm install
$ npm start

#5. Run Frontend
$ cd frontend
$ npm install
$ npm start

#6. Seed Users and Products
Run this on browser: http://localhost:5000/api/seed
It returns admin email and password and 3 sample events

#7. Admin Login
Run http://localhost:3000/signin
Enter admin email and password and click signin
