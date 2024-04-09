import './App.css';
import FileUpload from './Components/FileUpload';
import {Routes,Route} from 'react-router-dom'
import DashBoard from './Components/DashBoard'
function App() {

  return (

    <div className="App">
      <Routes>
        <Route path='/dashboard' element = {<DashBoard/>} ></Route>
      </Routes>
      {/* <StatCard/>
      <FileUploadForm/> */}
      <FileUpload/>
    </div>
  );
}

export default App;
