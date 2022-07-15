import {useEffect, useState} from 'react'
import Upload from './uploads'


function Avatar() {
  const [avatars, setAvatars] = useState()

  const fetchAvatars = () => {
    fetch('/api/pros')
    .then(()=>{})
  }


  /* 
  Will need to fetch the avatar of each user given the id
  Upload avatar to DB via Express and sends data to nextjs api
  */
  useEffect(()=>{},[])

  return (
    <div>
      
    </div>
  )
}

export default Avatar