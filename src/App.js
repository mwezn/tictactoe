import { Routes, Route } from 'react-router-dom';
import './App.css';
import AI from './aip2'
import Five from './five.js'
import Full from './fullGame'
import Three from './three.js'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Three></Three>}></Route>
      <Route path="/ai" element={<AI />}></Route>
      <Route path="/five" element={<Five />}></Route>
      <Route path="/full" element={<Full />}></Route>
      
    </Routes>
    );
}
export default App;
