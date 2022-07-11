import React, { useState, useEffect } from "react";
const Axios = require("axios");

function Upload() {
  const [file, setFile] = useState();

  const send = event => {
    const data = new FormData();
    data.append("file", file);

    Axios.post("/upload", data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };


  return (
    <div>
    <h1>File uploads</h1>
    {/* <form action="/upload" encType="multipart/form-data" method="POST">  */}
      <form>
      <input 
      type="file" 
      // name="files" 
      onChange={event => {
        const file = event.target.files[0];
        setFile(file)
      }}
        multiple/>
       <button 
       className='btn' 
       type="submit" 
       onClick={send}>Upload</button>
    </form>
    </div>
  )
}

export default Upload