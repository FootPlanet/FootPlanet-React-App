import { Box, Button, Card, CardBody, Flex, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { toast } from 'react-toastify';
import AdminToolbar from '../../../components/navigation/AdminToolbar'

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, invites: action.payload };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'CREATE_SUCCESS':
        return { ...state, loading: false, successCreate: true };
      case 'CREATE_RESET':
        return { ...state, loading: false, successCreate: false };  
      case 'DELETE_SUCCESS':
        return { ...state, loading: false, successDelete: true };
      case 'DELETE_RESET':
        return { ...state, loading: false, successDelete: false };
      default:
        return state;
    }
  };

const TeamInvites = () => {
    const [{ loading, error, invites, successDelete, successCreate }, dispatch] = useReducer(reducer, {
        invites: [],
        loading: true,
        error: '',
      });

      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

      useEffect(() => {
        const fetchData = async () => {
          dispatch({ type: 'FETCH_REQUEST' });
          try {
            const result = await axios.get(`https://footplanet-backend.herokuapp.com/api/invitation/receiver/${userInfo.userId}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err });
          }
        };
        if(successDelete) {
          dispatch({ type: 'DELETE_RESET' });
        }else if(successCreate) {
            dispatch({ type: 'CREATE_RESET' });
        }else {
            fetchData();
        }
      }, [successCreate, successDelete, userInfo.userId]);

      const declineHandler = async (invitation) => {
        try{
            const {data} = await axios.delete(`https://footplanet-backend.herokuapp.com/api/invitation/${invitation.invitationId}`);
            toast.success("Invitation declined");
            dispatch({ type: 'DELETE_SUCCESS' });
        }catch (err) {
            toast.error(err);
        }
      }

      const acceptHandler = async (invitation) => {
        try{
            const {data} = await axios.put(`https://footplanet-backend.herokuapp.com/api/invitation/${invitation.invitationId}`, {
                invitationId: invitation.invitationId,
                receiver: invitation.receiver,
                sender: invitation.sender,
                team: invitation.team,
                date: invitation.date,
                accepted: true,
            });
            toast.success("Invitation accepted");
            dispatch({ type: 'CREATE_SUCCESS' });
        }catch (err) {
            toast.error(err);
        }
      }

  return (
    <Box bg="#080808" h="100%">
        <AdminToolbar/>
        <Box p="0% 4%" m="4% 0%">
            <Text color="#fff">TEAM INVITATIONS</Text>
        </Box>
        <Box>
            {invites.map(i => (
                <Card p="0% 4%" m="2% 4%" style={{border: '1px solid white'}} key={i.invitationId}>
                    <CardBody>
                        <Flex>
                            <Text color="#fff">{i.sender.fullname} wants to join your team!</Text>
                            <Button variant="solid" colorScheme="red" m="0% 1% 0% 1%" onClick={() => declineHandler(i)} >
                                Decline
                            </Button>
                            <Button variant="solid" colorScheme="green" onClick={() => acceptHandler(i)}>
                                Accept
                            </Button>
                        </Flex> 
                    </CardBody>
                </Card>
            ))}
        </Box>
    </Box>
  )
}

export default TeamInvites