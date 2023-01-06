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
  capacity: Yup.string().required('Required field'),
});

const TeamCreation = ({dispatch}) => {

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const onSubmit = async (values) => {
    const name = values.name;
    const capacity = values.capacity;
    try {
        const { data } = await axios.post(
          'https://footplanet-backend.herokuapp.com/api/teams',
          {
            name,
            capacity,
            "captain": {
              "userId": userInfo.userId,
            },
          }
        );
        dispatch({ type: 'CREATE_SUCCESS' });
        toast.success('Team created!');
      } catch (err) {
        toast.error(err);
      }
  };

  return (
    <Box bg="#080808" h="100vh">
      <Box p="0% 4%" m="4% 0%">
        <Text color="#fff">ADD A NEW TEAM</Text>
      </Box>
      <Box p="0% 4%">
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form style={{ margin: '2% 0' }}>
              <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                <GridItem colSpan={1}>
                <label
                  htmlFor="name"
                  style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
                >
                  Team Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter team name"
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
                  Team Size
                </label>
                <Field
                  type="number"
                  id="capacity"
                  name="capacity"
                  placeholder="Enter team size"
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

export default TeamCreation