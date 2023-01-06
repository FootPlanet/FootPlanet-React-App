import { Box, Button, Grid, GridItem, Text, Textarea } from '@chakra-ui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React from 'react'
import AdminToolbar from '../../../components/navigation/AdminToolbar'
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const initialValues = {
  name:'',
  location:'',
  latitude:'',
  longitude:'',
  description:'',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required field'),
  location: Yup.string().required('Required field'),
  latitude: Yup.string().required('Required field'),
  longitude: Yup.string().required('Required field'),
  description: Yup.string().required('Required field'),
});

const ComplexeCreation = ({dispatch}) => {

  const [url, setUrl] = useState('');
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const onSubmit = async (values) => {
    const name = values.name;
    const location = values.location;
    const latitude = values.latitude;
    const longitude = values.longitude;
    const description = values.description;
    const photo = url;
    const id = userInfo.userId;
    if(url == '') {
      toast.error('Image is empty or not yet uploaded');
    }else {
      try {
        const { data } = await axios.post(
          'https://footplanet-backend.herokuapp.com/api/complexe',
          {
            "name": name,
            "location": location,
            "latitude": latitude,
            "longitude": longitude,
            "photo": photo,
            "description": description,
            "owner": {
              "userId": id,
            },
          }
        );
        dispatch({ type: 'CREATE_SUCCESS' });
        toast.success('Complexe created!');
      } catch (err) {
        toast.error(err);
      }
    }
  };

const imageUpload = async (e) => {
  const formData = new FormData();
  formData.append('file', e.target.files[0]);
  formData.append('upload_preset', 'n1r1yvzx');
  const {data} = await axios.post('https://api.cloudinary.com/v1_1/dk9akkkta/image/upload', formData);
  setUrl(data.secure_url);
}

  return (
    <Box bg="#080808" h="100vh">
      <Box p="0% 4%" m="4% 0%">
        <Text color="#fff">ADD A NEW COMPLEXE</Text>
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
  )
}

export default ComplexeCreation