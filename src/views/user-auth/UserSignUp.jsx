import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

// toolbox imports
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Flex } from '@chakra-ui/react';
import { Heading, Button } from '@chakra-ui/react';

// import static files
import RegistrationBG from '../../assets/img/user_registration_bg.png';

const initialValues = {
  email: '',
  password: '',
  cPassword: '',
  fullName: '',
  profile: {
    owner: '',
    player: '',
  },
};

const onSubmit = (values) => {
  console.log('form data', values);
};

const validationSchema = Yup.object({
  email: Yup.string().required('Required field'),
  password: Yup.string().required('Required field'),
  cPassword: Yup.string().required('Required field'),
  fullName: Yup.string().required('Required field'),
  profile: Yup.string().required('Required field'),
});

const UserSignUp = () => {
  return (
    <Box display="flex">
      <Box
        bgImage={RegistrationBG}
        w="40%"
        h="100vh"
        bgPosition="center"
        bgSize="100%"
      />
      <Box bg="#080808" w="60%" p="8% 10%">
        <Heading variant="logo" as="h1" size="3xl">
          <span style={{ color: '#19D2C2' }}>Foot</span>
          <span style={{ color: '#0AADE8' }}>Planet</span>
        </Heading>
        <Heading variant="welcomeMessage" as="h3">
          Get started
        </Heading>
        <Heading variant="helperMessage" as="h6" size="m">
          already have an account ?
          <Link
            to="/user-signin"
            style={{ color: '#0AADE8', margin: '0 0 0 1%' }}
          >
            sign in
          </Link>
        </Heading>

        {/* Registration form */}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form style={{ margin: '2% 0' }}>
            <label
              htmlFor="email"
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
              htmlFor="password"
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
            <label
              htmlFor="cPassword"
              style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
            >
              Confirm Password
            </label>
            <Field
              type="password"
              id="password"
              name="cPassword"
              placeholder="Confirm your password"
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
              name="cPassword"
              component="small"
              style={{ color: '#19D2C2' }}
            />
            <br />
            <label
              htmlFor="fullName"
              style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
            >
              Full name
            </label>
            <Field
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your Enter your full name"
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
              name="fullName"
              component="small"
              style={{ color: '#19D2C2' }}
            />
            <br />
            <label
              htmlFor="profile"
              style={{ color: '#D9D9D9', fontSize: '0.85rem' }}
            >
              You are a...
            </label>
            <select
              id="profile"
              name="profile"
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
              <option value="1">Player</option>
              <option value="2">Owner</option>
            </select>
            <br />
            <br />
            <Button type="submit" w="100%" bg="#0AADE8">
              Sign up
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default UserSignUp;
