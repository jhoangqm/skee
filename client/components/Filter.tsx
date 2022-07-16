
import { get } from "https"
import Checkbox from "./Checkbox"


const Filter= ({ pros, insList, setFilter, filterItem } : any) => {


  return (
  <> 
    <div className="dropdown">
    <label tabIndex="0" class="btn m-1">Filter Instructors by level</label>
    
    <ul tabIndex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      {insList.map((pros) => (
      <li><a onClick={() => filterItem(pros)}>Cert level {pros}</a></li>
))}
<li><a onClick={() => setFilter(pros)}> Hit me with your rythem stick </a></li>
    </ul >
  </div>
  </>
  )
}
 
export default Filter


{/* <Checkbox level={pros.level} key={pros.id} /> */}