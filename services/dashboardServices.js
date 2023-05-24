import { client } from '../index.js';

export async function CreateAllData(data) {                
    return await client.db('dashboard').collection('data').insertMany(data);
}

export async function GetAllData(req) {            
    return await client.db('dashboard').collection('data').find({}).toArray();
}

export async function GetAllTopic(req) {            
    return await client.db('dashboard').collection('data').distinct("topic");
}

export async function GetAllSector(req) {            
    return await client.db('dashboard').collection('data').distinct("sector");
}

export async function GetAllYear(req) {            
    return await client.db('dashboard').collection('data').distinct("start_year");
}

export async function GetTopics(topic) {            
    return await client.db('dashboard').collection('data').find({topic:topic}).toArray();
}

export async function GetSector(topic) {            
    return await client.db('dashboard').collection('data').find({sector:topic}).toArray();
}

export async function GetStartYear(topic) {            
    return await client.db('dashboard').collection('data').find({start_year:topic}).toArray();
}
