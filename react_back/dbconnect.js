const mysql2_dbase = require('mysql2')

const conn = mysql2_dbase.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projects"
})

conn.connect( (error) =>
{
    if(error) throw error
    console.log('Connection Successful !')
})

module.exports = conn;