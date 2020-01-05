var mysql = require("mysql");
var inquirer = require("inquirer");
var dotenv = require("dotenv")
dotenv.config();

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: process.env.DB_USER,
  
    // Your password
    password: process.env.DB_PASS,
    database: "bamazon_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
    
  });

  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      Buy_A_Product();
      //connection.end();
    });
  }

 var Buy_A_Product = function(){
     inquirer.prompt({
         name : "productToBuy",
         type: "input",
         message: "Please provide the product Id you want to by."
     }).then(function(answer1){
         var selection = answer1.productToBuy;
         connection.query("Select *from products where item_id=?", selection, function(err,res){
             if (err) throw err;
             if (res.length === 0){
                 console.log("Please select another product, this product doesn't exist")
                 Buy_A_Product();
             }else {
                 //console.log("The product is in inventory")
                 inquirer.prompt({
                     name: "quantity",
                     type: "input",
                     message: "How many units of the product you want to buy?"
                 }).then(function(answer2){
                     var quantity = answer2.quantity;
                     if (quantity > res[0].stock_quantity){
                         console.log("Sorry Insufficient quantity, we just have " + res[0].stock_quantity + " units of the product selected")
                         Buy_A_Product();
                     }else{
                            console.log("================")
                            console.log(res[0].product_name + "wants to buy or purchased " + selection + " units")
                            console.log("price of each unit = " + res[0].price)
                            console.log("Total price = " + quantity * res[0].price)
                            var newQuantity = res[0].stock_quantity - quantity
                            console.log("Total of " + res[0].product_name + " left " + newQuantity + " units")
                            connection.query(
                                "UPDATE products SET stock_quantity = " + newQuantity + " WHERE item_id = " + res[0].item_id, function(err,res){
                                    if (err) throw err;
                                    console.log("=================")
                                    console.log("Your purchased has been processed");
                                    console.log("=================")
                                    connection.end();
                                }
                            )
                         }
                 })
                }

         })
     })
 }