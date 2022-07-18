import Layout from '../components/Layout';
import { useState } from 'react';
import ProSignup from '../components/Signup/ProSignup';
import ClientSignup from '../components/Signup/ClientSignup';
import bcrypt from 'bcryptjs';

const Signup = () => {
  const [type, setType] = useState('');

  const onChangeHandler = (e: any) => {
    setType(e.target.value);
  };
  return (
    <Layout signup={true}>
      <section className="">
        <div className="flex justify-center">
          <h1 className="text-4xl mt-10 mb-5">Register now</h1>
        </div>
        <div className="flex items-center flex-col ">
          <ul className="menu menu-vertical lg:menu-horizontal bg-base-100 rounded-box">
            <li>
              <label htmlFor="client" className="w-40">
                I am looking for an Instructor
              </label>
              <input
                value="client"
                type="radio"
                name="signupType"
                id="client"
                className="opacity-0 cursor-pointer w-0"
                onClick={onChangeHandler}
              />
            </li>
            <li className="pointer-events-none opacity-100">
              <a className="opacity-100">OR</a>
            </li>
            <li>
              <label htmlFor="pro">I am an Instructor</label>
              <input
                value="pro"
                type="radio"
                name="signupType"
                className="opacity-0 cursor-pointer w-0"
                id="pro"
                onClick={onChangeHandler}
              />
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <div className="card bg-base-100 shadow-xl w-1/2">
            <div className="card-body">
              {type === '' ? (
                <div className="flex justify-center">
                  <div>Select a signup type</div>
                </div>
              ) : null}
              {type === 'pro' ? <ProSignup salt={salt} /> : null}
              {type === 'client' ? <ClientSignup salt={salt} /> : null}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Signup;
