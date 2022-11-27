import * as React from "react";

// react tools imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// styling imports
import { ChakraProvider } from "@chakra-ui/react";

// views import
import Home from "../src/views/home/Home";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <div className="content">
            <Routes>
              <Route exact path="/">
                <Home />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
