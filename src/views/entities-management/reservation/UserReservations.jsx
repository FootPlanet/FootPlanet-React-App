import { Box, Button, Card, CardBody, Flex, Text } from '@chakra-ui/react'
import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminToolbar from '../../../components/navigation/AdminToolbar'

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, reservations: action.payload };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

const UserReservation = () => {
    const navigate = useNavigate();
    const [{ loading, error, reservations }, dispatch] = useReducer(reducer, {
        reservations: [],
        loading: true,
        error: '',
      });

      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

      useEffect(() => {
        if(!userInfo) {
          navigate("/user-signin");
        }
      }, [navigate, userInfo]);

      useEffect(() => {
        const fetchData = async () => {
          dispatch({ type: 'FETCH_REQUEST' });
          try {
            const result = await axios.get(`https://footplanet-backend.herokuapp.com/api/reservation/user/${userInfo.userId}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err });
          }
        };
        fetchData();
      }, [userInfo.userId]);

  return (
    <Box bg="#080808" h="100%">
        <AdminToolbar/>
        <Box p="0% 4%" m="4% 0%">
            <Text color="#fff">MY RESERVATIONS</Text>
        </Box>
        <Box>
            {reservations.map(r => (
                <Card p="0% 4%" m="2% 4%" style={{border: '1px solid white'}} key={r.reservationId}>
                    <CardBody>
                        <Flex>
                            <Text color="#fff">Reservation in pitch {r.pitch.name} at {moment(r.reservationDate).format('DD/MM/YYYY hh:mm')} for {r.pitch.price} DH</Text>
                        </Flex> 
                    </CardBody>
                </Card>
            ))}
        </Box>
    </Box>
  )
}

export default UserReservation