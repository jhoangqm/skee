import React, { useState, useEffect } from "react";
const axios = require("axios");

function Upload() {
  const [file, setFile] = useState(null);

  useEffect(() => {})

  return (
    <div>
    <h1>File uploads</h1>
    <form action="/upload" encType="multipart/form-data" method="POST"> 
      <input type="file" name="files" multiple/>
       <button className='btn' type="submit" value="Upload a file">Upload</button>
    </form>
    </div>
  )
}

export default Upload