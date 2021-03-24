import React, { useState } from "react";
import { ArrRight } from "../Common/icons";
import messageSent from "../../images/message-sent.svg";
import { firestoreDB } from "../../utils/firebase";

const ContactSection = () => {
  const [isSent, setSent] = useState(false)
  const [industry, setIndustry] = useState('Select an industry')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const sendForm = (e) => {
    e.preventDefault();
    if (!industry || !email || !message) return false;
    firestoreDB.collection("orders").add({
      industry,
      email,
      message
    })
      .then((docRef) => {
        setSent(true)
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  return (
    <section className="contact" id="contact-us">
      <div className="container">
        <div>
          <h1>Contact Us</h1>

          {isSent ? <>
            <h5 className="sent">Your message has been sent</h5>
            <p className="text">
              We work with ambitious leaders who want to define the future, not hide
              from it. Together, we achieve extraordinary outcomes.
            </p>
            <img className="sent" src={messageSent} alt="messageSent" />
          </> : <div className="send">
            <h5>Ready to talk?</h5>
            <p className="text">What can we help you achieve?</p>
            <form className="contact__form" onSubmit={(e) => sendForm(e)}>
              <label htmlFor="value">
                <select id="value" name="value" value={industry
                } onChange={(e) => setIndustry(e.target.value)} required>
                  <option value="Select an industry">Select an industry</option>
                  <option value="Grow your revenue">Grow your revenue</option>
                  <option value="Improve your strategic direction">Improve your strategic direction</option>
                  <option value="Co-develop custom software">Co-develop custom software</option>
                  <option value="Increase LTV">Increase LTV</option>
                  <option value="Create or enhance a call center">Create or enhance a call center</option>
                  <option value="Create on enhance a Salesforce instance or another ERP software.">Create on enhance a Salesforce instance or another ERP software.</option>
                </select>
              </label>
              <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" required />
              <textarea
                placeholder="Message (optional)"
                name="message"
                value={message} onChange={(e) => setMessage(e.target.value)}
                cols="30"
                rows="10"
                required
              ></textarea>
              <button type="submit">
                Send message
              <ArrRight />
              </button>
            </form>
          </div>}
        </div>
      </div>
    </section>
  )
};
export default ContactSection;
