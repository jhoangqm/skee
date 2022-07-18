import { pro } from "../prisma/data/users";

const Checkbox = ({ id, pros, filterItem }: any) => {
  const CheckResorts = ({ id, pros, filterItem }) => {
    let bob = pros.filter((pro) => pro.resorts.id === id);
    bob = [...new Set(bob.map((pro) => pro.resorts.name))];
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

  return <CheckResorts id={id} pros={pros} filterItem={filterItem} />;
};

export default Checkbox;
