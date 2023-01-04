import { Box, Button, Flex, Grid, GridItem, Image, Text, Textarea } from '@chakra-ui/react'
import React, { useEffect, useMemo, useReducer, useRef } from 'react'
import { FaEdit, FaInfoCircle, FaLocationArrow, FaDollarSign, FaPen, FaPenAlt, FaPencilRuler, FaPenFancy, FaPenNib, FaPenSquare, FaPersonBooth, FaTrash } from 'react-icons/fa'
import {HiLocationMarker} from 'react-icons/hi';
import {GiPerson} from 'react-icons/gi';
import {RiBuilding3Fill} from 'react-icons/ri';
import {MdDescription} from 'react-icons/md';
import AdminToolbar from '../../../components/navigation/AdminToolbar'
import noImage from "../../../assets/img/no-image.png";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

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
    name: Yup.string().required('Required field'),
    capacity: Yup.string().required('Required field'),
    price: Yup.string().required('Required field'),
    description: Yup.string().required('Required field'),
  });
  

const PitchDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [url, setUrl] = useState('');
    const [formulaire, setFormulaire] = useState(false);
    const editbox = useRef(null);
    const [{ loading, error, pitch, successUpdate, successDelete }, dispatch] = useReducer(reducer, {
        pitch: null,
        loading: true,
        error: '',
    });
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: 'AIzaSyDIjiKyFOGhw-ts0LgdF6MiWYsTioLM9LQ',
    });

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
        if(successUpdate) {
            dispatch({ type: 'UPDATE_RESET' });
        }else {
          fetchData();
        }
      }, [id, successUpdate]);

    useEffect(() => {
        if (formulaire) {
            editbox.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
    }, [formulaire]);

    if(pitch == null) {
        return;
    }

    const initialValues = {
        name: pitch.name,
        capacity: pitch.capacity,
        latitude: pitch.latitude,
        longitude: pitch.longitude,
        description: pitch.description,
    };

    const onSubmit = async (values) => {
        const name = values.name;
        const capacity = values.capacity;
        const price = values.price;
        const description = values.description;
        const photo = pitch.photo ? pitch.photo : url ;
        if(photo === '') {
          toast.error('Image is empty or not yet uploaded');
        }else {
          try {
            const { data } = await axios.put(
              `https://footplanet-backend.herokuapp.com/api/pitch/${id}`,
              {
                name,
                capacity,
                price,
                photo,
                description,
                owner: {
                  userId: userInfo.userId,
                },
              }
            );
            toast.success('Pitch updated!');
            dispatch({ type: 'UPDATE_SUCCESS' });
            setFormulaire(!formulaire);
          } catch (err) {
            toast.error(err);
          }
        }
    };

    const deleteHandler = (id) => {
      Swal.fire({
        title: 'Delete this pitch?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch({ type: 'DELETE_REQUEST' });
          try {
            await axios.delete(`https://footplanet-backend.herokuapp.com/api/pitch/${id}`);
            navigate("/pitch-management");
            dispatch({ type: 'DELETE_SUCCESS' });
          } catch (err) {
            toast.error(err);
          }
        }
      });
    }

    const imageUpload = async (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'n1r1yvzx');
        const {data} = await axios.post('https://api.cloudinary.com/v1_1/dk9akkkta/image/upload', formData);
        setUrl(data.secure_url);
    }

  return (
    <Box bg="#080808" h="100%">
        <AdminToolbar/>
        <Box p="0% 4%" m="4% 0%">
            <Text color="#fff">PITCH DETAILS</Text>
        </Box>
        {userInfo.userId == pitch.owner.userId && (
          <Flex p="0% 4%" w="50%" gap={6} >
              <Button type="button" w="100%" colorScheme='green' leftIcon={<FaEdit/>} onClick={() => setFormulaire(!formulaire)} >
                  EDIT THIS PITCH
              </Button>
              <Button type="button" w="100%" colorScheme='red' leftIcon={<FaTrash/>} onClick={() => deleteHandler(id)} >
                  DELETE THIS PITCH
              </Button>
          </Flex>
        )}
        <Box ref={editbox} hidden={!formulaire}>
            <Box p="0% 4%" m="4% 0%">
                <Text color="#fff">EDIT PITCH</Text>
            </Box>
            <Box p="0% 4%">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    <Form style={{ margin: '2% 0' }}>
                    <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                        <GridItem colSpan={2}>
                        <label
                        htmlFor="name"
                        style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                        >
                        Pitch Name
                        </label>
                        <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter pitch name"
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
                        name="name"
                        component="small"
                        style={{ color: '#19D2C2' }}
                        />
                        </GridItem>
                        <GridItem colSpan={1}>
                        <label
                        htmlFor="capacity"
                        style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                        >
                        Pitch capacity
                        </label>
                        <Field
                        type="text"
                        id="capacity"
                        name="capacity"
                        placeholder="Enter complexe capacity"
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
                        name="capacity"
                        component="small"
                        style={{ color: '#19D2C2' }}
                        />
                        </GridItem>
                        <GridItem colSpan={1}>
                        <label
                        htmlFor="price"
                        style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                        >
                        Pitch price
                        </label>
                        <Field
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter pitch price"
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
                        name="price"
                        component="small"
                        style={{ color: '#19D2C2' }}
                        />
                        </GridItem>
                        <GridItem colSpan={1}>
                        <label
                        htmlFor="photo"
                        style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                        >
                        Pitch Thumbnail
                        </label>
                        <input
                        type="file"
                        id="photo"
                        name="photo"
                        style={{
                            width: '100%',
                            backgroundColor: '#1A1D22',
                            height: '2.5rem',
                            border: '1px solid #12323d',
                            fontSize: '0.85rem',
                            padding: '0 2%',
                            color: '#F5F5F5',
                        }}
                        onChange={(e) => imageUpload(e)}
                        />
                        <ErrorMessage
                        name="photo"
                        component="small"
                        style={{ color: '#19D2C2' }}
                        />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <label
                            htmlFor="description"
                            style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                            >
                            Pitch Description
                            </label>
                            <Field
                            component="textarea"
                            id="description"
                            name="description"
                            placeholder="Enter Pitch description"
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
                            name="description"
                            component="small"
                            style={{ color: '#19D2C2' }}
                            />
                        </GridItem>
                        <br />
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
        <Grid templateColumns='repeat(3, 1fr)' gap={6} p="0% 4%" m="4% 4%" bg="#1c1c1c">
            <GridItem colSpan={1} p="4%">
                <Image src={pitch.photo ?  pitch.photo : noImage} alt={pitch.name} style={{width: '100%', height: '100%'}} />
            </GridItem>
            <GridItem colSpan={2}>
                <Flex color="#fff" alignItems="center" fontSize="1.7rem" m="2% 0%" gap={2}><FaInfoCircle/>PITCH DETAILS</Flex>
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                    <GridItem colSpan={1}>
                        <Flex color="#fff" alignItems="center" fontSize="1.4rem" m="8% 0%" gap={2}><FaPen/>Name : {pitch.name}</Flex>
                        <Flex color="#fff" alignItems="center" fontSize="1.4rem" m="8% 0%" gap={2}><HiLocationMarker/>Capacity : {pitch.capacity}</Flex>
                        <Flex color="#fff" alignItems="center" fontSize="1.4rem" m="8% 0%" gap={2}><FaDollarSign/>Price : {pitch.price}</Flex>
                    </GridItem>
                </Grid>
            </GridItem>
        </Grid>
        <Box p="2% 4%" m="4% 4%" bg="#1c1c1c" color="#fff">
            <Flex alignItems="center" fontSize="1.7rem" gap={2}>
                <MdDescription/> PITCH DESCRIPTION 
            </Flex>
            <Text fontSize="1.2rem">{pitch.description}</Text>
        </Box>
    </Box>
  )
}

function Map({ lt, lg }) {
  const center = useMemo(() => ({ lat: lt, lng: lg }), []);

  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
      <MarkerF position={center} />
    </GoogleMap>
  );
}

export default PitchDetails