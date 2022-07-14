import Link from "next/link";
import Map from "./Map";


const MapPopup = ( { setShowMap }: any ) => {
 
  return (
    <>
      
        
          <input type="checkbox" id="my-modal-3" className="modal-toggle" /><div className="modal">
            <div className="modal-box relative">
              <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => {setShowMap(false)}}>✕</label>
              <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
              <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            </div>
          </div>
        
        
      
    </>
  )
}

export default MapPopup;