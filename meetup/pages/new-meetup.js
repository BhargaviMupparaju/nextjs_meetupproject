//our-domain.com/new-meetup
import NewMeetupForm from "/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
async function NewMeetupPage() {
	async function addMeetUpHandler(enteredMeetupData) {
		// now we want to send the request to the API route with the enteredmeetupdata from the form.
		try {
			const response = await fetch("/api/new-meetup", {
				method: "POST",
				body: JSON.stringify(enteredMeetupData),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.log(error);
		}

		// if it is outside server we need to give the url domain since it is localhost we just give the api path.

		const data = await response.JSON();
		console.log(data);
	}

	return (
		<Fragment>
			<Head>
				<title>Add a new Meetup</title>
				<meta name="description" content="Add your own meetups" />
			</Head>
			<NewMeetupForm onAddMeetup={addMeetUpHandler} />{" "}
		</Fragment>
	);
}

export default NewMeetupPage;
