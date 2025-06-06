# MERN-Task Management System

A full-stack **Task Management System** built using the MERN stack. This application allows users to create, read, update, and delete tasks with a clean and responsive interface.

---

## 📁 Project Structure

---



## 🚀 Tech Stack

### Frontend

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- [React-icons](https://react-icons.github.io/react-icons/)

### Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [JWT](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- CORS

---

## 📦 Getting Started

 📁 Clone the Repository

```bash
git clone https://github.com/smitmorjariya/Task-Manager.git
```

 cd backend

```bash
npm install
```

Create a .env file inside the backend/ folder:

```bash
MONGO_URI=your_mongo_connection_string
SECRETT=your_jwt_secret   
//Admin invite token//
PORT=8000

```
##NOTE
 Role-Based Access Note
Currently, there is a minor issue with the admin invite token logic — even after entering the correct token during registration, new users are still being assigned the default "member" role.

To explore the admin functionalities (such as assigning tasks, creating or deleting users, etc.), kindly:

Go to your MongoDB database,

Locate the user with which you are currently signed in,

And manually update their role field to "admin".

After updating, reload the page, and the full admin interface will be visible for testing and demo purposes.



Start the backend server:

```bash
npm run dev
```
- The server will start on http://localhost:8000


---

## 🎨 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- The frontend will start on http://localhost:5173 (default Vite port)

## 🌐 API Routes
| Method | Route              | Description          |
|--------|--------------------|----------------------|
| GET    | /api/tasks         | Fetch all tasks      |
| POST   | /api/tasks         | Create a new task    |
| PUT    | /api/tasks/:id     | Update a task        |
| DELETE | /api/tasks/:id     | Delete a task        |


## Note
📌 Note on Frontend Implementation
I have implemented most of the backend functionalities in this project by myself, including API development, user authentication, data storage using MongoDB, and server-side logic.

However, due to time constraints, I leveraged existing resources and examples for some parts of the frontend, particularly for features like bar graphs, charts, and UI components. These sections may include code snippets or ideas adapted from online tutorials or libraries to ensure quick and effective visualization.

I acknowledge those contributions and intend to revisit and build/customize those parts further in the future.

## 🧑‍💻 Author

NG

Final Year B.Tech | IT

 
