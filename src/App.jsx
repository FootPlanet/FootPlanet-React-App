import * as React from 'react';

// react tools imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// styling imports
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/black-han-sans/400.css';
import '@fontsource/roboto-slab/500.css';
import '@fontsource/open-sans/300.css';
// views import
import Home from '../src/views/home/Home';
import UserSignUp from '../src/views/user-auth/UserSignUp';
import UserSignIn from '../src/views/user-auth/UserSignIn';
import PitchManagement from '../src/views/entities-management/pitch/PitchManagement'
import PitchDetails from '../src/views/entities-management/pitch/PitchDetails'


// static files import
import theme from '../src/utils/styles/theme';
import '@fontsource/black-han-sans/400.css';
import '@fontsource/roboto-slab/500.css';
import '@fontsource/open-sans/300.css';
import ComplexeManagement from './views/entities-management/complexe/ComplexeManagement';
import AdminSignIn from './views/user-auth/AdminSignIn';
import ComplexeDetails from './views/entities-management/complexe/ComplexeDetails';
import TeamManagement from './views/entities-management/team/TeamManagement';
import TeamInvites from './views/entities-management/team/TeamInvites';
import PitchReservation from './views/entities-management/reservation/PitchReservation';
import TeamDetails from './views/entities-management/team/TeamDetails';
import UserReservation from './views/entities-management/reservation/UserReservations';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer position="bottom-center" limit={1} />
      <Router>
        <div className="App">
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/user-signup" element={<UserSignUp />}></Route>
              <Route exact path="/user-signin" element={<UserSignIn />}></Route>
              <Route exact path="/pitch-management" element={<PitchManagement />}></Route>
              <Route exact path="/complexe-management" element={<ComplexeManagement />}></Route>
              <Route exact path="/admin-signin" element={<AdminSignIn />}></Route>
              <Route exact path="/complexe-details/:id" element={<ComplexeDetails />}></Route>
              <Route exact path="/pitch-details/:id" element={<PitchDetails />}></Route>
              <Route exact path="/team-management" element={<TeamManagement />}></Route>
              <Route exact path="/team-invites" element={<TeamInvites />}></Route>
              <Route exact path="/pitch-reservation/:id" element={<PitchReservation />}></Route>
              <Route exact path="/team-details/:id" element={<TeamDetails />}></Route>
              <Route exact path="/reservations" element={<UserReservation />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
