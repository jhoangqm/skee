import BookingCalendar from '../../../components/Calendar';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import BookingRequests from '../../../components/BookingRequests';
// import Upload from '../../components/uploads';
import Pro from '../../../components/ProProfile/Pro';
import User from '../../../components/Profile/User';

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/clients')
  const data = await res.json();

  const paths = data.map(client => {
    return {
      params: {
        id: client.id.toString()
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
  const res = await fetch(`http://localhost:3000/api/clients/${id}`);
  const data = await res.json();

  // console.log("DATA",data);

  return {

    props: { user: data,  },

  }
}

const Profile = ({ user }) => {


  console.log('user id: ', user)

  return (
    <Layout signup={true}>
      <User user={user}/>
    </Layout>
  );
};

export default Profile;