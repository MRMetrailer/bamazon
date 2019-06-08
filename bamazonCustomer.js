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

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
});

// display all items in the table
function start() {
    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        var displayTable = new table({
            head: ["ID", "Product Name", "Department Name", "Price", "Quantity"],
            colWidths: [10, 30, 20, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        purchase();
    });
}
start();