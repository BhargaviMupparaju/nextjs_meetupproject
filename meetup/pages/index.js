import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
function HomePage(props) {
	return;
	<Fragment>
		<Head>
			<title>React Meetups</title>
			<meta name="description" content="Browse a huge list of active meetups" />
		</Head>
		<MeetupList meetups={props.meetups} />;
	</Fragment>;
}
// SSG- static generation . here we will generate the data on server side and
// send the data to the client as html.

export async function getStaticProps() {
	const client = await MongoClient.connect("mongodb+srv://bhargavi:maruthi@cluster0.xdp8woi.mongodb.net/meetups?retryWrites=true&w=majority");
	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const meetups = meetupsCollection.find().toArray();

	client.close();
	return {
		props: {
			meetups: (await meetups).map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
}

// suppose if the data changes frequently. we need to make sure the page get updated even after the deployment.
// for that we have revalidate property in getstaticprops to rebuild the page after mentioned number of seconds.
//to avoid rebuild again and again we can use this.

// sometimes revalidate is not enough for our application, if we have to regenerate the page for every request to server we can use below one.
// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;

// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export default HomePage;
