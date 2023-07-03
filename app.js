const express = require("express");
const bodyParser = require ("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let Items = [];
let Work_Items = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function(req,res){

    let day = date();
    
    res.render("list", {listTitle: day, newListItems: Items});

});

app.post("/", function(req, res){
    let item = req.body.newItem;

    Items.push(item);

    res.redirect("/");
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: Work_Items})
});

app.post("/work", function(req, res){

    let Item = req.body.newItem;

    if (req.body.list === "Work") {
        Work_Items.push(Item);
        res.redirect("/");
    } else {
        res.redirect("/work");
    }

});

app.get("/about", function(req,res){
    res.render("about");
});


app.listen(3000, function(){
    console.log("Server Is Up And Running On Port 3000!");
});