import Layout from '../../../lib/layout/Layout';
import Pro from '../../../components/ProProfile/Pro';

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
