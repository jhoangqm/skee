import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';



function UploadAvatar(props: {proId}) {
  // const [image, setImage] = useState("");
  const [file, setFile] = useState();
  const [imagePreview, setPreview] = useState();
  const inputEl = useRef(null); //ref hidden input

  const { query } = useRouter();
  query.id = props.proId;
  
  const getImage = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));//shows preview
  }
  
  const updateAvatarDB = (data) =>{
    // Creating obj because I can't pass two values in
    // JSON.stringify's params
    const avatarObj = {};
    avatarObj.uniqueID = props.proId
    avatarObj.avatar = data.url
    fetch(`/api/uploads/avatar`, {
      method: 'PATCH',
      body: JSON.stringify(avatarObj)
    })
    .then((res)=>res.json())
  }

  const uploadAvatar = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", file);
    axios({
      method: "post",
      url: "http://localhost:5000/upload",
      data: formData,
    })
      .then((response) => {
      const { data } = response;
      updateAvatarDB(data)
    })
      .catch((err) => {
      console.log(err);
    });
  }


return (
    <div className="App">
      <hr></hr>
      <h4>Avatar Preview</h4>
      <form onSubmit={uploadAvatar}>
        <div className="imageBox">
          <img src={imagePreview} width="100%"></img>
        </div>
        <input type="file"
          onChange={getImage}
          style={{display: "none"}} //hiding input
          ref={inputEl} //set inputEl to referring this element
        ></input>
        <button className='btn'
          onClick={() => inputEl.current.click()}
        >select image</button>
        <button className='btn' type="submit">upload</button>
      </form>
    </div>
  );
}
export default UploadAvatar;