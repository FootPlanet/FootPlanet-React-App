import React, { useEffect, useReducer, useState } from "react";

import AdminToolbar from "../../../components/navigation/AdminToolbar";
import TeamManagementToolbar from "../../../components/navigation/TeamManagamentToolbar";
import TeamCardsNavigation from '../../../components/navigation/TeamCardsNavigation'
import {GiPerson} from 'react-icons/gi';

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
import TeamComponent from "../../../components/team/TeamComponent";

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

  

  return (
    <Box bg="#080808" h="100%">
      <AdminToolbar />
      <TeamManagementToolbar setShowView={setShowView} setShowCreation={setShowCreation} setShowMyTeams={setShowMyTeams} teams={teams} dispatch={dispatch} />
      {showView ? (
      <Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} margin="0 1%" padding="1%">
          <Flex>
            {filteredTeams.slice(start,end).map(t => (
            <TeamComponent t={t} invitations={invitations} />
            ))}
          </Flex>
      </Grid>
      <TeamCardsNavigation start={[start, setStart]} end={[end, setEnd]} length={filteredTeams.length} />
      </Box>) 
      : showCreation ? (<TeamCreation dispatch={dispatch} />) : showMyTeams && (
        <Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} margin="0 1%" padding="1%">
        <Flex>
        {filteredTeams.filter(t => t.captain.userId == userInfo.userId).slice(start,end).map(t => (
          <TeamComponent t={t} invitations={invitations} />
          ))}
      </Flex>
    </Grid>
      <TeamCardsNavigation start={[start, setStart]} end={[end, setEnd]} length={filteredTeams.length} />
      </Box>
      )}
    </Box>
  );
};

export default TeamManagement;
