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
    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
      <div className="relative">
        <img 
        alt='...'
        src={prosAvatar} 
        className="shadow-xl rounded-full h-auto align-middle border-none"
        style={{ maxWidth: "150px" }}></img>
      </div>
    </div>
  </div>
  );
}

export default Avatar;
