const express = require("express")
const moment = require('moment')
const sgMail = require('@sendgrid/mail')

const cors = require('cors');
const corsOptions = {
    origin:'https://manyuduttaluri.web.app/'
    //origin:'http://localhost:3000'
}

require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY) 


const expressApp  = new express()

expressApp.use(cors({...corsOptions}))

expressApp.get('/', async function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
    const time =moment().utcOffset("+05:30").format()
    const message =  {
        to: process.env.REC_MAIL,
        from: process.env.SENDER_MAIL,
        subject: "Portfolio visited!", // Subject line
        name : "Portfolio Monitor",
        html: `<h1>Portfolio Visited!</h1><p>Someone visited the portfolio site just now.</p><p>Time stamp : ${time}. </p><p>Raw time stamp : ${moment().format()}</p> <p>Visitor's IP address : ${req.ip}</p><p>Visit <a href='https://console.firebase.google.com/u/0/'>Google Dashboard</a></p>`, // html body
       
      }
    
      sgMail.send(message).then((data )=>{
        res.status(200).send("Done")
      })
      .catch((err)=>{
          console.log(err);
          
          res.status(200).send("Some error.")
      })
      
  })
  
  expressApp.get('/shopee', async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
      const time =moment().utcOffset("+05:30").format()
      const message =  {
          to: process.env.REC_MAIL,
          from: process.env.SENDER_MAIL,
          subject: "Shop-ee visited!", // Subject line
          name : "Portfolio Monitor",
          html: `<h1>Shop-ee Visited!</h1><p>Someone visited the Shop-ee site just now.</p><p>Time stamp : ${time}. </p><p>Raw time stamp : ${moment().format()}</p> <p>Visitor's IP address : ${req.ip}</p>`, // html body
         
        }
      
        sgMail.send(message).then((data )=>{
          res.status(200).send("Done")
        })
        .catch((err)=>{
            console.log(err);
            
            res.status(200).send("Some error.")
        })
        
    })
    



expressApp.listen(process.env.PORT || 4999)