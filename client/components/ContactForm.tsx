import { useState } from 'react';
const ContactForm = (props: { pro }) => {
  const openEmail = e => {
    e.preventDefault();
    const query = document.getElementById('yourQuery');
    const subject = document.getElementById('subject');
    return window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${props.pro.email}&su=${subject.value}&body=${query.value}`,
      '_blank',
      'location=yes, height=570, width=520, scrollbars=yes, status=yes'
    );
  };
  return (
    <div className="flex items-center min-w-full flex-col">
      <form
        onSubmit={openEmail}
        target="_blank"
        method="post"
        name="EmailForm"
        encType="text/plain"
        className="w-full flex flex-col items-center p-5"
      >
        <div className="form-control">
          <label className="input-group">
            <span>Subject</span>
            <input
              type="text"
              id="subject"
              placeholder="Subject"
              className="input input-bordered"
            />
          </label>
        </div>

        <div className="flex flex-col items-center md:w-full lg:w-[80%]">
          <label htmlFor="yourQuery" className="label">
            <span className="label-text text-xl mt-7 mb-2">Your Query: </span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            id="yourQuery"
            name="Your message content"
            placeholder="Your Query"
          ></textarea>
        </div>
        <div className="flex justify-center mt-7">
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
