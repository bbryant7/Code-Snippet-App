# Code Snippet Organizer
A backend application that organizes code snippets a developer can save for later use. With this app, a user can log-in to the site and create a snippet with a title, a code snippet body and optional notes and tags. Users may also filter snippets by tag or language and delete snippets.

References:
https://newline.theironyard.com/cohorts/18/courses/10/objective_lessons/161
https://github.com/bbryant7/bef-week2-day3-mongoose-lecture
https://github.com/bbryant7/kitten-adoption

Dependencies for project:
* `npm install bluebird`
* `npm install body-parser`
* `npm install express`
* `npm install express-session`
* `npm install mongoose`
* `npm install mustache`
* `npm install mustache-express`

Steps to complete project:
- [X] create app.js file for routes
- [X] create models folder for schema
- [X] create schema
- [X] create views folder and mustache files
- [X] include boiler plate
- [X] connect models file: module.exports
example:
const kitten = mongoose.model('kitten', kittenSchema);
module.exports = kitten;
- [X] include startup console message for listen
- [X] create get and connect to mustache files
- [X] create route for login page, directs to home page
- [X] registration page
- [X] home page - renders title links for all snippets
- [X] create snippet form, filter language/tag forms
- [X] use post function and form inputs to add snippets to DB
- [X] create dynamic route to render specific snippet - do a findOne() for that title on the link button
- [X] create delete button for each details page
- [X] find snippet by db ID to delete (post route)
- [X] find snippet by language and render link title list by language (language filter)
- [X] find snippet by tag: render link title


To Do:
- [ ] give user ability to update code snippet
- [ ] create user info collection, and add users to DB with registration page.
- [ ] use code mirror to make code text look pretty
- [ ] force user to create one tag at a time
- [ ] create "tag" form
- [ ] display tags on page (push to tag array)
- [ ] submit tag array to schema when sending form
