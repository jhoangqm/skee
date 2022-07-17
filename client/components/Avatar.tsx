import {useEffect, useState} from 'react'
import UploadAvatar from './Upload/UploadAvatar'


function Avatar(props: {proId}) {
  const [avatars, setAvatars] = useState([])

  const fetchAvatars = () => {
    fetch(`/api/uploads/avatar/${props.proId}`)
    .then(res => res.json())
    .then(data=> setAvatars(data))
  }

  const prosAvatar = avatars.map(img=>img.image)

  // console.log('prosAvatars: ', prosAvatar)
  /* 
  Will need to fetch the avatar of each user given the id
  Upload avatar to DB via Express and sends data to nextjs api
  */
  useEffect(()=>fetchAvatars(),[])

  return (
    <div>
      <img src={prosAvatar}></img>
    </div>
  )
}

export default Avatar