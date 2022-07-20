
import Checkbox from "./Checkbox";
import CheckLevel from "./SkillCheckbox";

const Filter = ({ pros, filterItem }: any) => {
  const uniqueResort = [...new Set(pros.map((item) => item.resortId))];

  let uniqueSkill = pros.map((item) =>
    item.ProsSkills.map((skill) => skill.skills.skill)
  );

  const array = [];
  for (let a of uniqueSkill) {
    for (let b of a) {
      array.push(b);
    }
  }
  uniqueSkill = [...new Set(array)];

  return (
    <>
      <>
        <ul className="menu bg-base-100 w-56 p-2 rounded-box ml-5">
          <li>
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
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
              Filters:
            </div>
          </li>

          <li>
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              type="button"
            >
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
                <path d="M3 20h18L12 4z" />
              </svg>
              By Resort
            </button>
          </li>
          <div id="dropdown">
            <ul aria-labelledby="dropdownDefault">
              {uniqueResort.map((resort) => (
                <li>
                  <a>
                    <Checkbox id={resort} pros={pros} filterItem={filterItem} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <li>
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              type="button"
            >
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
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              By Specialities
            </button>
            <div id="dropdown">
              <ul aria-labelledby="dropdownDefault">
                {uniqueSkill.map((skill) => (
                  <li>
                    <a>
                      <CheckLevel
                        id={skill}
                        pros={pros}
                        filterItem={filterItem}
                      />
                    </a>
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
