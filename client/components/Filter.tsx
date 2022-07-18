
import { get } from "https"
import { resourceLimits } from "worker_threads"
import Checkbox from "./Checkbox"


const Filter = ({ pros, setFilter, filterItem }: any) => {
  // const [checkbox, setCheckbox] = useState()

  const ResortFilter = ({  pros, setFilter, filterItem }) => {

    const unique = [...new Set(pros.map(item => item.resortId))];
    

    return (
      <>
        <div className="dropdown">
          <label tabIndex="0" class="btn m-1">Filter Instructors by resort</label>
          <ul tabIndex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {unique.map((resort) => (
              
              <li><a><Checkbox id={resort} pros={pros} filterItem={filterItem} /></a></li>
            ))}
          </ul >
        </div>
      </>
    )
  }

  

  const SkillFilter = ({  pros, setFilter, filterItem }) => {

    const unique = [...new Set(pros.map(item => item.resortId))];
    console.log("UNIQUE", unique)
    return (
      <>
        <div className="dropdown">
          <label tabIndex="0" class="btn m-1">Filter Instructors by resort</label>
          <ul tabIndex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {unique.map((resort) => (
              <li><a> <Checkbox id={resort} pros={pros} filterItem={filterItem} /></a></li>
            ))}
          </ul >
        </div>
      </>
    )
  }

  return(
    <div>
      <ResortFilter  pros={pros} setFilter={setFilter} filterItem={filterItem}/>
      {/* <SkillFilter  pros={pros} setFilter={setFilter} filterItem={filterItem}/> */}
      {/* <LevelFilter  pros={pros} setFilter={setFilter} filterItem={filterItem}/> */}

    </div>
  )
  









}

export default Filter


{/*  */ }