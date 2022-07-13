import BookingCalendar from '../../components/Calendar';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BookingRequests from '../../components/BookingRequests';


const ProProfile = (props: { proId }) => {

  const { query } = useRouter();
   // TODO: pass down proId props
   query.id = 2;

  return (
    <Layout signup={true}>
      <div className="flex justify-center">
      </div>
      <div className="flex justify-around">
        <div className="flex justify-start h-80 w-80 bg-blue-200">
          <div className="justify-self-center self-center">Picture</div>
        </div>
        <div className="flex h-80 w-80 bg-blue-200">
          <div className="justify-self-center self-center">Bio/Skills</div>
        </div>
      </div>
      <div className="flex justify-around m-10">
        <div className="flex justify-start">
          <BookingCalendar proId={query.id} />
        </div>
        <div className="flex h-80 w-80 bg-blue-200">
          <div className="justify-self-center self-center">
          <BookingRequests proId={query.id}/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProProfile;