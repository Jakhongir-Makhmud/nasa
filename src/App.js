
import Nasa  from './component/Nasa';
import './component/style/style.css'
import { Context } from './Context'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DetailsImage from './component/DetailsImage';
import DetailsVideo from './component/DetailsVideo'
import React, { useState, useRef } from 'react';
function App() {

  const [data, setData] = useState([])
  const [input, setInput] = useState('');
  const [yearStart, setYearStart] = useState(2018);
  const [yearEnd, setYearEnd] = useState(2020);
  const [checkImage, SetCheckImage] = useState(true);
  const [checkVideo, setCheckVideo] = useState(false);
  const [request, setRequest] = useState('');
  const [mediaType, setmediaType] = useState('image');
  const [page, setPage] = useState(1);
  const [metadata, setMetadata] = useState();
  const onMount = useRef(false)
  
  
  return (
    <Context.Provider value={{data,input,yearStart,yearEnd,checkImage,checkVideo,request,mediaType,page,metadata,onMount,
                              setData,setInput,setYearStart,setYearEnd,SetCheckImage,setCheckVideo,setmediaType,setRequest,setPage,setMetadata}}>

    <Router>

    <Switch>


    <Route path="/" exact component={Nasa} />
    <Route path="/detail/image/:id" exact  component={DetailsImage} />
    <Route path="/detail/video/:id"  component={DetailsVideo} />

    </Switch>

    </Router>
    
  
   
    </Context.Provider>

  );
}

export default App;
