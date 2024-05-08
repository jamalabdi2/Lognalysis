import './App.css';
import FileUpload from './Components/FileUpload';
import {Routes,Route} from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import LandingPage from './Components/LandingPage';
import NotFoundPage from './Components/NotFoundPage'

function App() {

  return (

    <div className="App">
  
      <Routes>
        <Route path='/dashboard' element = {<DashBoard/>} />
        <Route path='/' element = {<LandingPage/>} />
        <Route path='/fileUpload' element = {<FileUpload/>} />
        <Route path='*' element={<NotFoundPage />} />
        
      </Routes>
      {/* <StatCard/>
      <FileUploadForm/> */}
      
    </div>
  );
}

export default App;
