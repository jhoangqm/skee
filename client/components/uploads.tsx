import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';



function Upload(props: {proId}) {
  const [image, setImage] = useState("");
  const [file, setFile] = useState();
  const [imagePreview, setPreview] = useState();
  const inputEl = useRef(null); //ref hidden input

  const { query } = useRouter();
  query.id = props.proId;
  
  const getImage = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));//shows preview
    console.log('file: ', imagePreview)
  }
  

 
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
      // setImage(data.url)
      console.log('data url = ', data.url)
      fetch(`/api/uploads/certification`, {
        method: 'POST',
        body: JSON.stringify(data.url, props.proId)
      })
      .then((res)=>res.json())
    })
      .catch((err) => {
      console.log(err);
    });
  }

  // const uploadImageToDB = () => {
  //   fetch(`/api/uploads/certification`, {
  //     method: 'POST',
  //     body: JSON.stringify(props.proId)
  //   })
  //   .then(res => res.json())
  // }

return (
    <div className="App">
      {/* <h4>Image from server</h4>
      <div className="imageBox">
    </div> */}
    {/* <img src={image} width="100%"></img>
      {image} */}
      {image}
      <hr></hr>
      <h4>Image Preview</h4>
      <form onSubmit={uploadImage}>
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
export default Upload;