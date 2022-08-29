# notes-app
A note taking app implemented in NodeJS, Express and React. User authentication has been implemented using JSON Web Tokens, and Redux was used to
handle the global application state. An admin user is able to view all users, create new users and view a specific user's details. A normal user is able verify his details on first login.
A user can view notes that he has created, create new notes and delete existing notes.

<h2>Installation Guide:</h2>
1. You will first have to clone the notes-app project into your system. Open your terminal, navigate to your desired directory and clone the notes-app project 
from the <b>"main" branch</b>. <br><br>
2. Now that you've successfully cloned the notes-app project, you will have to install the project dependencies to be able to run the project code. On your
terminal, navigate into the "notes-app" directory and run the <b>"npm install"</b> command for the backend dependencies. After that, you will have to navigate to
the "frontend" directory inside the "notes-app" directory (i.e '../notes-app/frontend') and once again run the <b>"npm install"</b> command to download the dependencies
for the react frontend. <br><br>
3. Before running the notes-app project, you will have to run the intial seed file to obtain the initial admin details. For that, whilst inside the "notes-app"
directory run the npm script <b>"npm run seed"</b>. After successfully running, you should see the initial admin email and password on your terminal. You will be able
to login into the system with these details <br><br>
4. Finally, we can run the notes-app project. While making sure you're in the "notes-app" directory, run the script <b>"npm run dev"</b>. This will start up both the
backend server and frontend client. and the application will start up on localhost:3000 in your browser. You are now able to use notes-app :)
