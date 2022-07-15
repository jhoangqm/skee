import BookingCalendar from "../Calendar"
import BookingRequests from "../BookingRequests"
import Certification from "./Certification/Certification"

const Pro = ({ pro }) => {
  return (

    <><div className="flex justify-center">
      <div className='text-4xl'>
        {pro[0].firstName} {pro[0].lastName}{' '}
      </div>
    </div><div className="flex justify-around">
        <div className="flex justify-start h-80 w-80 bg-blue-200">{pro[0].certImg}
        <Certification proId={pro[0].id}/>
          {/* <div className="justify-self-center self-center">Picture
    <Upload/>
    </div> */}

        </div>
        <div className="flex h-80 w-80 bg-blue-200">
          <div className="justify-self-center self-center">{pro[0].bio}</div>
        </div>
      </div><div className="flex justify-around m-10">
        <div className="flex justify-start">
          <BookingCalendar proId={pro[0].id} />
        </div>
        <div className="flex h-80 w-80 bg-blue-200">
          <div className="justify-self-center self-center">
            <BookingRequests proId={pro[0].id} />
          </div>
        </div>
      </div></>

  )
}

export default Pro