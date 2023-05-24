import express from 'express';
const router = express.Router();
import * as dotenv from 'dotenv'
import { CreateAllData, GetAllData, GetAllSector, GetAllTopic, GetAllYear, GetSector, GetStartYear, GetTopics } from '../services/dashboardServices.js';
dotenv.config();
import auth from '../middleware/auth.js';

// router.post('/all', async function(request, response){  //to add the given data to db
//     const data = request.body        
//     const result = await CreateAllData(data)
//     response.status(200).send(result);
//   })

router.get('/', async function(request, response){  //1000 data
  const result = await GetAllData(request)
try{
  if(result){
    console.log(result.length);
   response.status(200).send(result);
  //  response.status(200).send({data:result, msg: "success"});
  }else{
    response.status(404).send('No Data Found')
  }
}catch(error){
  response.status(500).send(error.message)
}  
})

router.get('/topic', async function(request, response){  //1000 data
  const result = await GetAllTopic(request)
try{
  if(result){
    // console.log(result.length);
    // console.log(result);
   response.status(200).send(result);
  //  response.status(200).send({data:result, msg: "success"});
  }else{
    response.status(404).send('No Data Found')
  }
}catch(error){
  response.status(500).send(error.message)
}  
})

router.get('/sector',  async function(request, response){  //1000 data
  const result = await GetAllSector(request)
try{
  if(result){
    // console.log(result.length);
    // console.log(result);
   response.status(200).send(result);
  //  response.status(200).send({data:result, msg: "success"});
  }else{
    response.status(404).send('No Data Found')
  }
}catch(error){
  response.status(500).send(error.message)
}  
})

router.get('/start_year', async function(request, response){  //1000 data
  const result = await GetAllYear(request)
try{
  if(result){
    // console.log(result.length);
    // console.log(result);
   response.status(200).send(result);
  //  response.status(200).send({data:result, msg: "success"});
  }else{
    response.status(404).send('No Data Found')
  }
}catch(error){
  response.status(500).send(error.message)
}  
})

router.get('/get/:filter/:topic', async function(request, response){  //1000 data

  const {topic, filter} = request.params
  console.log(filter, topic)

  if (filter === "topic"){
    var result = await GetTopics(topic)
  }else if (filter === "sector"){
    var result = await GetSector(topic)
  }else if (filter === "start_year"){
    console.log("working", topic)
    var result = await GetStartYear(+topic)
  }else(console.log(error))
  
try{
  if(result){
    console.log(result.length);
   response.status(200).send(result);
  //  response.status(200).send({data:result, msg: "success"});
  }else{
    response.status(404).send('No Data Found')
  }
}catch(error){
  response.status(500).send(error.message)
}

})
  
  export default router ;