# 📝 Simple Blog Platform  

A **full-stack mini project** that demonstrates how to build a simple blogging platform using **Spring Boot**, **React.js**, and an **H2 Database**.  
Users can register, log in, create posts, edit or delete them, and visitors can view and comment on posts.

> **GitHub Repository:** [cyberbuddyshivam/Blog-Platform-MiniProject](https://github.com/cyberbuddyshivam/Blog-Platform-MiniProject)

---

## 🚀 Project Overview  

The **Simple Blog Platform** is designed as a beginner-friendly yet full-featured project to understand the fundamentals of full-stack web development.  

It includes:  
- A **Spring Boot backend** for handling all API requests, business logic, and database operations.  
- A **React.js frontend** for user interaction and a clean, responsive UI.  
- An **H2 in-memory database** for rapid development and zero-setup persistence.  

This project serves as a great foundation for anyone learning **CRUD operations**, **user authentication**, and **data relationships** between entities such as **Users**, **Posts**, and **Comments**.

---

## 🌟 Features  

✅ **User Authentication**  
- Register new users.  
- Log in securely using credentials.  
- Each user can manage their own posts.

✅ **Post Management (CRUD)**  
- Create, read, update, and delete blog posts.  
- Each post belongs to a user.  
- Display posts with title, content, author, and timestamps.

✅ **Public Access & Comments**  
- Public visitors can browse all posts.  
- Logged-in users or visitors can add comments to posts.  
- Each post can have multiple comments (one-to-many relationship).

✅ **Responsive Frontend**  
- Built with React.js for an intuitive, fast, and modern user experience.  
- Works on desktop and mobile devices.

---

## 🧠 Skills Learned  

Through this project, you’ll gain hands-on experience with:
- **CRUD operations** (Create, Read, Update, Delete).  
- **RESTful API development** using Spring Boot.  
- **User authentication & authorization.**  
- **Frontend-backend integration** with REST APIs.  
- **Data relationships:**  
  - One user → many posts.  
  - One post → many comments.  
- **State management** and asynchronous data fetching in React.  
- **H2 Database** setup and integration with JPA.

---

## 🧱 Tech Stack  

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | React.js | Interactive and responsive user interface. |
| **Backend** | Spring Boot (Java) | Handles REST APIs, authentication, and business logic. |
| **Database** | H2 Database | Lightweight, in-memory database for rapid prototyping. |
| **Build Tools** | Maven & npm | Build automation for backend and frontend respectively. |
| **Version Control** | Git & GitHub | Source code management and collaboration. |

---

## 🏗️ Architecture Overview  

    ┌────────────────────┐
    │     React.js       │
    │  (Frontend UI)     │
    └────────┬───────────┘
             │ REST API Calls (HTTP)
    ┌────────▼───────────┐
    │   Spring Boot      │
    │ (Backend Logic)    │
    └────────┬───────────┘
             │ JPA / Hibernate ORM
    ┌────────▼───────────┐
    │     H2 Database    │
    │ (In-Memory Data)   │
    └────────────────────┘

---

## 📁 Folder Structure  

Blog-Platform-MiniProject/
│
├── blog-backend/ # Spring Boot backend
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/... # Controllers, Models, Services
│ │ │ ├── resources/ # application.properties
│ │ └── test/... # Unit tests
│ └── pom.xml # Maven configuration
│
├── blog-frontend/ # React frontend
│ ├── public/ # Static assets
│ ├── src/ # Components, Pages, Hooks, etc.
│ ├── package.json # Frontend dependencies
│ └── README.md
│
└── README.md # Main project README

---

## ⚙️ Getting Started  

Follow these steps to run the project locally:

### 1️⃣ Prerequisites  

Make sure you have the following installed:  
- [Node.js](https://nodejs.org/) (v14 or above)  
- [npm](https://www.npmjs.com/) (or Yarn)  
- [Java JDK](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (v11 or above)  
- [Maven](https://maven.apache.org/)  
- Git  

---

### 2️⃣ Clone the Repository  

```bash
git clone https://github.com/cyberbuddyshivam/Blog-Platform-MiniProject.git
cd Blog-Platform-MiniProject
3️⃣ Setup and Run the Backend
cd blog-backend
mvn spring-boot:run


This starts the backend server (default port: 8080).
Access the H2 database console at:
👉 http://localhost:8080/h2-console

Use the credentials specified in application.properties.
4️⃣ Setup and Run the Frontend

In a new terminal:

cd blog-frontend
npm install
npm start


This starts the React frontend (default port: 3000).
Visit 👉 http://localhost:3000 in your browser.

🔍 Usage

Register / Login as a new user.

Create a new blog post — add title, body, and submit.

Edit or delete your posts anytime.

Browse posts by other users.

Add comments under any public post.

🧩 Data Relationships
Entity	Relationship	Description
User → Post	One-to-Many	Each user can create multiple posts.
Post → Comment	One-to-Many	Each post can have multiple comments.
🚧 Future Enhancements

🔹 File/Image upload support
🔹 Rich-text editor (Quill.js / Draft.js)
🔹 User roles (Admin / Author / Reader)
🔹 Email verification for signup
🔹 Pagination & search filters
🔹 JWT-based authentication for API security
🔹 Deployment on cloud (e.g., Vercel + Render/Heroku)
📜 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it with attribution.

## 👨‍💻 Author  

**Shivam Sharma**  
💻 [GitHub](https://github.com/cyberbuddyshivam)  
🔗 [LinkedIn](https://www.linkedin.com/in/cyberbuddyshivam/))  
✉️ [Email](mailto:shivam1110sharma@gmail.com)

⭐ Don’t forget to star the repository if you found it helpful!
