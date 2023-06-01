const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const conn = require("./dbconnect");

const app = express();
const port = 3005;


app.use(cors());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/api/login',(req,res) => {

    const email=req.body.email;
    const password=req.body.password;

    const sql = "insert into login (email,password) values( '" +email+ "' , '" +password+ "')";

    conn.query(sql, (err,result) =>{
        
        if (err) throw err

    res.send("Registration Successful")

    })

})


app.post('/api/register_me', (request, response) => {
    const {firstname,lastname,username,password,confirm_password,email,contact,date} = request.body
    const new_registry = "insert into register_1 (f_name,l_name,u_name,p_word,confirm_pword,email,contact,date) " + 
    " values('"+firstname+"' , '"+lastname+"' , '"+username+"' , '"+password+"' , '"+confirm_password+"' , '"+email+"', '"+contact+"','"+date+"')";

    conn.query(new_registry, (error,result) =>{
        if (error) throw error
        response.send("User registration successful")
    });

});

app.post('/api/getstaffinfo', (req,res) => {
    //Code to get staff records
    const getStaff_recs = "select * from register_1 where status = 'active'";

    conn.query(getStaff_recs, (error, result) => {
        if (error)
        {
            // throw(error)
        res.status(500).send({ error : "Database Error"});
        }
        res.status(200).send(result);
        
});

});


app.post('/api/del_records', (request, response) => {
    const { id} = request.body
    const delete_staff_sql = "update register_1 set status = 'inactive' where id = '"+ id +"' ";

    conn.query(delete_staff_sql, (error,result) =>{
        if (error) throw error
        response.send("User Information Deleted Successfully")
    });

});


app.post('/api/getUniquestaffId', (req,res) => {
    //Code to get staff records
    const { id} = req.body
    const getStaff_recs = "select * from register_1 where status = 'active' and id = '"+id+"' ";

    conn.query(getStaff_recs, (error, result) => {
        if (error)
        {
            // throw(error)
        res.status(500).send({ error : "Database Error"});
        }
        res.status(200).send(result);
        
});

});



app.post('/api/update_records', (request, response) => {
    const {id,firstname,lastname,username,password,confirm_password,email,contact,date} = request.body
    const staffUpdaterec = "update register_1 set " + 
    " f_name = '"+firstname+"' ,l_name = '"+lastname+"' , u_name ='"+username+"' ,p_word = '"+password+"' " +
    " ,confirm_pword = '"+confirm_password+"' , email = '"+email+"', contact = '"+contact+"',date = '"+date+"' where id = '"+id+"' ";

    conn.query(staffUpdaterec, (error,result) =>{
        if (error) throw error
        response.send("User Update successful")
    });

});


app.post('/api/new_user_data',(req,res) => {

    const username=req.body.username;
    const email=req.body.email;
    const contact=req.body.contact;

    const sql_data = "insert into new_data (username,email,contact) values( '"+username+"','" +email+ "' , '" +contact+ "')";

    conn.query(sql_data, (err,result) =>{
        
        if (err) throw err

    res.send("Registration Successful")

    })

})


app.listen(port, () => {
    console.log('App listening at http://localhost:${port}');
});