import MeetupList from "@/components/meetups/MeetupList";
const DUMMY_MEETUPS = [
	{
		id: "m1",
		title: "First Meetup",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Massachusetts_Hall%2C_Harvard_University.JPG/640px-Massachusetts_Hall%2C_Harvard_University.JPG",
		address: "Alycia Dr, Richmomd",
		description: "This is a fisrt meetup",
	},

	{
		id: "m2",
		title: "Second Meetup",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pyne_Hall%2C_Princeton_University.jpg/1024px-Pyne_Hall%2C_Princeton_University.jpg",
		address: "Princeton, New Jersey",
		description: "This is a second meetup",
	},
];

function HomePage(props) {
	return <MeetupList meetups={DUMMY_MEETUPS} />;
}
// SSG- static generation . here we will generate the data on server side and
// send the data to the client as html.

export async function getStaticProps() {
	return {
		props: {
			meetups: DUMMY_MEETUPS,
		},
		revalidate: 10,
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
