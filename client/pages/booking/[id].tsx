import Layout from '../../components/Layout';
import BookingCalendar from '../../components/Calendar';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="flex  card-body items-center flex-col">
            <p className="text-xl">Contact:</p>
            <form
              action={`mailto:${pro[0].email}`}
              method="post"
              name="EmailForm"
              encType="text/plain"
            >
              <div className="form-control">
                <label className="input-group">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered"
                  />
                </label>
              </div>
              <div className="form-control mt-1">
                <label className="input-group">
                  <span className="w-full">Email</span>
                  <input
                    type="email"
                    placeholder="info@site.com"
                    className="input input-bordered"
                  />
                </label>
              </div>
              <div className="flex flex-col items-center">
                <label htmlFor="yourQuery" className="label">
                  <span className="label-text text-xl">Your Query: </span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  id="yourQuery"
                  name="Your message content"
                  placeholder="Your Query"
                ></textarea>
              </div>
              <div className="flex justify-center mt-2">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Booking;
