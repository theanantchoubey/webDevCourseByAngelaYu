const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _ = require("lodash");

app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dx4xl.mongodb.net/${process.env.PROJECT_NAME}`, {useNewUrlParser: true});


const itemsSchema = {
    name: String
};
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
    name: "Welcome to your TodoList"
});
const item2 = new Item({
    name: "Hit the + button to add a new item."
});
const item3 = new Item({
    name: "<---- Hit this to delete an item."
});




const defaultItems = [item1, item2, item3];
const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", function (req, res) {


  
Item.find({}, function(err, foundItems){
    if(foundItems.length === 0){
        Item.insertMany(defaultItems, function(err){
            if(err){
            console.log(err);
            }else{
            console.log("Successfully inserted the defaultItems");
            };
        });
        res.redirect("/");
    }else{
        res.render('list', { listTitle:"Today", newListItems: foundItems });

    }
    });  
});

app.get("/:customListName" , function(req, res){

    const customListName = _.capitalize(req.params.customListName);
    List.findOne({name: customListName}, function(err, foundList){
        if(!err){
            if(!foundList){
                //Create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            }else{
                //Show an existing list
                res.render("list", { listTitle:foundList.name, newListItems: foundList.items })
            }
        }
    });
    
});


app.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });

    if(listName === "Today"){
        item.save();
        res.redirect("/");
    }else{
        List.findOne({name: listName}, function(err, foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    };
    
});

app.post("/delete", function(req, res){

    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    if(listName === "Today"){
        Item.findByIdAndRemove(checkedItemId, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Deleted the checked Item");
            };
        });
        res.redirect("/");
    }else{
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
            if(!err){
                res.redirect("/"+listName);
            }
        })
    }   
    
});



app.get("/about", function(req, res){
    res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function () {
    console.log("Server has started Successfully!");
});