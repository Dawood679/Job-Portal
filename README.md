# 🎯 Job Portal

A full-stack job portal web application where **Students** can search and apply for jobs, and **Recruiters** can post and manage job listings.

---

## 🚀 Features

### 👨‍🎓 Student
- Register and manage profile  
- Browse and search job postings  
- Apply for jobs  
- Track application status  

### 🏢 Recruiter
- Register and create company profile  
- Post new job opportunities  
- Manage job listings  
- Review applications from students  

### ⚙️ General
- Authentication & Authorization (Students / Recruiters)  
- Secure password handling  
- Responsive UI design  
- Real-time updates (if implemented)  

---

## 🛠️ Tech Stack
- **Frontend:** React 
- **Backend:** Node.js, Express  
- **Database:** MongoDB 
- **Authentication:** JWT 
- **Styling:** TailwindCSS  

---

## 📂 Project Structure
    
    job-portal/
    │-- backend/ # Express server, APIs, models
    │-- frontend/ # React  frontend
    │-- README.md # Project documentation




---

## ⚡ Installation & Setup

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/job-portal.git
   cd job-portal

   
    cd backend && npm install
    cd ../frontend && npm install

2. Configure environment variables
Create a .env file inside backend/:
    ```bash
    PORT=
    MONOG_DB=
    SECRET_KEY=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=



# Backend
    
    cd backend
    npm run dev


# Frontend
   
    cd ../frontend
    npm start
