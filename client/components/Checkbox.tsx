import { pro } from "../prisma/data/users";


const Checkbox = ({ id, filterItem, level  } : any)=> {

  return (

    <div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text">Cert {level}     </span> 
    <input type="checkbox" value={id} onChange={(e) => filterItem(e.target.value)} className="checkbox checkbox-primary" />
  </label>
</div>

  )

}

export default Checkbox;