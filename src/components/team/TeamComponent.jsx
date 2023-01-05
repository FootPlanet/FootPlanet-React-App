import { Button, ButtonGroup, Card, CardBody, CardFooter, Center, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useRef } from 'react'
import { GiPerson } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const TeamComponent = ({t, invitations}) => {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    const [name, setName] = useState('Join');
    const [disabled, setDisabled] = useState(false);

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
            setName("Invitation Sent");
            setDisabled(true);
        }catch (err) {
            toast.error(err);
        }
      }

  return (
    <Center p="0 0.5%" key={t.teamId}>
              <Card maxW="sm" bg="#101010">
                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Heading size="md" color="#F5F5F5">{t.name}</Heading>
                    <Flex alignItems="center">
                      <GiPerson color="#F5F5F5"/>
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
                        <Link to="/team-invites">
                        <Button variant="solid" colorScheme="blue">
                          Explore Invites
                        </Button>
                        </Link>
                    ) : invitations.find(i => i.team.teamId == t.teamId) ? (
                        <Button variant="solid" colorScheme="blue" disabled >
                            Invitation Sent
                        </Button>
                    ) : (
                      <Button variant="solid" colorScheme="blue" onClick={() => joinHandler(t.captain.userId, t.teamId)} disabled={disabled} >
                        {name}
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
  )
}

export default TeamComponent