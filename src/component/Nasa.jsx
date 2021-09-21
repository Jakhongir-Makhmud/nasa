import React, { useState, useEffect, useRef, useContext } from 'react'
import { Context } from '../Context';
import { Button, Collapse,Container,Row,Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import MediaCreator from './MediaCreator';
import PagePagination from './PagePagination';


function Nasa() {


  const [reqStatus, setReqStatus] = useState(0);
  const [open, setOpen] = useState(false);
  const isMounted = useRef(false)

    const {
      data,input,yearStart,yearEnd,checkImage,checkVideo,request,mediaType,page,metadata,onMount,
      setData,setInput,setYearStart,setYearEnd,SetCheckImage,setCheckVideo,setRequest,setmediaType,setPage,setMetadata
    } = useContext(Context);
 
    const checkEquality = (a,b) => {
      const leng1 = Object.keys(a).length;
      const leng2 = Object.keys(b).length

      if (leng1 === leng2) return Object.keys(a).every( key => b.hasOwnProperty(key) && b[key] === a[key])
      return false

  } 

  const pageControl = () => {
    if (onMount.current) {
      if (!checkEquality(request,{...request,input,yearEnd,yearStart,checkImage,checkVideo,page})) setRequest({...request,input,yearEnd,yearStart,checkImage,checkVideo,page })
             window.scrollTo(0, 0) 
    } else onMount.current = true;
    
}

useEffect(pageControl, [page]);


    const startSearch = (e) => {
      e.preventDefault()

      if (yearStart > yearEnd) {
        alert(`${yearStart} - year from need to be less than year to - ${yearEnd}`)
        return;
      }
     setmediaType((checkVideo && checkImage) ? 'image,video' : (checkVideo) ? 'video' : 'image')

      if (!checkEquality(request,{...request,input,yearEnd,yearStart,checkImage,checkVideo,page})) setRequest({...request,input,yearEnd,yearStart,checkImage,checkVideo })

    }
  

    useEffect(() => {
   

      fetch(`https://images-api.nasa.gov/search?q=${input}&page=1&media_type=${mediaType}&year_start=${yearStart}&year_end=${yearEnd}&page=${page}`,{method: 'GET'})
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log(data)
        setData(data.collection.items)
        setMetadata(data.collection.metadata.total_hits)
        setReqStatus(200)
  
        if (metadata) return null
            }) 
         
     
    }, [request])

    return (
    
        <React.Fragment>
          <div className="searchForm">
            <form onSubmit={(e) => startSearch(e)}>
            <input className='nameSearch' onChange={(e) => setInput(e.target.value)} value={input} type="text" /> 
            <Button 
              className='filterBtn'
              size="sm"
              onClick={() => setOpen(!open)}
              aria-controls="filter"
              aria-expanded={open}>
              <i className="bi bi-sliders"></i>
            </Button>

            <br />

            <div className="checkbox">
              <div className="imageCheck">
                <input onChange={() => SetCheckImage(!checkImage)} name="image" type="checkbox" value="image" defaultChecked={checkImage}/>
                <label htmlFor="">image</label>
              </div>
              <div className="videoCheck">
                <input onChange={() => setCheckVideo(!checkVideo)} name="video" type="checkbox" value="video" defaultChecked={checkVideo}/>
                <label htmlFor="video">video</label>
                </div>
              </div>
            

            
            <Collapse in={open}>
            
              <div id="filter" className="moreSearchOptions" >
                <span>Years</span>
                <Container className='yearContainer'>
                  <Row>
                    <Col> <label htmlFor="yearStart">From: </label></Col>
                    <Col><input onChange={(e) => setYearStart(e.target.value)} type="number" min='1920' max='2020'/></Col>
                  </Row>
                  <Row>
                    <Col><label htmlFor="yearEnd">To: </label></Col>
                    <Col><input onChange={(e) => setYearEnd(e.target.value)} value={yearEnd} type="number" min='1921' max='2021'/></Col>
                  </Row>
                </Container>        

              </div>
           
            </Collapse >

            <button className='submitBtn'  type='submit'>Search</button>
      
            </form>
            </div>
            
            <br />

          
          <div className='total-media' style={{columns:4,columnGap:0,padding: '5px'}} >

            <MediaCreator items={data} type={mediaType} />
            
            </div>

           {reqStatus == 200 ? <PagePagination page={page} setPage={setPage} metadata={metadata} /> : null} 


        </React.Fragment>
    )
}

export default Nasa
