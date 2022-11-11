import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Event(props) {
  const { event } = props;
  return (
    <Card>
      <Link to={`/event/${event.slug}`}>
        <img src={event.image} className="card-img-top" alt={event.name} />
      </Link>
      <Card.Body>
        <Link to={`/event/${event.slug}`}>
          <Card.Title>{event.name}</Card.Title>
        </Link>
        <Card.Text>{event.location}</Card.Text>
        <Card.Text>{event.dayAndTime}</Card.Text>
        <Card.Text>{event.participants} participants</Card.Text>
        <Link to={`/event/${event.slug}`}>
        <Button>Join in</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
export default Event;