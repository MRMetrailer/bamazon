// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "M!ntch0c",
    database: "bamazon_db"
});

// connect to the mysql server and display items
connection.connect(function (err) {
    if (err) throw err
    displayInventory()
});

// display items function
function displayInventory() {
    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        var displayTable = new table({
            head: ["ID", "Product Name", "Department Name", "Price", "Quantity"],
            colWidths: [10, 30, 20, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            )
        }
        console.log(displayTable.toString());
        purchase()
    });
}

// purchase and update database function
function purchase() {
    inquirer.prompt([{
        type: "input",
        name: "item_id",
        message: "Enter the id of the item you would like to purchase",
        validate: validateInput,
        filter: Number
    },
    {
        type: "input",
        name: "quantity",
        message: "How many of this item would you like to purchase?",
        validate: validateInput,
        filter: Number
    }
    ])
        .then(function (purchase) {
            let item = purchase.item_id
            let quantity = purchase.quantity

            let queryStr = 'SELECT * FROM products WHERE ?';

            connection.query(queryStr, { item_id: item }, function (err, res) {
                if (err) throw err

                if (res.length === 0) {
                    console.log("Invalid Item ID. Please select a valid Item ID.")
                    displayInventory()
                } else {

                    var productInfo = res[0]

                    if (quantity <= productInfo.stock_quantity) {
                        console.log(productInfo.product_name + " in stock! Placing order now!")
                        console.log("\n")

                        var updateQueryStr = "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity - quantity) + " WHERE item_id = " + item

                        connection.query(updateQueryStr, function (err, data) {
                            if (err) throw err;

                            console.log("Your order has been placed!");
                            console.log("Your total is $" + productInfo.price * quantity)
                            console.log("\n")

                            reprompt();
                        })
                    } else {
                        console.log("Sorry, there is not enough " + productInfo.product_name + " in stock.")
                        console.log("Your order can not be placed as is.")
                        console.log("Please modify your order or select another item.")
                        console.log("\n")

                        setTimeout(function () { displayInventory() }, 3000)
                    }
                }
            });
        });
}

// validate user input function
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value))
    var sign = Math.sign(value)

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a valid number.'
    }
}

// ask user if they would like to purchase another item function
function reprompt() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "reply",
            message: "Would you like to purchase another item?"
        }
    ]).then(function(ans) {
        if(ans.reply) {
            displayInventory();
        } else {
            console.log("Thanks for shopping at Bamazon!");
            connection.end();
        }
    });
}
