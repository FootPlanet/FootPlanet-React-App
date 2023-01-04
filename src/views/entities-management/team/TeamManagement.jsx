import React, { useEffect, useReducer, useState } from "react";

import AdminToolbar from "../../../components/navigation/AdminToolbar";
import TeamManagementToolbar from "../../../components/navigation/TeamManagamentToolbar";
import TeamCardsNavigation from '../../../components/navigation/TeamCardsNavigation'

// external toolbox imports
import {
  Box,
  Grid,
  Flex,
  Center,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Divider,
  Stack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";


// react icons import
import { FaMapMarkerAlt } from "react-icons/fa";

//assets imports
import TeamCreation from "./TeamCreation";
import noImage from "../../../assets/img/no-image.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, teams: action.payload, filteredTeams: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_SUCCESS':
      return { ...state, successCreate: true };
    case 'CREATE_RESET':
      return { ...state, successCreate: false };
    case 'FILTER_SUCCESS':
      return { ...state, filteredTeams: action.payload };
    default:
      return state;
  }
};

const TeamManagement = () => {
  const navigate = useNavigate();
  const [showView, setShowView] = useState(true);
  const [showCreation, setShowCreation] = useState(false);
  const [showMyTeams, setShowMyTeams] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [{ loading, error, teams, filteredTeams, successCreate }, dispatch] = useReducer(reducer, {
    teams: [],
    filteredTeams: [],
    loading: true,
    error: '',
  });
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  useEffect(() => {
    if(!userInfo) {
      navigate("/user-signin");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`https://footplanet-backend.herokuapp.com/api/invitation/sender/${userInfo.userId}`);
        setInvitations(result.data);
      } catch (err) {
        toast.error(err);
      }
    };
    fetchData();
  }, [userInfo.userId]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('https://footplanet-backend.herokuapp.com/api/teams');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err });
      }
    };
    if(successCreate) {
      dispatch({ type: 'CREATE_RESET' });
    }else {
      fetchData();
    }
  }, [successCreate]);

  const joinHandler = async(captainId, teamId) => {
    try{
        const {data} = await axios.post('https://footplanet-backend.herokuapp.com/api/invitation', {
            receiver: {
                userId: captainId,
            },
            sender: {
                userId: userInfo.userId,
            },
            team: {
                teamId: teamId,
            },
            date: Date.now(),
            accepted: false,
        });
        console.log(data);
    }catch (err) {
        toast.error(err);
    }
  }
  

  return (
    <Box bg="#080808" h="100%">
      <AdminToolbar />
      <TeamManagementToolbar setShowView={setShowView} setShowCreation={setShowCreation} setShowMyTeams={setShowMyTeams} teams={teams} dispatch={dispatch} />
      {showView ? (
      <Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} margin="0 1%" padding="1%">
          <Flex>
            {filteredTeams.slice(start,end).map(t => (
            <Center p="0 0.5%" key={t.teamId}>
              <Card maxW="sm" bg="#101010">
                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Heading size="md" color="#F5F5F5">{t.name}</Heading>
                    <Flex alignItems="center">
                      <FaMapMarkerAlt color="#F5F5F5"/>
                      <Text color="#F5F5F5">{t.captain.fullname}</Text>
                    </Flex>
                    <Text color="blue.600" fontSize="2xl">
                      {t.members.length}/{t.capacity}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                  {t.captain.userId == userInfo.userId ? (
                        <Link>
                        <Button variant="solid" colorScheme="blue">
                          Explore Invites
                        </Button>
                        </Link>
                    ) : invitations.find(i => i.team.teamId == t.teamId) ? (
                        <Button variant="solid" colorScheme="blue" disabled >
                            Invitation Sent
                        </Button>
                    ) : (
                      <Button variant="solid" colorScheme="blue" onClick={() => joinHandler(t.captain.userId, t.teamId)} >
                        Join
                      </Button>
                    )}
                    <Link to={`/team-details/${t.teamId}`}>
                      <Button variant="ghost" colorScheme="blue">
                        View info
                      </Button>
                    </Link>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Center>
            ))}
          </Flex>
      </Grid>
      <TeamCardsNavigation start={[start, setStart]} end={[end, setEnd]} length={filteredTeams.length} />
      </Box>) 
      : showCreation ? (<TeamCreation dispatch={dispatch} />) : showMyTeams && (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} margin="0 1%" padding="1%">
        <Flex>
        {teams.filter(t => t.captain.userId == userInfo.userId).slice(start,end).map(t => (
          <Center p="0 0.5%" key={t.teamId}>
            <Card maxW="sm" bg="#101010">
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="md" color="#F5F5F5">{t.name}</Heading>
                  <Flex alignItems="center">
                    <FaMapMarkerAlt color="#F5F5F5"/>
                    <Text color="#F5F5F5">{t.captain.fullname}</Text>
                  </Flex>
                  <Text color="blue.600" fontSize="2xl">
                    {t.members.length}/{t.capacity}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                    {t.captain.userId == userInfo.userId ? (
                        <Link>
                        <Button variant="solid" colorScheme="blue">
                          Explore Invites
                        </Button>
                    </Link>
                    ) : (
                        <Button variant="solid" colorScheme="blue">
                            Join
                        </Button>
                    )}
                  <Link to={`/team-details/${t.teamId}`}>
                    <Button variant="ghost" colorScheme="blue">
                      View info
                    </Button>
                  </Link>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Center>
          ))}
      </Flex>
    </Grid>
      )}
    </Box>
  );
};

export default TeamManagement;
