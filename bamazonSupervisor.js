var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors/safe');
var Table = require('cli-table');
var connection = mysql.createConnection({
	host: 'localhost',
    user: 'root',
    port: 3306,
	password: 'password',
	database: 'Bamazon', 
});

var newDept = [];

connection.connect((err) => {
    if (err) throw err;
    // console.log(`Connected as ID: ${connection.threadId}\n`);
});

//creates the question that will be prompted to the user
var supervisorOptions = {
	properties:{
		eOptions:{
			description: colors.yellow('\nKey in one of the following options:\n \n1) View Product Sales by Department \n2) Create New Department\n')
		},
	},
};

prompt.start();

//gets the information responded by the user from the prompt
prompt.get(supervisorOptions, function(err, res){
	//this explains what should be done based on what the user answered to the prompt
	if(res.eOptions == 1){
		viewProductSales();
	} else if(res.eOptions == 2){
		createDepartment();
	} else {
		console.log('You picked an invalid choice!');
		connection.end();
	}
});

//creates the function to be run when the user picks option 1
var viewProductSales = function(){
	//creates a table for the data to be stored and displayed in node
	var table = new Table({
		head: ['Department ID', 'Department Name', 'Overhead Cost', 'Total Sales', 'Total Profit'],
		style: {
			head:['green'],
			compact: false,
			colAligns: ['center'],
		}
	});
	console.log(' ');
	console.log(colors.black.bgWhite.underline('----------PRODUCT SALES BY DEPARTMENT----------'));

	//connects to the mysql databased and grabs the information from the alias table called total_profits.  this table contains all information from the department database but also has an extra column that calculates how much the total profits are based on the overhead cost and the total sales made for each department
	connection.query('SELECT * FROM total_profits', function(err, res){
		if(err) console.log('Error: ' + err);

		//this loops through the data pulled from the totalprofits database and pushes it into the table above
		for(var i = 0; i<res.length; i++){
			table.push(
				[res[i].department_id, res[i].department_name, res[i].overhead_costs, res[i].total_sales, res[i].total_profit]
				);
		}

		console.log(' ');
		console.log(table.toString());
		connection.end();
	})
};

//creates the function to be run when the user selects option 2
var createDepartment = function(){

	//creates the questions to be prompted to the user when option 2 is selected - since the department id# auto increments the user doesn't have to enter anything for item id and since total sales is calculated based on sales made  the user doesn't input any data for total sales
	var newDepartment = {
		properties: {
			newDeptName:{ description: colors.magenta('Please enter the name of the new department you would like to add.')
			},
			newOverhead:{ description: colors.magenta('What are the overhead costs for this department?')
			},
		}
	}

	prompt.start();
	//gets the information the user entered for the prompt above
	prompt.get(newDepartment, function(err, res){

		//creates a variable to store the user responses
		var newDeptInfo = {
			deptName: res.newDeptName,
			overHeadNew: res.newOverhead,
			autoTotalSales: 0,
		};
		//pushes user responses to the array defined above by the variable newDept
		newDept.push(newDeptInfo);
		//connects to the mysql database Departments and inserts the information received from the user into the database to create a new department
		connection.query('INSERT INTO departments (department_name, overhead_costs, total_sales) VALUES (?, ?, ?);', [newDept[0].deptName, newDept[0].overHeadNew, newDept[0].autoTotalSales], function(err, result){
			if(err){
				console.log('Error: ' + err);
				connection.end();
			} else {
				console.log('');
				console.log(colors.blue.bgYellow.underline('NEW DEPARTMENT SUCCESSFULLY CREATED!'));
				console.log(' ');
				connection.end();
			}
		})
	})
};