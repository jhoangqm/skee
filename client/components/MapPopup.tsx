import Link from "next/link";

import Map from "./Map";


const MapPopup = () => {

  return(

<div className="dropdown">
  <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>

  )
}

export default MapPopup;