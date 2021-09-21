import React from 'react'
import { Link } from 'react-router-dom'



const MediaCreator = ({items, type}) => {

    const imageCreator = (param) => {
      return (
          <div key={param.data[0].nasa_id} className="media">
            <Link to={`/detail/image/${param.data[0].nasa_id}`} >
            <img src={param.links[0].href} alt={param.data[0].title} />
            </Link>
          </div>        
      )
    }

    const videoCreator = (param) => {
      return (
          <div key={param.data[0].nasa_id} className="media">
            <Link to={`/detail/video/${param.data[0].nasa_id}`} >
            <i class="playSign bi bi-play-circle"></i>
            <img src={param.links[0].href} alt={param.data[0].title} />
            </Link>
          </div>    
    )
    }

    if (type === 'image,video') return items.map(elem => {
               let mediaType = elem.href.slice(31,36)
               return (mediaType === "image" ? imageCreator(elem) : videoCreator(elem))
        })
    else if (type === "image") return items.map(elem => imageCreator(elem))
    else if (type === "video") return items.map(elem => videoCreator(elem))
    
  }

export default MediaCreator
