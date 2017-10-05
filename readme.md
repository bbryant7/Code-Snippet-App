# Code Snippet Organizer
A backend application that organizes code snippets a developer can save for later use. With this app, a user can log-in to the site and create a snippet with a title, a code snippet body and optional notes and tags. Users may also filter snippets by tag or language and delete snippets.

References:
https://newline.theironyard.com/cohorts/18/courses/10/objective_lessons/161
https://github.com/bbryant7/bef-week2-day3-mongoose-lecture
https://github.com/bbryant7/kitten-adoption

Dependencies for project:
*`npm install bluebird`
*`npm install body-parser`
*`npm install express`
*`npm install express-session`
*`npm install mongoose`
*`npm install mustache`
*`npm install mustache-express`

Steps to complete project:
- [X] create app.js file
- [X] create models folder for schema
- [X] create schema
- [X] create views folder and mustache files
- [X] include boiler plate
- [X] connect models file: module.exports
example:
const kitten = mongoose.model('kitten', kittenSchema);
module.exports = kitten;

- [X] create get and connect to mustache files
- [X] create login page, directs to home page
- [X] home page - renders all snippets
- [X] create drop down menu of languages and submit button
- [X] create link to render specific snippet - do a findOne() for that title on the link button
- [X]-push registration info to the login array

To Do:
- [ ] use code mirror to make code text look pretty
force user to create one tag at a time
- [ ] create "tag" form
- [ ] display tags on page (push to tag array)
- [ ] submit tag array to schema when sending form
