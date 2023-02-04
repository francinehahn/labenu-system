<h1 align="center">API Rest Labenu System</h1>

##  ℹ️About
API REST developed with the objective of simulating Labenu system, an online programming school, and practicing Node.js, TypeScript, Express, Knex, and MySQL. CRUD (Create, Read, Update and Delete) requests were built respecting the semantics and organization necessary for the elaboration of an API with RESTful principles.

##  👩‍💻Developers
- <a href="https://github.com/francinehahn" target="_blank"><p>Francine Hahn</p></a>
- <a href="https://github.com/gioivieira" target="_blank"><p>Giovana Inez Vieira</p></a>
- <a href="https://github.com/mariafmf" target="_blank"><p>Maria Fernandez de Moura Ferro</p></a>

## 🔗Documentation
https://documenter.getpostman.com/view/25256145/2s8Z76uUD1

## ☑️Requests
- Get All Instructors
- Get All Students
- Get Students By Hobbies
- Get All Classes
- Update Instructor's Class
- Update Student's Class
- Update Class Module
- Create Instructor
- Create Student
- Create Class

## 💻Technologies
- Node.js
- TypeScript
- Express.js
- Knex.js
- MySQL

## 🛰Running the project
<pre>
  <code>git clone https://github.com/francinehahn/labenu-system.git</code>
</pre>

<pre>
  <code>cd labenu-system</code>
</pre>

<pre>
  <code>npm install</code>
</pre>

Create a file .env and complete the following variables:
<pre>
  <code>
    DB_HOST = ""
    DB_USER = ""
    DB_PASSWORD = ""
    DB_DATABASE = ""

    PORT = 3000
  </code>
</pre>

To add the tables to your database, run the following command:
<pre>
  <code>npm run migrations</code>
</pre>

To initialize the project:
<pre>
  <code>npm run start</code>
</pre>

Finally, you can use Postman or another similar tool to test the endpoints.
