import React, { useEffect, useRef, useState } from 'react'

function DetailsImage({match}) {

    const [image, setImage] = useState();
    // const [aboutImage,setAboutImage] = useState({});
    const [element, setElement] = useState();
    const readyImage = useRef(false);


    useEffect(() => {

    
        fetch(`https://images-api.nasa.gov/asset/${match.params.id}`, {method: 'GET'})
        .then(data => data.json())
        .then(data => {
            const imageData = data.collection.items[data.collection.items.length - 1]
            setImage(data.collection.items[0])

            // fetch(imageData.href, {method: 'GET'})
            // .then(data => data.json())
            // .then(data => setAboutImage(data))
        })



    },[])
  
    useEffect(() => {
      
            if (readyImage.current) {
                setElement(
                   <div className="image" style={{textAlign: 'center'}}>
                        <img src={image.href} width='90%'  alt="" />
                    </div>
                
                )
            } else readyImage.current = true
       
    },[image])

    return (
        <>

            {element}
            
        </>
    )
}

export default DetailsImage


