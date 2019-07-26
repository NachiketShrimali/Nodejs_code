var mysql = require('mysql');

var con = mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'',
  database:'Edbms'
});

con.connect(function (err) {
  if (err) throw err;
  else {
    console.log("MySQL Database connected Successfully");
  }
});

//var sql="insert into employee values(101,'Nachi',120000.0)";
//var sql="update employee set name='KK' where id =101";
//var sql="delete from employee where id=101";
/*var sql="select * from employee";
con.query(sql,(err,result)=>{
  if(err) throw err;
  else
    console.log(result);
});
*/
module.exports=con;
