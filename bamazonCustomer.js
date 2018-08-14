var mysql = require('mysql');
var prompt= require('prompt');
var colors = require('colors/safe');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

var productPurchased = [];

connection.connect(((err) => {
    if (err) throw err;
    console.log(`Connected as ID: ${connection.threadId}`);
    readProducts();
}));

//connect to the mysql database and pull the information from the Products database to display to the user
function readProducts() {
    console.log(colors.bold.grey(`Products Available for Purchase...\n`));
    var query = connection.query("SELECT item_id, product_name, price FROM products", (err, result) => {
        if (err) throw err;

        //creates a table for the information from the mysql database to be placed
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Price'],
            style: {
                head: ['cyan'],
                compact: true,
                colAligns: ['center']
            }
        });

        //loops through each item in the mysql database and pushes that information into a new row in the table
        for (let i = 0; i < result.length; i++) {
            table.push([result[i].item_id, result[i].product_name, result[i].price]);   
        }
        console.log(table.toString());
        promptUser();
    });
} 

// promptUser will prompt the user for the item/quantity they would like to purchase
function promptUser() {

    //creates the questions that will be prompted to the user
    var productInfo = {
        properties: {
            item_id:
            {
                type: 'integer',
                message: 'Entry must be a number',
                required: true,
                description: colors.blue('Please enter the ID # of the item you wish to purchase!'),
            },
            quantity:
            {
                type: 'integer',
                message: 'Entry must be a number',
                required: true,
                description: colors.green('How many items would you like to purchase?')
            }
        }
    };

    prompt.start();

    //gets the responses to the prompts above
    prompt.get(productInfo, (err,res) => {

        var custPurchased = {
            item_id: res.item_id,
            quantity: res.quantity
        };
        productPurchased.push(custPurchased);

    	//connects to the mysql database and selects the item the user selected above based on the item id number entered
        connection.query('SELECT * FROM products WHERE item_id = ?', productPurchased.item_id, (err,res) => {
            if (err) console.log(err, 'That item ID does not exist!');

            if (res[0].stock_quantity < productPurchased[0].quantity) {
                console.log(colors.bgYellow.black(`Sorry ! THe item is out of stock !`));
                connection.end();
            }
        })



    });
}

