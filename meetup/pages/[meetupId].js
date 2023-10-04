import { Fragment } from "react";
import MeetupDetail from "../components/meetups/MeetupDetail";
import { analyticsId } from "@/next.config";
function MeetupDetails() {
	return <MeetupDetail image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Massachusetts_Hall%2C_Harvard_University.JPG/640px-Massachusetts_Hall%2C_Harvard_University.JPG" title="First Meetup" address="Alycia Dr, Richmomd" description="This is a fisrt meetup" />;
}

export async function getStaticPaths() { // this function tells the react js with which parameters the dynamic pages should be pre-generated.
	return {
		fallback: false, // if fallback is set to false an error will be generated 404 if different meetupId is entered in URL apart from m1 and m2
		paths: [
			{
				params: {
					meetupId: "m1",
				},
			},
			{
				params: {
					meetupId: "m2",
				},
			},
		],
	};
}
export async function getStaticProps(context) {
	// fetch data for single meetup

	const meetupId = context.params.meetupId;
	console.log(meetupId);
	return {
		props: {
			meetupData: {
				id: meetupId,
				title: "First Meetup",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Massachusetts_Hall%2C_Harvard_University.JPG/640px-Massachusetts_Hall%2C_Harvard_University.JPG",
				address: "Alycia Dr, Richmomd",
				description: "This is a fisrt meetup",
			},
		},
	};
}

export default MeetupDetails;
