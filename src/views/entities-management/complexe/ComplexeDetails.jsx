import { Box, Button, Flex, Grid, GridItem, Image, Text, Textarea } from '@chakra-ui/react'
import React, { useEffect, useMemo, useReducer, useRef } from 'react'
import { FaEdit, FaInfoCircle, FaLocationArrow, FaPen, FaPenAlt, FaPencilRuler, FaPenFancy, FaPenNib, FaPenSquare, FaPersonBooth, FaTrash } from 'react-icons/fa'
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
        return { ...state, loading: false, complexe: action.payload };
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
    location: Yup.string().required('Required field'),
    latitude: Yup.string().required('Required field'),
    longitude: Yup.string().required('Required field'),
    description: Yup.string().required('Required field'),
  });

const ComplexeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [url, setUrl] = useState('');
    const [formulaire, setFormulaire] = useState(false);
    const editbox = useRef(null);
    const [{ loading, error, complexe, successUpdate, successDelete }, dispatch] = useReducer(reducer, {
        complexe: null,
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
            const { data } = await axios.get(`https://footplanet-backend.herokuapp.com/api/complexe/${id}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err });
          }
        };
        if(successUpdate) {
            dispatch({ type: 'UPDATE_RESET' });
        }
        fetchData();
      }, [id, successUpdate]);

    useEffect(() => {
        if (formulaire) {
            editbox.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
    }, [formulaire]);

    if(complexe == null) {
        return;
    }

    const initialValues = {
        name: complexe.name,
        location: complexe.location,
        latitude: complexe.latitude,
        longitude: complexe.longitude,
        description: complexe.description,
    };

    const onSubmit = async (values) => {
        const name = values.name;
        const location = values.location;
        const latitude = values.latitude;
        const longitude = values.longitude;
        const description = values.description;
        const photo = complexe.photo ? complexe.photo : url ;
        console.log(values);
        console.log(photo);
        console.log(id);
        if(photo == '') {
          toast.error('Image is empty or not yet uploaded');
        }else {
          try {
            const { data } = await axios.put(
              `https://footplanet-backend.herokuapp.com/api/complexe/${id}`,
              {
                name,
                location,
                latitude,
                longitude,
                photo,
                description,
              }
            );
            toast.success('Complexe updated!');
            dispatch({ type: 'UPDATE_SUCCESS' });
            setFormulaire(!formulaire);
          } catch (err) {
            toast.error(err);
          }
        }
    };

    const deleteHandler = (id) => {
      Swal.fire({
        title: 'Delete this complexe?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch({ type: 'DELETE_REQUEST' });
          try {
            await axios.delete(`https://footplanet-backend.herokuapp.com/api/complexe/${id}`);
            navigate("/complexe-management");
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
            <Text color="#fff">COMPLEXE DETAILS</Text>
        </Box>
        <Flex p="0% 4%" w="50%" gap={6} >
                <Button type="button" w="100%" colorScheme='green' leftIcon={<FaEdit/>} onClick={() => setFormulaire(!formulaire)} >
                    EDIT THIS COMPLEXE
                </Button>
                <Button type="button" w="100%" colorScheme='red' leftIcon={<FaTrash/>} onClick={() => deleteHandler(id)} >
                    DELETE THIS COMPLEXE
                </Button>
        </Flex>
        <Box ref={editbox} hidden={!formulaire}>
            <Box p="0% 4%" m="4% 0%">
                <Text color="#fff">EDIT COMPLEXE</Text>
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
                        Complexe Name
                        </label>
                        <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter complexe name"
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
                        htmlFor="location"
                        style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                        >
                        Complexe Location
                        </label>
                        <Field
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter complexe location"
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
                        name="location"
                        component="small"
                        style={{ color: '#19D2C2' }}
                        />
                        </GridItem>
                        <GridItem colSpan={1}>
                        <label
                        htmlFor="latitude"
                        style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                        >
                        Complexe Latitude
                        </label>
                        <Field
                        type="number"
                        id="latitude"
                        name="latitude"
                        placeholder="Enter complexe latitude"
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
                        name="latitude"
                        component="small"
                        style={{ color: '#19D2C2' }}
                        />
                        </GridItem>
                        <GridItem colSpan={1}>
                        <label
                        htmlFor="longitude"
                        style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                        >
                        Complexe Longitude
                        </label>
                        <Field
                        type="number"
                        id="longitude"
                        name="longitude"
                        placeholder="Enter complexe longitude"
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
                        name="longitude"
                        component="small"
                        style={{ color: '#19D2C2' }}
                        />
                        </GridItem>
                        <GridItem colSpan={1}>
                        <label
                        htmlFor="photo"
                        style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                        >
                        Complexe Thumbnail
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
                            Complexe Description
                            </label>
                            <Field
                            component="textarea"
                            id="description"
                            name="description"
                            placeholder="Enter complexe description"
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
                <Image src={complexe.photo ?  complexe.photo : noImage} alt={complexe.name} style={{width: '100%', height: '100%'}} />
            </GridItem>
            <GridItem colSpan={2}>
                <Flex color="#fff" alignItems="center" fontSize="1.7rem" m="2% 0%" gap={2}><FaInfoCircle/>COMPLEXE DETAILS</Flex>
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                    <GridItem colSpan={1}>
                        <Flex color="#fff" alignItems="center" fontSize="1.4rem" m="8% 0%" gap={2}><FaPen/>Name : {complexe.name}</Flex>
                        <Flex color="#fff" alignItems="center" fontSize="1.4rem" m="8% 0%" gap={2}><HiLocationMarker/>Location : {complexe.location}</Flex>
                        <Flex color="#fff" alignItems="center" fontSize="1.4rem" m="8% 0%" gap={2}><GiPerson/>Owner : {complexe.owner.fullname}</Flex>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Flex color="#fff" alignItems="center" fontSize="1.4rem" m="8% 0%" gap={2}><RiBuilding3Fill/>Number of pitches : {complexe.numberPitchs}</Flex>
                    </GridItem>
                </Grid>
            </GridItem>
        </Grid>
        <Box p="2% 4%" m="4% 4%" bg="#1c1c1c" color="#fff">
            <Flex alignItems="center" fontSize="1.7rem" gap={2}>
                <MdDescription/> COMPLEXE DESCRIPTION 
            </Flex>
            <Text fontSize="1.2rem">{complexe.description}</Text>
        </Box>
        <Box className="map-container" p="2% 4%" m="4% 0%">
          <Map lt={complexe.latitude} lg={complexe.longitude} />
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

export default ComplexeDetails