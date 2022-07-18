import BookingCalendar from '../../../components/BookingCalendar';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import BookingRequests from '../../../components/BookingRequests';
// import Upload from '../../components/uploads';
import Pro from '../../../components/ProProfile/Pro';
import User from '../../../components/ClientProfile/Client';

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/pros');
  const data = await res.json();

  const paths = data.map(pro => {
    return {
      params: {
        id: pro.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/pros/${id}`);
  const data = await res.json();


  return {
    props: { pro: data },
  };
};

const Profile = ({ pro }) => {
  return (
    <Layout signup={true}>
      <Pro pro={pro} />
    </Layout>
  );
};

export default Profile;
