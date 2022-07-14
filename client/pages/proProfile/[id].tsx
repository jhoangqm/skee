import BookingCalendar from '../../components/Calendar';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BookingRequests from '../../components/BookingRequests';

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/pros')
  const data = await res.json();

  const paths = data.map(pro => {
    return {
      params: {
        id: pro.id.toString()
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  // console.log('ID', context.params.id);
  const res = await fetch(`http://localhost:3000/api/pros/${id}`);
  const data = await res.json();

  // console.log("DATA",data);

  return {

    props: { pro: data,  },

  }
}

const ProProfile = ({pro}) => {

  // const { query } = useRouter();
  //  // TODO: pass down proId props
  //  query.id = 2;

  console.log('pro id: ', pro[0].id)

  return (
    <Layout signup={true}>
      <div className="flex justify-center">
        <div className='text-4xl'>
          {pro[0].firstName} {pro[0].lastName}{' '}
        </div>
      </div>
      <div className="flex justify-around">
        <div className="flex justify-start h-80 w-80 bg-blue-200">
          <div className="justify-self-center self-center">Picture</div>
        </div>
        <div className="flex h-80 w-80 bg-blue-200">
          <div className="justify-self-center self-center">{pro[0].bio}</div>
        </div>
      </div>
      <div className="flex justify-around m-10">
        <div className="flex justify-start">
          <BookingCalendar proId={pro[0].id} />
        </div>
        <div className="flex h-80 w-80 bg-blue-200">
          <div className="justify-self-center self-center">
          <BookingRequests proId={pro[0].id}/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProProfile;