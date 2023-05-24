import { client } from '../index.js';

export async function CreateUser(data) {                //✔️
    return await client.db('stackoverflow').collection('users').insertOne(data);
}

export async function getUserByName(email) {            //✔️
    return await client.db('stackoverflow').collection('users').findOne({email:email});
}

export async function getUserByEmail(email) {           //✔️
    return await client.db('stackoverflow').collection('users').findOne({email:email});
}

export async function getUserById(id) {                 //✔️
    return await client.db('stackoverflow').collection('users').findOne({userId:id});
}

export async function deleteUserById(id) {              //✔️
    return await client.db('stackoverflow').collection('users').deleteOne({userId:id});
}

export async function getAllUsers(req) {                //✔️
    return await client.db('stackoverflow').collection('users').find({}).toArray();
}

export async function EditUser({data},{id}) {                //✔️
    return await client.db('stackoverflow').collection('users').findOneAndUpdate({userId:id},{$set:{name:data.name , email: data.email, pp : data.pp}});
}
