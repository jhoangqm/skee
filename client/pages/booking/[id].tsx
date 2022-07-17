import Layout from '../../components/Layout';
import BookingCalendar from '../../components/BookingCalendar';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ContactForm from '../../components/ContactForm';

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
  // console.log('ID', context.params.id);
  const res = await fetch(`http://localhost:3000/api/pros/${id}`);
  const data = await res.json();

  // console.log("DATA",data);

  return {
    props: { pro: data },
  };
};

const contactSubmitHandler = async (e, setError) => {};

const Booking = ({ pro }) => {
  return (
    <Layout signup={false}>
      <div className="p-10 px-32">
        <div className="flex justify-center">
          <p className="text-4xl mb-6 ">
            {pro[0].firstName} {pro[0].lastName}{' '}
          </p>
        </div>
        <div className="flex justify-around">
          <div className="flex justify-start h-80 w-80 bg-blue-200"></div>
          <div className="flex justify-start m-2">
            <BookingCalendar proId={pro[0].id} />
          </div>
        </div>
        <p className="text-xl my-6 flex justify-center text-2xl bold">
          Instructor bio
        </p>
        <div className="flex justify-around">
          <div className="flex rounded-md  shadow-custom p-8">
            <p className="justify-self-center self-center">{pro[0].bio}</p>
          </div>
        </div>
        <p className="text-2xl  my-10 flex justify-center">Booking Steps</p>
        <div className="flex justify-center">
          <div className="flex  mb-20 rounded-md justify-center w-max">
            <ul className="steps">
              <li className="step step-primary">
                Select a lesson date and time
              </li>
              <li className="step step-primary">
                Request your prefered instructor
              </li>
              <li className="step step-primary">
                The instructor will respond to the request
              </li>
              <li className="step step-primary">Go shred the gnar!!</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-around m-10">
          <div className="card w-1/2 bg-base-100 shadow-xl -z-10">
            <ContactForm pro={pro[0]} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Booking;
