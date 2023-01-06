import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useReducer, useState } from 'react'
import AdminToolbar from '../../../components/navigation/AdminToolbar'
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, pitch: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_SUCCESS':
      return { ...state, successUpdate: true };
    case 'DELETE_SUCCESS':
      return { ...state, successDelete: true };
    case 'UPDATE_RESET':
      return { ...state, successUpdate: false };
    case 'DELETE_RESET':
      return { ...state, successDelete: false };
    default:
      return state;
  }
};

const validationSchema = Yup.object({
  date: Yup.string().required('Required field'),
  hour: Yup.string().required('Required field'),
});

const initialValues = {
  date: '',
  hour: '',
};

const PitchReservation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [{ loading, error, pitch, successUpdate, successDelete }, dispatch] = useReducer(reducer, {
      pitch: null,
      loading: true,
      error: '',
  });

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const [reservationDate, setReservationDate] = useState(null);

  useEffect(() => {
    if(!userInfo) {
      navigate("/user-signin");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`https://footplanet-backend.herokuapp.com/api/pitch/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err });
      }
    };
    fetchData();
  }, [id]);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          { amount: { value: Math.ceil(pitch.price * 0.096) } },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        const uid = userInfo.userId;
        const pid = pitch.pitchId;
        const price = pitch.price;
        const {data} = await axios.post('https://footplanet-backend.herokuapp.com/api/reservation', {
          user: {
            userId: uid,
          },
          pitch: {
            pitchId: pid,
          },
          reservationDate,
          reservationPrice: price,
        });
        toast.success("Reserved successfully");
      } catch (err) {
        toast.error(err);
      }
    });
  }

  function onError(err) {
    toast.error(err);
  }

  const onSubmit = async (values) => {
    console.log(values);
    const date = values.date;
    const hour = values.hour;
    const reservationDate = new Date(date);
    reservationDate.setHours(hour, 0, 0);
    console.log(reservationDate.getTime());
    if(reservationDate < new Date()) {
      toast.error("The chosen date and hour is already past");
      return;
    }
    try {
      const {data} = await axios.post('https://footplanet-backend.herokuapp.com/api/reservation/date', null, { params: {
        reservationDate: reservationDate.getTime(),
      }})
      if(data) {
        toast.info("This hour is already reserved");
      }else {
        setReservationDate(reservationDate);
        const loadPayPalScript = () => {
          paypalDispatch({
            type: 'resetOptions',
            value: {
              'client-id': 'AfM8miKkiP_mMaQ-kE9jT01MvD7Xoki3WQWZHZpFQ_fCSMDSsaxHEk-BD_AkLRTAmK0oZ7_0Z7G2D6iN',
              currency: 'USD',
            },
          });
          paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        };
        loadPayPalScript();
        // const {data} = await axios.post('https://footplanet-backend.herokuapp.com/api/reservation', {
        //   user: {
        //     userId: userInfo.userId,
        //   },
        //   pitch: {
        //     pitchId: pitch.pitchId,
        //   },
        //   reservationDate,
        //   reservationPrice: pitch.price,
        // });
        // toast.success("Reserved successfully");
      }
    }catch(err) {
      toast.error(err);
    }
  }

  if(pitch == null) {
    return;
  }

  return (
    <Box bg="#080808" h="100%">
        <AdminToolbar/>
        <Box p="0% 4%" m="4% 0%">
            <Text color="#fff">PITCH RESERVATION</Text>
        </Box>
        <Box>
            <Box p="0% 4%">
              <Text color="#fff">Pitch price : {pitch.price} DH</Text>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    <Form style={{ margin: '2% 0' }}>
                    <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                        <GridItem colSpan={1}>
                        <label
                        htmlFor="date"
                        style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                        >
                        Reservation date
                        </label>
                        <Field
                        type="date"
                        id="date"
                        name="date"
                        style={{
                            width: '100%',
                            backgroundColor: '#1A1D22',
                            height: '2.5rem',
                            border: '1px solid #12323d',
                            fontSize: '0.85rem',
                            padding: '0 2%',
                            color: '#F5F5F5',
                        }}
                        ></Field>
                        <ErrorMessage
                        name="date"
                        component="small"
                        style={{ color: '#19D2C2' }}
                        />
                        </GridItem>
                        <GridItem colSpan={1}>
                        <label
                        htmlFor="hour"
                        style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                        >
                        Reservation hour
                        </label>
                        <Field
                        component="select"
                        id="hour"
                        name="hour"
                        style={{
                            width: '100%',
                            backgroundColor: '#1A1D22',
                            height: '2.5rem',
                            border: '1px solid #12323d',
                            fontSize: '0.85rem',
                            padding: '0 2%',
                            color: '#F5F5F5',
                        }}
                        >
                          <option value="0" selected disabled>Select hour</option>
                          <option value="7">07:00 à 08:00</option>
                          <option value="8">08:00 à 09:00</option>
                          <option value="9">09:00 à 10:00</option>
                          <option value="10">10:00 à 11:00</option>
                          <option value="11">11:00 à 12:00</option>
                          <option value="12">12:00 à 13:00</option>
                          <option value="13">13:00 à 14:00</option>
                          <option value="14">14:00 à 15:00</option>
                          <option value="15">15:00 à 16:00</option>
                          <option value="16">16:00 à 17:00</option>
                          <option value="17">17:00 à 18:00</option>
                          <option value="18">18:00 à 19:00</option>
                          <option value="19">19:00 à 20:00</option>
                          <option value="20">20:00 à 21:00</option>
                          <option value="21">21:00 à 22:00</option>
                          <option value="22">22:00 à 23:00</option>
                          <option value="23">23:00 à 00:00</option>
                        </Field>
                        <ErrorMessage
                        name="hour"
                        component="small"
                        style={{ color: '#19D2C2' }}
                        />
                        </GridItem>
                        <br />
                        <GridItem colSpan={2} >
                        {!isPending && (
                            <PayPalButtons
                               createOrder={createOrder}
                               onApprove={onApprove}
                               onError={onError}>
                            </PayPalButtons>
                        )}
                        </GridItem>
                        <GridItem colSpan={2}>
                        <Button type="submit" w="100%" colorScheme='green'>
                        VALIDATE
                        </Button>
                        </GridItem>
                    </Grid>
                    </Form>
                </Formik>
                </Box>
        </Box>
    </Box>
  )
}

export default PitchReservation