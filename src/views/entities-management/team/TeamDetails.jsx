import { Button } from '@chakra-ui/button';
import { Card, CardBody } from '@chakra-ui/card';
import { Box, Flex, Text } from '@chakra-ui/layout'
import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminToolbar from '../../../components/navigation/AdminToolbar'

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, team: action.payload };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

const TeamDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [{ loading, error, team }, dispatch] = useReducer(reducer, {
        team: null,
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
            const result = await axios.get(`https://footplanet-backend.herokuapp.com/api/teams/${id}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err });
          }
        };
        fetchData();
      }, [id]);

      if(team == null) {
        return;
    }



  return (
    <Box bg="#080808" h="100%">
    <AdminToolbar/>
    <Box p="0% 4%" m="4% 0%">
        <Text color="#fff">TEAM DETAILS</Text>
    </Box>
    <Box>
            <Box p="0% 4%" m="4% 0%">
                <Text color="#fff">TEAM CAPTAIN</Text>
            </Box>
            <Card p="0% 4%" m="2% 4%" style={{border: '1px solid white'}}>
                <CardBody>
                    <Flex>
                        <Text color="#fff">{team.captain.fullname}</Text>
                    </Flex> 
                </CardBody>
            </Card>
            <Box p="0% 4%" m="4% 0%">
                <Text color="#fff">TEAM MEMBERS</Text>
            </Box>
        {team.members.map(t => (
            <Card p="0% 4%" m="2% 4%" style={{border: '1px solid white'}} key={t.userId}>
                <CardBody>
                    <Flex>
                        <Text color="#fff">{t.fullname}</Text>
                    </Flex> 
                </CardBody>
            </Card>
        ))}
    </Box>
</Box>
  )
}

export default TeamDetails