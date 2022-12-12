//all the includes that we need to get the database working
const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const dotenv = require('dotenv').config();
const cors = require('cors');
// Create express app
const app = express();
const port = 6969;
// Create pool, allowing us to access the 
const pool = new Pool({
    user: "csce331_905_john",
    host: 'csce-315-db.engr.tamu.edu',
    database: "csce331_905_63",
    password: "john",
    port: "5432",
    ssl: {rejectUnauthorized: false}
});

//allows us to access the database and use it for the rest of the code
app.use(cors());
app.use(express.json());
//This is for serving into the react build folder from express
// app.use(express.static(path.join(path.dirname(path.basename(__dirname)), 'build')));
// console.log(path.dirname(path.basename(__dirname)));

//This is going to pull all the data from the sql database

//This is going to pull the data from the supply table
app.get('/supply', async (req, res) => {
    const team = await pool.query('select * FROM \"supply\";');
    res.json(team.rows);
    res.end();
  
});

//This allows us to get the specific things from the supply table NOTE:NOT FOR SCRUM 1
app.get('/supplydatestart/:startdate', async(req,res)=>{
    console.log("---------------------------------------")
    // console.log("Made it into the supplydate Start")
    date = req.params.startdate
    // console.log("This is the column values: ",column)
    // console.log("This is the date value for start: ",date)
    
    const data = await pool.query("select * FROM \"supply\" where date = '"+date+"';")
    console.log(" the data is ", data.rows)
    console.log("---------------------------------------")
    res.json(data.rows)
    res.end()
})

app.get('/supplydateend/:enddate', async(req,res)=>{
    console.log("------------------------------------")
    console.log("Made it into the supplydate End")
    date = req.params.enddate
    // console.log("This is the column values: ",column)
    // console.log("This is the value for the enddate: ",date)
    const data = await pool.query("select * FROM \"supply\" where date = '"+date+"';")
    // console.log("for this start column ",column," the data is ", data.rows)
    console.log("----------------------------------------")
    res.json(data.rows)
    res.end()
})

//Get the column names from the table NOTE: NOT FOR SCRUM 1
app.get('/column', async(req,res)=>{
    const data = await pool.query("SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'supply';")
    res.json(data.rows)
    res.end()
})
//This is going to pull the data from the order table
app.get('/order', async(req,res)=>{
    const data = await pool.query("select * from \"order\";");
    res.json(data.rows);
    res.end()
});

//getting some order from a start date and end date NOTE: NOT FOR SCRUM1
app.get('/certainorder/:startdate/:enddate',async(req,res)=>{
    console.log("We made it into the program");
    var startdate = req.params.startdate;
    var enddate = req.params.enddate;
    console.log("select * from \"order\" where orderdate>='"+startdate+"' and orderdate <= '"+enddate+"';")
    const data = await pool.query("select * from \"order\" where orderdate>='"+startdate+"' and orderdate <= '"+enddate+"';")
    res.json(data.rows)
    res.end;
})

//This is going to be pulling the data from the food table
app.get("/food", async(req,res)=>{
    const data = await pool.query("select* from \"food\";");
    res.json(data.rows);
    res.end;
});

//This add into the food table
app.post("/insertfood", async(req,res)=>{
    console.log("It is in");
    const foodId = req.body.foodId;
    const foodItem = req.body.foodItem;
    const price = req.body.price;
    const supply = req.body.supply;
    const foodimg = req.body.foodimg;

    console.log("INSERT INTO \"food\" (foodid, fooditem, price, supplies,foodimg) VALUES("+foodId+", '"+foodItem+"',"+price+", '"+supply+"', '"+foodimg+"');")
    pool.query(
        "INSERT INTO \"food\" (foodid, fooditem, price, supplies,foodimg) VALUES("+foodId+", '"+foodItem+"',"+price+", '"+supply+"', '"+foodimg+"');",
        // [foodId,foodItem,price,supply],
        // console.log("INSERT INTO \"food\" (foodid, fooditem, price, supplies) VALUES(?,?,?,?);",
        // [foodId,foodItem,price,supply],),
        (err,result) =>{
            if (err){
                console.log(err)
            }
            else{
                res.send("Value inserted in food database")
            }
        }
    );
});

//Updating the food table NOTE: NOT IN THIS SCRUM 1
app.post("/updatefood",async(req,res)=>{
    const foodId = req.body.foodId;
    const foodItem = req.body.foodItem;
    const price = req.body.price;
    const supplies = req.body.supplies;
    const image = req.body.image
    console.log("This is the foodId: ",foodId)
    console.log("UPDATE \"food\" SET fooditem=\'"+foodItem+"\',price="+price+",supplies='"+supplies+"',foodimg='"+image+"' WHERE foodid="+foodId+";")
    pool.query(
        "UPDATE \"food\" SET fooditem=\'"+foodItem+"\',price="+price+",supplies='"+supplies+"',foodimg='"+image+"' WHERE foodid="+foodId+";",
        (err,result) =>{
            if (err) {
                console.log("that rat can cook fr!");
                console.log("UPDATE \"food\" SET fooditem=\'"+foodItem+"\',price="+price+" WHERE foodid="+foodId+";");
                console.log(err);
            } else {
                res.send("Food table has successfully been updated with the new item!");
            }
        }
    );
});

//inserting the order into the order table 
app.post("/insertorder", async(req,res)=>{
    const orderId = req.body.orderId;
    const foodId = req.body.foodId;
    const quantity = req.body.quantity;
    const orderdate = req.body.orderdate;
    const amount = req.body.amount;
    console.log("INSERT INTO \"order\" (orderid, foodid, quantity, orderdate, amount) VALUES("+orderId+","+foodId+","+quantity+",'"+orderdate+"',"+amount+");");
    pool.query(
        "INSERT INTO \"order\" (orderid, foodid, quantity, orderdate, amount) VALUES("+orderId+","+foodId+","+quantity+",'"+orderdate+"',"+amount+");",
        (err,result) =>{
            if (err){
                console.log(err)
            }
            else{
                res.send("Value inserted in food database")
            }
        }
    );
});

//entering supplies into the supply datebase
app.post("/insertsupply", async(req,res)=>{
    const supplyItem = req.body.supplyItem;
    

    pool.query(
        "alter table \"supply\" add \""+supplyItem+"\" int;",
        (err,result) =>{
            if (err){
                console.log("pool hopping");
                console.log(err)
            }
            else{
                res.send("Value inserted in food database")
            }
        }
    );

    
});

//creating updating the supply table
app.post("/newsupply",async(req,res)=>{
    const supplyItem = req.body.supplyItem;
    const supplyQuantity = req.body.quantity;
    const orderdate = req.body.orderdate;
    pool.query(
        "update \"supply\" set \""+supplyItem+"\" = "+supplyQuantity+" where date>='"+orderdate+"';",
        (err,result) =>{
            if (err){
                console.log("window shopping");
                console.log("update \"supply\" set "+supplyItem+" = "+supplyQuantity+" where date>='"+orderdate+"';");
                console.log(err)
            }
            else{
                res.send("Value inserted in food database")
            }
        }
    )
});

//This is going to be in the serve react build folder from express
// app.get("*",async(req,res)=>{
//     res.sendFile(path.join(path.dirname(path.basename(__dirname)), 'build', 'index.html'));
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});