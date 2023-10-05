import { Fragment, Objec } from "react";
import MeetupDetail from "../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails() {
	return;
	<Fragment>
		<Head>
			<title>{props.meetupData.title}</title>
			<meta name="description" content={props.meetupData.description} />
		</Head>
		<MeetupDetail image={props.meetupData.image} title={props.meetupData.title} address={props.meetupData.address} description={props.meetupData.description} />
	</Fragment>;
}

export async function getStaticPaths() {
	// this function tells the react js with which parameters the dynamic pages should be pre-generated.
	const client = await MongoClient.connect("mongodb+srv://bhargavi:maruthi@cluster0.xdp8woi.mongodb.net/meetups?retryWrites=true&w=majority");
	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();

	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}
export async function getStaticProps(context) {
	// fetch data for single meetup

	const meetupId = context.params.meetupId;
	const client = await MongoClient.connect("mongodb+srv://bhargavi:maruthi@cluster0.xdp8woi.mongodb.net/meetups?retryWrites=true&w=majority");
	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const selectedMeetup = meetupsCollection.findOne({ _id: ObjectId(meetupId) }); //

	client.close();
	return {
		props: {
			meetupData: {
				id: (await selectedMeetup)._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetupDetails;
