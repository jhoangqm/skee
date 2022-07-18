
import { get } from "https"
import { resourceLimits } from "worker_threads"
import Checkbox from "./Checkbox"


const Filter= ({ pros, insList, setFilter, filterItem } : any) => {
// const [checkbox, setCheckbox] = useState()


const unique = [...new Set(pros.map(item => item.resortId))];
console.log("UNIQUE",unique)
  return (
  <> 
    <div className="dropdown">
    <label tabIndex="0" class="btn m-1">Filter Instructors by level</label>
    
    <ul tabIndex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      {unique.map((resort) => (
      <li><a> <Checkbox id={resort} pros={pros} filterItem={filterItem} /></a></li>
))}
{/* <li><a onClick={() => setFilter()}> Hit me with your rythem stick </a></li> */}
    </ul >
  </div>
  </>
  )
}
 
export default Filter


{/*  */}