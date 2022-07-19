import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function UploadAvatar(props: { proId }) {
  // const [image, setImage] = useState("");
  const [file, setFile] = useState();
  const [success, setSuccess] = useState(false);
  const [imagePreview, setPreview] = useState();
  const inputEl = useRef(null); //ref hidden input
  const clearPreview = useRef(null);

  const { query } = useRouter();
  query.id = props.proId;

  // gets image from event
  const getImage = e => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0])); //shows preview
  };

  // updates the avatar in the DB
  const updateAvatarDB = data => {
    // Creating obj because I can't pass two values in
    // JSON.stringify's params
    const avatarObj = {};
    avatarObj.uniqueID = props.proId;
    avatarObj.avatar = data.url;
    fetch(`/api/uploads/avatar`, {
      method: 'PATCH',
      body: JSON.stringify(avatarObj),
    }).then(res => res.json());
  };
  // upload avatar function
  const uploadAvatar = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    axios({
      method: 'post',
      url: 'http://localhost:8000/upload',
      data: formData,
    })
      .then(response => {
        const { data } = response;
        setSuccess(true);
        console.log('hello');
        e.target.reset();
        updateAvatarDB(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <hr></hr>
      {/* <h4>Avatar Preview</h4> */}
      <form onSubmit={uploadAvatar}>
        <div className="imageBox flex justify-center my-2">
          <div className="avatar">
            <div className="rounded-full ">
              <img
                src={imagePreview}
                object-fit="contain"
                style={{ maxWidth: '150px' }}
              ></img>
            </div>
          </div>
        </div>

        {success ? (
          <p className="flex justify-center font-bold text-success">Success!</p>
        ) : (
          <div className="flex flex-col">
            <input
              type="file"
              onChange={getImage}
              className="" //hiding input
              ref={inputEl} //set inputEl to referring this element
            />
            <button
              className="btn btn-primary hover:btn-success my-3"
              type="submit"
            >
              upload
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
export default UploadAvatar;
