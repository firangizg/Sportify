import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, event: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function EventScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const { slug } = params;
  const [{ loading, error, event }, dispatch] = useReducer(reducer, {
    event: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/events/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  const signupEventHandler = () => {
    navigate('/signin?redirect=/eventHistory');
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={event.image}
            alt={event.name}
          ></img>
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{event.name}</title>
              </Helmet>
              <h1>{event.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>{event.dayAndTime}</p>
              <p>{event.location}</p>
            </ListGroup.Item>
            <ListGroup.Item>{event.participants} participants</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{event.description}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid">
              <Button
                      type="button"
                      variant="primary"
                      onClick={signupEventHandler}
                    >
                      Sign up for the event
                    </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>

      </Row>
    </div>
  );
}
export default EventScreen;
