var express=require('express');
var app = express();

var path= require('path');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.listen(3000,(request,response)=>{
  console.log("server started:3000");
});

app.get('/',(request,response)=>{
  //response.setHeader("Content-Type","text/html");
  //response.end("<h1>Hello from NodeJS</h1>");
  response.render('index',{'msg':'Login Form'});
});

app.get('/createEmployee',(request,response)=>{
  response.render('createEmployee');
});

app.get('/home',(request,response)=>{
  response.render('home');
});





var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

var con=require('./db');

app.post('/loginCheck',(request,response)=>{
  var uid=request.body.uid;
  var pass=request.body.pwd;
  var sql="select * from login where uid='"+uid+"' and pass='"+pass+"'";
  con.query(sql,(err,result)=>{
    if(err) throw err;
    else if (result.length>0)
      response.render('home');
      else
    response.render('index',{'msg':'Login Fail'});
  });
});
app.post('/employeeInsert',(request,response)=>{
  var id=request.body.id;
  var name=request.body.name;
  var salary=request.body.salary;
  var sql="insert into employee values( "+id+",'"+name+"',"+salary+")";
  con.query(sql,(err,result)=>{
    if(err) throw err;
    else
    response.render('createEmployee',{'msg':'Data added successfully'});
  });
});

app.post('/employeeUpdate',(request,response)=>{
  var id=request.body.id;
  var name=request.body.name;
  var salary=request.body.salary;
  var sql="update employee set name='"+name+"', salary="+salary+" where id="+id;
  //console.log(sql);
  con.query(sql,(err,result)=>{
    if(err) throw err;
    else{
      var sql3="select * from employee";
      con.query(sql3,(err,result)=>{
        if(err) throw err;
        else
        response.render('viewEmployee',{'list':result,'msg':'updated successfully'});
      });
    }

  });
});

app.get('/viewEmployee',(request,response)=>{
  var sql="select * from employee";
  con.query(sql,(err,result)=>{
    if(err) throw err;
    else{

    response.render('viewEmployee',{'list':result});
  }
  });
});

app.get('/deleteEmp',(request,response)=>{
  var id=request.query.id;
  var sql="delete from employee where id='"+id+"'";
  con.query(sql,(err,result)=>{
    if(err) throw err;
    else{
      var sql2="select * from employee";
      con.query(sql2,(err,result)=>{
        if(err) throw err;
        else
        response.render('viewEmployee',{'list':result,'msg':'Deleted successfully'});
      });
    }
  });
});

app.get('/updateEmp',(request,response)=>{
  var id=request.query.id;
  var sql=" select * from employee where id ="+id;
  con.query(sql,(err,result)=>{
    if(err) throw err;
    else{
      response.render('viewOneEmployee',{'list':result});
    }
  });
});
