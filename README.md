# bamazon
Creating an Amazon-like storefront with the MySQL

In this activity, I will be creating an Amazon-like storefront with the MySQL skills I learned. The app will take in orders from customers and deplete stock from the store's inventory. 

Deployment

    Clone repo
    Run npm install
    At command prompt run node bamazonCustomer.js <option>

In order to carry out this task, I had to use several technologies among which we can mention:

    NodeJS
    JavaScript
    mysql
    npm mysql
    NPM inquirer
    NPM dotenv

If we execute the following command in the terminal:
node bamazonCustomer.js

First the user will see all the products that are in stock

![Image of bamazon app](https://github.com/sjosevich/bamazon/blob/master/images/Products_available.PNG)

Second, the user must select the product he wants to buy. If the selected product does not exist in inventory, the app will ask the user to select another product. If the product exists then the app will ask the user for the amount he wants to buy. If the user chooses an amount greater than the one in inventory then the app will ask to repeat the operation and if the quantity of products is smaller the app will update the quantity in the database and will provide the user with the new status of the products.

![Image of bamazon app](https://github.com/sjosevich/bamazon/blob/master/images/Units_left.PNG)
