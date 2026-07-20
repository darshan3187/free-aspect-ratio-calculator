import React, { useState } from 'react';
import { Mail, Check, Send } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Feedback / Feature Request');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-xl bg-[#171717] border border-white/10 text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mx-auto">
          <Check className="w-5 h-5 font-bold" />
        </div>
        <h2 className="text-lg font-bold text-white font-sans">Message Sent Successfully!</h2>
        <p className="text-xs text-neutral-300 font-sans max-w-sm mx-auto">
          Thank you for contacting Aspect Ratio Calculator. Your feedback helps us maintain the best ad-free utility on the web.
        </p>
        <button
          onClick={() => { setSubmitted(false); setMessage(''); }}
          className="mt-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div>
        <label htmlFor="contact-email" className="block font-semibold text-neutral-200 mb-1.5">
          Your Email Address
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="designer@example.com"
          className="w-full studio-input px-3.5 py-2.5 text-sm"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block font-semibold text-neutral-200 mb-1.5">
          Subject Category
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full studio-input px-3.5 py-2.5 text-sm font-sans"
        >
          <option value="Feedback / Feature Request">Feature Request / Feedback</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Security Inquiry">Security & Privacy Inquiry</option>
          <option value="General Question">General Question</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block font-semibold text-neutral-200 mb-1.5">
          Message Detail
        </label>
        <textarea
          id="contact-message"
          required
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback, issue, or request..."
          className="w-full studio-input px-3.5 py-2.5 text-sm resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 shadow-md"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Submit Message</span>
      </button>
    </form>
  );
}
