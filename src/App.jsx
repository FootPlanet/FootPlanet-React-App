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
<<<<<<< HEAD
=======
import theme from '../src/utils/styles/theme.js';
>>>>>>> baa9672 (Style: User Sign In styling)
// views import
import Home from '../src/views/home/Home';
import UserSignUp from '../src/views/user-auth/UserSignUp';
import UserSignIn from '../src/views/user-auth/UserSignIn';

// static files import
import theme from '../src/utils/styles/theme';
import '@fontsource/black-han-sans/400.css';
import '@fontsource/roboto-slab/500.css';
import '@fontsource/open-sans/300.css';

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
            </Routes>
          </div>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
