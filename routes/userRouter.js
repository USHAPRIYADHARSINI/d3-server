import express from 'express';
const router = express.Router();
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
dotenv.config();
import crypto from "crypto";
import { CreateUser, getUserByEmail } from '../services/userServices.js';

async function genHashedPassword(password){
    const NO_OF_ROUND = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUND);
    const hashedPassword = await bcrypt.hash(password,salt);
    console.log(salt);
    console.log(hashedPassword);
    return hashedPassword;
  }

router.post('/login', async function(request, response){          //✔️
    const {email,password} = request.body;  
    const userFromDb = await getUserByEmail(email);
    // const userbyid = await getUserById(userFromDb.id)
    // console.log(userbyid);
    if(!userFromDb){
      response.status(400).send({msg:"Invalid Credentials or user doesnot exist"})
    }
    else{
    const storedPassword = userFromDb.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword); 
    console.log(password,storedPassword)
    if(isPasswordMatch){
      const token = jwt.sign({id:userFromDb.id,email}, process.env.SECRET_KEY)
      response.send({msg:"Login Successfully",token:token,userDetail:userFromDb})
      console.log(token)
    }else{
      response.status(400).send({msg:"Invalid Credentials"})
    }
    }
  })

  router.post('/signup', async function(request, response){     //✔️
    const {name,email,password} = request.body; 
    console.log(request.body)

    const userFromDb = await getUserByEmail(email);
    const userid = crypto.randomBytes(16).toString("hex");

    if(userFromDb){
      response.status(200).send({msg:"User Already Exist"})
    }else{
      const hashedPassword = await genHashedPassword(password);
      console.log(password, hashedPassword)
      const result = await CreateUser({
        name:name,                    //unique
        email:email,                  //unique
        password:hashedPassword,      //unique
        userId: userid,               //unique
      });
      response.send({msg:"user created"})
    }
  })

export default router ;