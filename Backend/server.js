require('dotenv').config();
const express = require("express");
const cors=require('cors');
var db;
const {MongoClient,ObjectId}=require('mongodb');
MongoClient.connect(process.env.MONGO_URI)
.then((client)=>{
  db=client.db('Question_Paper_Generation_System');
   //Only for first time
  /* db.createCollection('users');
   /*
  db.createCollection('users');
  db.collection('users').insertOne({username:"admin",password:"admin123",role:"admin"});
  db.collection('users').insertOne({username:"t",password:"t1234",role:"teacher"});
  db.collection('users').insertOne({username:"t1",password:"t1",role:"teacher"});
  db.collection('users').insertOne({username:"t2",password:"t12",role:"teacher"});*/
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  
})
.catch((err)=>{console.log(err)})
const generatePaper = require('./generator');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} | Status: ${res.statusCode} | ${duration}ms`
    );
  });
  next();
}
app.use(requestLogger)  //custom middleware to log requests

app.get("/", (req, res) => {
  res.send("Backend Running");
});
//LOGIN API
app.post("/api/login", async (req,res)=>{
  const uname = req.body.username;
  const pass=req.body.password;
  const role=req.body.role;
  const user = await db.collection('users').findOne({username:uname,password:pass,role:role});
  if(user){
    res.status(200).send({ success:true});
  } else {
    res.status(200).send({ success:false});
  }
});

//SUBJECT APIS
app.get("/api/listsubject",async (req,res)=>{
  var subs=await db.collection('subjects').find().toArray();
  res.status(200).json(subs);
})
app.post("/api/addsubject",async (req,res)=>{
  const name=req.body.sname;
  const code=req.body.scode;
  const units=req.body.units;
  await db.collection('subjects').insertOne({name:name,code:code,units:units});
  var subs=await db.collection('subjects').find().toArray();
  res.status(200).json(subs);
})
app.delete("/api/delsubject/:name",async (req,res)=>{
  const name=req.params.name;
  await db.collection('subjects').deleteOne({name:name});
  var subs=await db.collection('subjects').find().toArray();
  res.status(200).json(subs);
})

//UNITS APIS
app.post("/api/addunit",async (req,res)=>{
  const name=req.body.sname;
  const unit=req.body.uname;
  await db.collection('subjects').updateOne({name:name},{$push:{units:unit}});
  var subs=await db.collection('subjects').find().toArray();
  res.status(200).json(subs);
})
app.delete("/api/delunit/:sname/:uname",async (req,res)=>{
  const sname=req.params.sname;
  const uname=req.params.uname;
  await db.collection('subjects').updateOne({name:sname,units:uname},{$pull:{units:uname}});
  var subs=await db.collection('subjects').find().toArray();
  res.status(200).json(subs);
})
app.patch("/api/editunit/:sname/:uname",async (req,res)=>{
  const sname=req.params.sname;
  const uname=req.params.uname;
  const newname=req.body.name;
  await db.collection('subjects').updateOne({name:sname,units:uname},{$set:{"units.$":newname}});//new concept
  var subs=await db.collection('subjects').find().toArray();
  res.status(200).json(subs); 
  })

  //QUESTION APIS

  app.get("/api/listqns",async (req,res)=>{
    var qns=await db.collection('questions').find().toArray();
    res.status(200).json(qns);
  })
  app.post("/api/addqn",async (req,res)=>{
    const subject=req.body.subject;
    const unit=req.body.unit;
    const qn=req.body.qn;
    const difficulty=req.body.difficulty;
    const marks=req.body.marks;
    const createdBy=req.body.tname;
    await db.collection('questions').insertOne({subject:subject,unit:unit,question:qn,difficulty:difficulty,marks:marks,createdBy:createdBy});
    var qns=await db.collection('questions').find().toArray();
    res.status(200).json(qns); 
  })
  app.get("/api/getqns", async (req, res) => {
    const qns = await db.collection("questions").find().toArray();
    res.status(200).json(qns);
  });
  app.delete("/api/deleteqn/:id", async (req, res) => {
    const id = req.params.id;
    await db.collection("questions").deleteOne({
      _id: new ObjectId(id)});
    const qns = await db.collection("questions").find().toArray();
    res.status(200).json(qns);
    });
  app.put("/api/updateqn/:id", async (req, res) => {
      
        const id = req.params.id;
        const updatedData = {
          subject: req.body.subject,
          unit: req.body.unit,
          question: req.body.qn,
          difficulty: req.body.difficulty,
          marks: req.body.marks,
          createdBy: req.body.tname
        };

        await db.collection("questions").updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData });
        const qns = await db.collection("questions").find().toArray();
        res.json(qns);
    });    

    
  //GENERATE QN API
  app.post('/api/generate-paper', async (req,res)=>{

  const { subject, units, difficulty, examtype } = req.body;
  let questions = await db.collection('questions').find({
    subject,
    unit: { $in: units }
  }).toArray();
  const result = generatePaper(questions, difficulty, examtype);
  if(result.error){
    return res.send({ message: result.error });
  }
  let content = "";
  if(examtype==="Assessment"){
  content += "SECTION A (2 Marks)\n\n";
  result.filter(q=>q.marks==="2")
  .forEach((q,i)=> content += `${i+1}. ${q.question}\n`);

  content += "\nSECTION B (8 Marks)\n\n";
  result.filter(q=>q.marks==="8")
  .forEach((q,i)=> content += `${i+6}. ${q.question}\n`);

  content += "\nSECTION C (16 Marks)\n\n";
  result.filter(q=>q.marks==="16")
  .forEach((q,i)=> content += `${i+9}. ${q.question}\n`);}
  else{
    content += "SECTION A (2 Marks)\n\n";
  result.filter(q=>q.marks==="2")
  .forEach((q,i)=> content += `${i+1}. ${q.question}\n`);

  content += "\nSECTION B (13 Marks)\n\n";
  result.filter(q=>q.marks==="13")
  .forEach((q,i)=> content += `${i+11}. ${q.question}\n`);

  content += "\nSECTION C (15 Marks)\n\n";
  result.filter(q=>q.marks==="15")
  .forEach((q,i)=> content += `${i+16}. ${q.question}\n`);
}
  
  const saved = await db.collection('papers').insertOne({
    subject,
    units,
    difficulty,
    examType: examtype,
    content,
    createdAt: new Date()
  });
  
  res.send({ qn: result ,message:"Generated", id: saved.insertedId });

});
//VIEW PAPER API
app.get('/api/papers', async (req,res)=>{
  const papers = await db.collection('papers')
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  res.send(papers);
});

app.get('/api/papers/:subject', async (req,res)=>{
  const subject = req.params.subject;
  const papers = await db.collection('papers').find({
    subject: subject
  }).sort({ createdAt: -1 }).toArray();
  res.send(papers);
});

app.get('/api/download/:id', async (req,res)=>{
  const { ObjectId } = require('mongodb');
  const paper = await db.collection('papers').findOne({
    _id: new ObjectId(req.params.id)
  });
  res.setHeader("Content-Disposition","attachment; filename=QuestionPaper.txt");
  res.setHeader("Content-Type","text/plain");
  res.send(paper.content);
});