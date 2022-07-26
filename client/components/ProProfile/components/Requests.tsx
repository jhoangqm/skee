import BookingRequests from '../../BookingRequests';
import { Pros } from '@prisma/client';
interface IProProps {
  pro: [Pros];
}
// checks requests from booking requests component
const Requests = ({ pro }: IProProps) => {
  return (
    <div className="request-box flex flex-wrap w-[86%]">
      <div className="justify-self-center self-center">
        <BookingRequests proId={pro[0].id} />
      </div>
    </div>
  );
};

export default Requests;
