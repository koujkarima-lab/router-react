import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // form stays non-functional but doesn't reload the page
    console.log('Form submitted (not really)'); // just for dev
  };

  return (
    <>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" placeholder="Your name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="you@example.com" />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows="4" />
        </div>
        <button className="btn btn-primary" type="submit">Send (visual only)</button>
      </form>
    </>
  );
};

export default Contact;