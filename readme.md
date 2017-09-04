References:
https://newline.theironyard.com/cohorts/18/courses/10/objective_lessons/161
https://github.com/bbryant7/bef-week2-day3-mongoose-lecture
https://github.com/bbryant7/kitten-adoption
[X] create app.js file
[X] create models folder for schema
[X] create schema
[X] create views folder and mustache files
[X] install
  -Mongoose
  -blue bird
  -Express
  -mustache Express
  -mustache
  -body parser
[X] include boiler plate
[X] connect models file: module.exports
example
const kitten = mongoose.model('kitten', kittenSchema);
module.exports = kitten;
[X] create get and connect to mustache files
[X] create login page, directs to home page
[X] home page - renders all snippets
[X] create drop down menu of languages and submit button
[X]create link to render specific one - do a findOne() for that title on the link button
[X]-push registration info to the login array

[] use code mirror to make code text look pretty
[] read passport to create registration

ON alternative tag branch
[X] force user to create one tag at a time
[X] create "tag" form
[X] display tags on page (push to tag array)
[X] submit tag array to schema when sending form







ASSIGNMENT DETAILS:
Using Express and Mongoose, create an application that organizes code snippets that you save for later use.

At a minimum, snippets should have:

a title
a body (the code)
optional notes
a language
tags -- that is, user-defined words or phrases that classify the code, like "authentication", "front-end", "middleware", or "database".
Your application must:


[X]create login page
[X] create registration page
[X]allow you to create a snippet
[X]allow you to see a list of all your snippets
[X]allow you to see a list of all your snippets for a specific language
[X]allow you to see a list of all your snippets for a specific tag
[X] allow you to look at an individual snippet
[X]have an API to allow for creating and viewing of snippets as listed above
