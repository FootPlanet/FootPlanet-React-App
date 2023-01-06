import { Box, Button, Grid, GridItem, Text, Textarea } from '@chakra-ui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect } from 'react'
import AdminToolbar from '../../../components/navigation/AdminToolbar'
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const initialValues = {
  name:'',
  capacity:'',
  price:'',
  description:'',
  complexe: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required field'),
  capacity: Yup.string().required('Required field'),
  price: Yup.string().required('Required field'),
  description: Yup.string().required('Required field'),
  complexe: Yup.string().required('Required field'),
});

const PitchCreation = ({dispatch}) => {

  const [url, setUrl] = useState('');
  const [complexes, setComplexes] = useState([]);
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://footplanet-backend.herokuapp.com/api/complexe');
        setComplexes(result.data);
      } catch (err) {
        toast.error(err);
      }
    };
    fetchData();
  }, [])

  const onSubmit = async (values) => {
    const name = values.name;
    const capacity = values.capacity;
    const price = values.price;
    const description = values.description;
    const complexe = values.complexe;
    const photo = url;
    const id = userInfo.userId;
    if(url === '') {
      toast.error('Image is empty or not yet uploaded');
    }else {
      try {
        const { data } = await axios.post(
          'https://footplanet-backend.herokuapp.com/api/pitch',
          {
            "name": name,
            "capacity": capacity,
            "price": price,
            "photo": photo,
            "description": description,
            "owner": {
              "userId": id,
            },
            "complexe": {
              "complexeId": complexe,
            }
          }
        );
        dispatch({ type: 'CREATE_SUCCESS' });
        toast.success('Pitch created!');
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
        <Text color="#fff">ADD A NEW PITCH</Text>
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
                  placeholder="Enter pitch capacity"
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
                  placeholder="Enter Pitch price"
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
                  placeholder="Enter pitch description"
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
                <GridItem colSpan={1}>
                <label
                  htmlFor="complexe"
                  style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                >
                  Pitch Complexe
                </label>
                <Field
                  component="select"
                  id="complexe"
                  name="complexe"
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
                  {complexes.map(c => (
                    <option value={c.complexeId} key={c.complexeId} >{c.name}</option>
                  ))}
                </Field>
                <ErrorMessage
                  name="complexe"
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

export default PitchCreation