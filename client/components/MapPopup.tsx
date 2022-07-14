import Link from "next/link";
import Map from "./Map";


const MapPopup = ({ setShowMap, resorts }: any) => {
  
  return (
    <>


      <input type="checkbox" id="my-modal-3" className="modal-toggle" /><div className="modal">

        <div className="modal-box relative">
          {resorts.map((resort) => (
            <><label key={resorts.id} className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => { setShowMap(false); }}>✕</label>
            <Link href={`/instructors/${resort.id}`}>
            <button className="btn btn-wide">{resort.name}</button>
            </Link>
            {/* <h3 className="text-lg font-bold"></h3>
            <p className="py-4">{}</p> */}
            </>
          ))}   
          </div>
      </div>



    </>
  )
}

export default MapPopup;