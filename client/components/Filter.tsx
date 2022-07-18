import { get } from "https";
import { useState } from "react";
import { resourceLimits } from "worker_threads";
import Checkbox from "./Checkbox";
import CheckLevel from "./SkillCheckbox";

const Filter = ({ pros, filterItem }: any) => {
  const [showResort, setShowResort] = useState(false)
const uniqueResort = [...new Set(pros.map((item) => item.resortId))];
  
    
let uniqueSkill = (pros.map(item => item.ProsSkills.map((skill) => skill.skills.skill)))
  
  const array = []
    for(let a of uniqueSkill){
      for(let b of a){
      array.push(b)
      }
    }
  uniqueSkill = [...new Set(array)]
  

  return (
    <>
      
      <>
        <ul className="menu bg-base-100 w-56 p-2 rounded-box ml-5">
          <li >
            <div className="disabled:transform-none disabled:transition-none disabled:shadow-none disabled: bg-base-100 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                <circle cx="12" cy="10" r="3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Filters:
            </div>
          </li>

          <li>
            <button id="dropdownDefault" data-dropdown-toggle="dropdown" type="button" >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
              </svg>
              By Resort
            </button>
          
          </li>
          <div id="dropdown" >
            <ul aria-labelledby="dropdownDefault">
            {uniqueResort.map((resort) => (
            <li>
              <a><Checkbox id={resort} pros={pros} filterItem={filterItem} /></a>
              </li>
              ))}
              </ul>
              </div>

          <li>
            <button id="dropdownDefault" data-dropdown-toggle="dropdown" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              By Specialities
            </button>
            <div id="dropdown" >
            <ul aria-labelledby="dropdownDefault">
            {uniqueSkill.map((skill) => (
            <li>
              <a> <CheckLevel id={skill} pros={pros} filterItem={filterItem} /></a>
              </li>
              ))}
              </ul>
              </div>
            
          </li>
        </ul>
      </>
    </>
  );
};

export default Filter;

{
  /*  */
}
