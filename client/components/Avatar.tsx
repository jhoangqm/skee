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

  console.log('prosAvatars: ', prosAvatar);
  /* 
  Will need to fetch the avatar of each user given the id
  Upload avatar to DB via Express and sends data to nextjs api
  */
  useEffect(() => fetchAvatars(), []);

  return (
    <div>
      <h1>Hello from Avatar</h1>
      <img
        src={prosAvatar}
        object-fit="contain"
        className="flex justify-start bg-blue-200 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
      ></img>
      <UploadAvatar proId={props.proId} />
    </div>
  );
}

export default Avatar;
