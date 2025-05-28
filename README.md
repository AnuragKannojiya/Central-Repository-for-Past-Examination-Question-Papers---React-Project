EduArchive: Central Repository for Past Examination Question Papers
Overview
EduArchive is a comprehensive online platform that hosts previous years' exam papers for all streams and departments. The website offers an intuitive, user-friendly interface that facilitates easy access, search, and download of exam papers, thereby significantly contributing to the academic success of students.

Features
Search and Filter: Users can search for exam papers by stream, department, and year.
Download: Users can download exam papers in PDF format.
User Authentication: Secure login and registration for students and administrators.
Admin Panel: Administrators can add, update, and delete exam papers.
Responsive Design: The website is accessible on various devices, including desktops, tablets, and smartphones.
Payment and Subscription: Users can subscribe to premium services for added features.
Tech Stack
Frontend: React.js, Tailwind CSS
Backend: Node.js with Express
Database: MongoDB
Authentication: JWT
Payment: Razorpay
Getting Started
Prerequisites
Node.js (v14 or higher)
npm or yarn
MongoDB
Installation
Clone the repository: ```bash git clone https://github.com/yourusername/eduarchive.git cd eduarchive ```

Install dependencies: ```bash npm install

or
yarn install ```

Create a .env.local file in the root directory with the following variables: ``` MONGODB_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret RAZORPAY_KEY_ID=your_razorpay_key_id RAZORPAY_KEY_SECRET=your_razorpay_key_secret NEXT_PUBLIC_APP_URL=http://localhost:3000 ```

Start the development server: ```bash npm run dev

or
yarn dev ```

Open http://localhost:3000 in your browser to see the application.

Demo Credentials
Admin User:

Email: admin@example.com
Password: password
Regular User:

Email: user@example.com
Password: password
Admin Portal
The admin portal provides a comprehensive dashboard for managing the platform:

Dashboard: Overview of site statistics and recent activity
Papers Management: Add, edit, and delete exam papers
User Management: View and manage user accounts
Analytics: View download statistics and user activity
Subscription Management: Manage user subscriptions and payment history
Payment Integration
The platform uses Razorpay for payment processing. In development mode, it uses a demo mode that simulates payments without actual transactions.

License
This project is licensed under the MIT License - see the LICENSE file for details.
