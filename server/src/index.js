const express = require('express')
const cors=require('cors')
const app=express()
const PORT=5000

app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin: 'https://guessing-game-client-six.vercel.app',
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Origin, Content-Type,X-Requested-With'
}))

var number=0

function generateRandomNumber (min,max){
    do{
        number=Math.floor(Math.random()*(max-min))+min
    }while(new Set(number.toString()).size!==4)
    return number
}

const getNumber = (() => {  
    return () => {
      if (number === 0) {
        number = generateRandomNumber(1000,10000);
      }

      return number;
    };
  })();

app.post('/api/number',(req,res)=>{
    let number=getNumber()
    p=countP(req.body.number)
    m=countM(req.body.number)
    res.json({ countP: p, countM: m })

})

app.post('/reset',(req,res)=>{
  number=0
  res.status(200).send('Number is reset successfully')
})

app.get('/number',(req,res)=>{
  res.json(number)
})

const countM=(digits)=>{
  return [...digits].reduce((count,digit,index)=>{
    if(digit!=number.toString()[index]&&
      number.toString().includes(digit)
    ){
      count+=1
    }
    return count
  },0)
}

const countP=(digits)=>{
  return [...digits].reduce((count,digit,index)=>{
    if(digit==number.toString()[index]){
      count+=1
    }
    return count
  },0)
}

app.use("/",(req,res)=>{
  res.send(`Server is listening ${PORT}`)
})

app.listen(PORT,function(err){
    if (err) console.log(err)
    console.log(`Server started on PORT ${PORT}`)
})