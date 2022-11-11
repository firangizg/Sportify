import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from '../components/Event';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, events: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, events }, dispatch] = useReducer(logger(reducer), {
    events: [],
    loading: true,
    error: '',
  });
  // const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/events');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setEvents(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Sportify</title>
      </Helmet>
      <h1>Events near me</h1>
      <div className="events">
        {
          loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              {events.map((event) => (
                <Col key={event.slug} sm={6} md={5} lg={4} className="mb-3">
                  <Event event={event}></Event>
                </Col>
              ))}

            </Row>
          )}

      </div>
    </div>
  );
}
export default HomeScreen;
