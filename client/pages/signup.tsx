import Layout from '../components/Layout';
import { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { Resorts } from '@prisma/client';
import ProSignup from '../components/Signup/ProSignup';
import ClientSignup from '../components/Signup/ClientSignup';

const Signup = () => {
  const [type, setType] = useState('');

  const onChangeHandler = (e: any) => {
    setType(e.target.value);
  };
  return (
    <Layout signup={true}>
      <section className="">
        <div className="flex justify-center">
          <h1 className="text-4xl">Signup!</h1>
        </div>
        <div className="flex justify-center">
          <label htmlFor="client">Client Signup</label>
          <input
            value="client"
            type="radio"
            name="signupType"
            id="client"
            onChange={onChangeHandler}
          />
          <label htmlFor="pro">Pro Signup</label>
          <input
            value="pro"
            type="radio"
            name="signupType"
            id="pro"
            onChange={onChangeHandler}
          />
        </div>
        <div className="2xl:container flex justify-center">
          <div className="card bg-base-100 shadow-xl w-2/4">
            <div className="card-body">
              {type === '' ? (
                <div className="flex justify-center">
                  <div>Select a signup type</div>
                </div>
              ) : null}
              {type === 'pro' ? <ProSignup /> : null}
              {type === 'client' ? <ClientSignup /> : null}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Signup;
