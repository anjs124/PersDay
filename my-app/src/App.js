import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result from './Result';
import Home from './Home';
import Introduction from './Introduction';
import Season from "./Season";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/home" element={<Home />} />
        <Route path="/result/:tonename" element={<Result />} />
        <Route path="/result/:tonename/:season" element={<Season />} />
        {/* <Route path="/result/:tonename/:weather" element={<Weather />} /> */}
      </Routes>
    </Router>
  );
}

export default App;