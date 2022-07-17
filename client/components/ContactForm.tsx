const ContactForm = (props: { pro }) => {
  return (
    <div className="flex card-body items-center min-w-full flex-col">
      <p className="text-xl">Contact:</p>
      <form
        action={`mailto:${props.pro.email}`}
        method="post"
        name="EmailForm"
        encType="text/plain"
        className="w-full flex flex-col items-center"
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
        <div className="form-control mt-3">
          <label className="input-group">
            <span className="">Email</span>
            <input
              type="email"
              placeholder="info@site.com"
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="flex flex-col items-center w-full">
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
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
