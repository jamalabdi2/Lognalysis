import './App.css';
import FileUpload from './Components/FileUpload';
import {Routes,Route} from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import LandingPage from './Components/LandingPage';

function App() {

  return (

    <div className="App">
  
      <Routes>
        <Route path='/dashboard' element = {<DashBoard/>} />
        <Route path='/' element = {<LandingPage/>} />
        <Route path='/fileUpload' element = {<FileUpload/>} />
        
      </Routes>
      {/* <StatCard/>
      <FileUploadForm/> */}
      
    </div>
  );
}

export default App;
