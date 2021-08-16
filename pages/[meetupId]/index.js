import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDatail';

function MeetupDetailPage(props) {
  const { id, image, description, title, address } = props.meetupData;
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <MeetupDetail
        id={id}
        image={image}
        description={description}
        title={title}
        address={address}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://mission:uFe7dTBgqWjXTnG@cluster0.x6pj1.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
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
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    'mongodb+srv://mission:uFe7dTBgqWjXTnG@cluster0.x6pj1.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const enteredMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: enteredMeetup._id.toString(),
        image: enteredMeetup.image,
        description: enteredMeetup.description,
        title: enteredMeetup.title,
        address: enteredMeetup.address,
      },
    },
  };
}

export default MeetupDetailPage;
