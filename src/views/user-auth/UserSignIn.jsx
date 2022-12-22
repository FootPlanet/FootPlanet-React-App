import React from 'react';
import { Box, Heading, Button, ButtonGroup } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

import UserSignInImage from '../../assets/img/usersignin.png';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().required('Required field'),
  password: Yup.string().required('Required field'),
});

const UserSignIn = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    const email = values.email;
    const password = values.password;
    try {
      const { data } = await axios.post(
        'http://localhost:9090/api/user/login',
        {
          email,
          password,
        }
      );
      if (data) {
        console.log(data);
        const result = await axios.get(
          `http://localhost:9090/api/user/login/${email}`
        );
        localStorage.setItem('userInfo', JSON.stringify(result.data));
        navigate('/home');
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <Box display="flex">
      <Box
        bgImage={UserSignInImage}
        w="40%"
        h="100vh"
        bgPosition="bottom"
        bgSize="100%"
      />
      <Box bg="#000000" w="60%" p="8% 10%">
        <Heading variant="logo" as="h1" size="3xl" noOfLines={1}>
          <span style={{ color: '#19D2C2' }}>Foot</span>
          <span style={{ color: '#0AADE8' }}>Planet</span>
        </Heading>
        <Heading variant="welcomeMessage" as="h3" noOfLines={1}>
          <span>Welcome back</span>
        </Heading>
        <Heading variant="helperMessage" as="h6" size="m" noOfLines={1}>
          <span>don't have an account ? </span>
          <Link
            to="/user-signup"
            style={{ color: '#0AADE8', margin: '0 0 0 1%' }}
          >
            sign up
          </Link>
        </Heading>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form style={{ margin: '3% 0' }}>
            <label
              htmlFor="Email"
              style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
            >
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
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
              name="email"
              component="small"
              style={{ color: '#19D2C2' }}
            />
            <br />
            <label
              htmlFor="Password"
              style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
            >
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
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
              name="password"
              component="small"
              style={{ color: '#19D2C2' }}
            />
            <br />
            <br />
            <Button type="submit" w="100%" bg="#0AADE8">
              Sign in
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default UserSignIn;
