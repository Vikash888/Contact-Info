import React, { useState, useRef } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });
  
  const formRef = useRef(null);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    
    try {
      // Submit the form using the native form submission
      formRef.current.submit();
      
      // Show success message
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: 'Message sent successfully! Redirecting...' }
      });
      
      // Reset the form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Optional: Redirect after a short delay
      // setTimeout(() => {
      //   window.location.href = '/Contact-Info/thank-you.html';
      // }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'Failed to send message. Please try again.' }
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Send us a message</h2>
      
      {status.info.msg && (
        <div className={`p-4 mb-4 rounded ${status.info.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {status.info.msg}
        </div>
      )}

      {/* Visible React form for UI */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status.submitting}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {status.submitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
      
      {/* Hidden form that will actually be submitted */}
      <form 
        ref={formRef}
        action="https://formsubmit.co/vikash.jmbox@gmail.com" 
        method="POST"
        style={{ display: 'none' }}
      >
        <input type="text" name="name" value={formData.name} readOnly />
        <input type="email" name="email" value={formData.email} readOnly />
        <input type="text" name="_subject" value={formData.subject} readOnly />
        <textarea name="message" value={formData.message} readOnly></textarea>
        <input type="hidden" name="_next" value="https://vikash888.github.io/Contact-Info/thank-you.html" />
        <input type="hidden" name="_captcha" value="false" />
      </form>
    </div>
  );
};

export default ContactForm;
