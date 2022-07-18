import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';



function Upload(props: {proId}) {
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
  
  //updates image in DB
  const updateImageDB = (data) =>{
    const certObj = {};
    certObj.uniqueID = props.proId
    certObj.certImg = data.url
    fetch(`/api/uploads/certification`, {
      method: 'PATCH',
      body: JSON.stringify(certObj)
    })
    .then((res)=>res.json())
  }

  // uploads image to backend server
  const uploadImage = (e) => {
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
      updateImageDB(data)
    })
      .catch((err) => {
      console.log(err);
    });
  }


return (
    <div className="App">
      <hr></hr>
      {/* <h4>Certification Preview</h4> */}
      <form onSubmit={uploadImage}>
        <div className="imageBox">
          <img src={imagePreview} width='150px'></img>
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
export default Upload;