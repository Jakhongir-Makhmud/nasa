import React, { useState, useEffect, useRef } from 'react'

function DetailsImage({match}) {

    const [video, setVideo] = useState();
    const [aboutVideo, setAboutVideo] = useState({});
    const [videoElement, setVideoElement] = useState();
    const readyVideo = useRef(false);
   
    useEffect(() => {
 
        fetch(`https://images-api.nasa.gov/asset/${match.params.id}`, {method: 'GET'})
        .then(data => data.json())
        .then(data => {
            const videoData = data.collection.items[data.collection.items.length - 1]
            setVideo(data.collection.items[0])

            // fetch(imageData.href, {method: 'GET'})
            // .then(data => data.json())
            // .then(data => setAboutVideo(data))
        })
        


        

    },[])

    useEffect(() => {
      
        if (readyVideo.current) {
            setVideoElement(
               <div className="video" style={{textAlign: 'center'}}>
                    <video width="90%"  autoPlay controls>
                         <source src={video.href} type="video/mp4"/>
                    </video>
                </div>
                )

        } else readyVideo.current = true
   
},[video])

    return (
        <>
        
            {videoElement}
           
        </>
    )
}

export default DetailsImage
