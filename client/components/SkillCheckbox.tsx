const CheckLevel = ({ id, pros, filterItem }) => {
  let bob = pros.map((item) =>
    item.ProsSkills.map((skill) => skill.skills.skill)
  );

  const array = [];
  for (let a of bob) {
    for (let b of a) {
      array.push(b);
    }
  }

  bob = array.filter((pro) => pro === id);
  bob = [...new Set(bob.map((pro) => pro))];
  // console.log("BOB", bob)
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{bob}&nbsp;</span>

        <input
          type="checkbox"
          value={id}
          onChange={(e) => filterItem(e.target.value)}
          className="checkbox checkbox-primary"
        />
      </label>
    </div>
  );
};

export default CheckLevel;