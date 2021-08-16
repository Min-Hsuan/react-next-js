import {MongoClient} from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';


function HomePage (props){
  return <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content="All meetups." />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
};

export async function getStaticProps (){
  const client = await MongoClient.connect('mongodb+srv://mission:uFe7dTBgqWjXTnG@cluster0.x6pj1.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();


  return {
    props: {
      meetups: meetups.map(meetup=>({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image
      }))
    },
    revalidate: 1
  }
}

export default HomePage;