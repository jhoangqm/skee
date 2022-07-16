import { pro } from "../prisma/data/users";


const Checkbox = ({ level, key, getSelectedCategories } : any)=> {

  return (


    <div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text"> cert level {level} </span> 
    <input type="checkbox" value={key} onChange={e => getSelectedCategories(e.target.checked)} className="checkbox checkbox-primary" />
  </label>
</div>

  )

}

export default Checkbox;