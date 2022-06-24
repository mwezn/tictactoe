import { Routes, Route } from 'react-router-dom';
import './App.css';
import AI from './components/aip2'
import Five from './components/five.js'
import Three from './components/fullGame'
import Con4 from './components/connect4'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Three />}></Route>
      <Route path="/five" element={<Five />}></Route>
      <Route path="/ai" element={<AI />}></Route>
      <Route path="/connect4" element={<Con4 />}></Route>
    </Routes>
    );
}
export default App;
