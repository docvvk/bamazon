ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id int(11) NOT NULL AUTO_INCREMENT,
  product_name varchar(100) NOT NULL,
  department_name varchar(100) NOT NULL,
  price decimal(5,2) NOT NULL,
  stock_quantity int(100) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
('Macbook Pro','Apple','3200.50','300'),
('Sonata GL','Hyundai','26700','200'),
('USB 64gb','HP','43.99','100'),
('Sneakers','Reebok','89.99','500'),
('Alexa','Amazon','75.66','292'),
('Rotimaker','Rotomatic','1635.42','80'),
('Drill','Homedepot','109.99','373'),
('Air Conditioner','O-General','1705.00','695'),
('Jeans','Levis','99.39','5507'),
('Dumbells 25lb','GoodLife','59.29','1063'),
('Galaxy S7 Edge','Samsung','3200.50','300'),
('Laptop Case','Tomtoc','19.29','210'),
('Firestick','Amazon','33.99','170'),
('Bluetooth Sneakers','Bose','169.99','420'),
('Winter Tyre','Michelin','145.66','92'),
('Wireless Charger','Samsung','35.42','60'),
('Sunscreen','Fair & Lovely','29.99','173'),
('Yoga Mats','Nike','25.40','135'),
('Digital Camera','Nikon','1199.39','507'),
('Advil Caplets','Ibuprophen','20.09','103'); 

USE bamazon;

CREATE TABLE departments(
department_id int AUTO_INCREMENT,
PRIMARY KEY(DepartmentId),
department_name VARCHAR(50) NOT NULL,
overhead_costs DECIMAL(11,2) NOT NULL,
total_sales DECIMAL(11,2) NOT NULL
);

INSERT INTO departments (department_name, overhead_costs, total_sales) VALUES
('Apple', '80000', '0'),
('Hyundai', '300000', '2'),
('HP', '30000', '0'),
('Reebok', '10000', '0'),
('Amazon', '30000', '0'),
('Rotimaker','Rotomatic','1635.42','80'),
('Apple', '15000', '0'),
('Homedepot', '40000', '0'),
('O-General', '50000', '0'),
('Levis', '5000', '0'),
('GoodLife', '25000', '0'),
('Samsung', '75000', '0'),
('Tomtoc', '7000', '0'),
('Bose', '42000', '0'),
('Michelin', '55000', '0'),
('Fair & Lovely', '22000', '0'),
('Nike', '60000', '0'),
('Nikon', '120000', '0'),
('Ibuprophen', '20000', '0');

-- This creates the alias table TotalProfits that will exist only when requested by the executive 
SHOW TABLES;
CREATE VIEW bamazon.total_profits AS SELECT department_id, department_name, overhead_costs, total_sales, total_sales-overhead_costs AS total_profit FROM departments;






