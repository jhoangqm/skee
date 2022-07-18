import CheckLevel from "./SkillCheckbox";

const LevelFilter = ({ pros, setFilter, filterItem }) => {

  let unique = (pros.map(item => item.ProsSkills.map((skill) => skill.skills.skill)))
  
  const array = []
    for(let a of unique){
      for(let b of a){
      array.push(b)
      }
    }
  unique = [...new Set(array)]
  // console.log("UNIQUE", unique)

  return (
    <>
      <div className="dropdown">
        <label tabIndex="0" class="btn m-1">Filter Instructors by Skill</label>
        <ul tabIndex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          {unique.map((skill) => (
            <li><a> <CheckLevel id={skill} pros={pros} filterItem={filterItem} /></a></li>
          ))}
        </ul >
      </div>
    </>
  )
}

export default LevelFilter;