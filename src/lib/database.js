'use server'

import clientPromise from '@/lib/mongo'

async function getAllDocuments() {
	const client = await clientPromise;
  	const db = client.db(process.env.MONGODB_DB);
  	console.log('connected')
	const datasets = await db.collection('datasets').find({}).toArray();
	return datasets
}

async function insertDocument(name, description, cid) {
	const client = await clientPromise;
	const db = client.db(process.env.MONGODB_DB);
	const result = await db.collection('datasets').insertOne({
		name,
		description,
		cid
	});
}



export {getAllDocuments, insertDocument}