var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
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
     }).then(function(answer){
         var selection = answer.productToBuy;
         connection.query("Select *from products where item_id=?", selection, function(err,res){
             if (err) throw err;
             if (res.length === 0){
                 console.log("Please select another product, this product doesn't exist")
                 Buy_A_Product();
             }else {console.log("The product is in inventory")}

         })
     })
 }