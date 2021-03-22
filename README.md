# Node API Notices 
# Info :
This application offers API that allow an authentication on the server, and at the same time 'CRUD' operations on some notes    
All CRUD operations require you to be authenticated

# API endpoints
- GET https://notice-deploy-fw.herokuapp.com/
 Welcome page

- POST https://notice-deploy-fw.herokuapp.com/register
 User registration route : accept values : 
 
        {
            "ussername": String
            "email" : String
            "password" : String
        }
- POST https://notice-deploy-fw.herokuapp.com/login
 User log-in route : accept values : 
 
        {
            "ussername": String
            "password" : String
        }
- GET https://notice-deploy-fw.herokuapp.com/logout
 User log-out route 

 - GET https://notice-deploy-fw.herokuapp.com/notices
 Returns the notes of the authenticated user
 
 - POST https://notice-deploy-fw.herokuapp.com/notices
 Creating a new note : accept values : 
 
        {
            "title": String
            "content" : String
        }
       
- GET https://notice-deploy-fw.herokuapp.com/notices/:noteId
 Returns a note according to its id

 - PUT https://notice-deploy-fw.herokuapp.com/notices/:noteId
  Update the note : accept values : 
 
        {
            "title": String
            "content" : String
        }

 - DELETE https://notice-deploy-fw.herokuapp.com/notices/:noteId
 Delete a note ussing its id

 - DELETE https://notice-deploy-fw.herokuapp.com/users/:userId
  Delete a user ussing its id