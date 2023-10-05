import { MongoClient } from "mongodb";
// api code will run on the server side.

// /api/new-meetup

//this function will execute if any request is routed to the above url

async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body; // the data that comes from the request body

		const { title, image, address, description } = data; // destructuring the data that comes in the body.

		const client = await MongoClient.connect("mongodb+srv://bhargavi:maruthi@cluster0.xdp8woi.mongodb.net/meetups?retryWrites=true&w=majority");
		const db = client.db();

		const meetupsCollection = db.collection("meetups"); // collection is nothing the meetups documents. all documents under one collection.
		//mangodb saves the document as object.

		const result = await meetupsCollection.insertOne(data);

		console.log(result);

		client.close();

		res.status(201).json({ message: "Meetup inserted!" }); // response for the successfull insertion.
	}
}

export default handler;
