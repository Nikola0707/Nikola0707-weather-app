import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import HomePage from "./pages/HomePage";
import SearchLocation from "./pages/SearchLocation";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/search' component={SearchLocation} />
      </Router>
      
    </div>
  );
}

export default App;
