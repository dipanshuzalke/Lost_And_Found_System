const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');

const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

let posts = [
    {
        id: uuidv4(),
        item: "phone",
        description: "I had lost my item",
        question: "What is my item",
        choose: "lost"
    }
];

//To get data for all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

//Serve the form
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

//To add a new post
app.post("/posts", (req, res) => {
    let {item, description, question, choose} = req.body;
    let id = uuidv4();
    posts.push({id, item, description, question, choose});
    res.redirect("/posts");
});

//To get one post using id
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

//To update specific post
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newDescription = req.body.description;
    let post = posts.find((p) => id === p.id);
    post.description = newDescription;
    console.log(post);
  res.render("show.ejs", { post })
})

//Serve the edit form
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});





