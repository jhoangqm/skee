
import { get } from "https"
import Checkbox from "./Checkbox"


const Filter= ({ pros, insList, setFilter, filterItem } : any) => {
// const [checkbox, setCheckbox] = useState()
console.log()
  return (
  <> 
    <div className="dropdown">
    <label tabIndex="0" class="btn m-1">Filter Instructors by level</label>
    
    <ul tabIndex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      {pros.map((pros) => (
      <li><a> <Checkbox id={pros.id} filterItem={filterItem} level={pros.level} resorts={pros.resorts}/></a></li>
))}
{/* <li><a onClick={() => setFilter()}> Hit me with your rythem stick </a></li> */}
    </ul >
  </div>
  </>
  )
}
 
export default Filter


{/*  */}