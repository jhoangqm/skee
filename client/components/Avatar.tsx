import { useEffect, useState } from 'react';
import UploadAvatar from './Upload/UploadAvatar';

function Avatar(props: { proId }) {
  const [avatars, setAvatars] = useState([]);

  const fetchAvatars = () => {
    fetch(`/api/uploads/avatar/${props.proId}`)
      .then(res => res.json())
      .then(data => setAvatars(data));
  };

  const prosAvatar = avatars.map(img => img.image);

  /* 
  Will need to fetch the avatar of each user given the id
  Upload avatar to DB via Express and sends data to nextjs api
  */
  useEffect(() => fetchAvatars(), []);

  return (
    <div className="imageBox">
    <div className="avatar">
      <div className=" w-72 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img src={prosAvatar} width="100%" object-fit="contain"></img>
      </div>
    </div>
  </div>
  );
}

export default Avatar;
