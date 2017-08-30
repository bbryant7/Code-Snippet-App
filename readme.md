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
[] create login page, directs to home page
[] home page - renders all snippets
[] create drop down menu of languages and submit button
[] submit button directs to a specific filter of the snippets (title)
[] give each snippet a link - directs to a render of that specific snippet
[] create form
  -adds snippet to renders
[] create "tag" form




Using Express and Mongoose, create an application that organizes code snippets that you save for later use.

At a minimum, snippets should have:

a title
a body (the code)
optional notes
a language
tags -- that is, user-defined words or phrases that classify the code, like "authentication", "front-end", "middleware", or "database".
Your application must:


have registration and login*
allow you to create a snippet
allow you to see a list of all your snippets
allow you to see a list of all your snippets for a specific language
allow you to see a list of all your snippets for a specific tag
allow you to look at an individual snippet
have an API to allow for creating and viewing of snippets as listed above
