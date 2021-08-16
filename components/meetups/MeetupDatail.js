import Image from 'next/image';
import classes from './MeetupDetail.module.css';

function MeetupDetail (props){
  return <div className={classes.detail}>
    <Image src={props.image} alt={props.title} />
    <h2>{props.title}</h2>
    <p>{props.address}</p>
    <p>{props.description}</p>
  </div>

};

export default MeetupDetail;