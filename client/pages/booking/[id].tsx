import Layout from '../../components/Layout';
import BookingCalendar from '../../components/Calendar';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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

const Booking = ( { pro }) => {
  

  return (
    <Layout signup={false}>
      <div className="flex justify-center">
        <p className="text-4xl">
          {pro[0].firstName} {pro[0].lastName}{' '}
        </p>
      </div>
      <div className="flex justify-around">
        <div className="flex justify-start h-80 w-80 bg-blue-200">
          <p className="justify-self-center self-center">Picture</p>
        </div>
        <div className="flex h-80 w-80 bg-blue-200">
          <p className="justify-self-center self-center">{pro[0].bio}</p>
        </div>
      </div>
      <div className="flex justify-around m-10">
        <div className="flex justify-start">
          <BookingCalendar proId={pro[0].id} />
        </div>
        <div className="flex h-80 w-80 bg-blue-200">
          <p className="justify-self-center self-center">
            Booking instructions
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default Booking;
