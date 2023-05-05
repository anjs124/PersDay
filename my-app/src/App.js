import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result from './Result';
import Home from './Home';



function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>        
        <Route exact path="/result/:tonename" element={<Result />} />
      </Routes>
    </Router>  
        
  );
}

export default App;