import Layout from "../../../components/Layout";
import User from "../../../components/ClientProfile/Client";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/clients");
  const data = await res.json();

  const paths = data.map((client) => {
    return {
      params: {
        id: client.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const res = await fetch(`http://localhost:3000/api/clients/${id}`);
  const data = await res.json();

  return {
    props: { user: data },
  };
};

const Profile = ({ user }) => {
  return (
    <Layout signup={true}>
      <User user={user} />
    </Layout>
  );
};

export default Profile;
