import { useState } from "react";
import "./styles.css";
// Instructions for Candidate:
// 1. Add an input field to accept an email.
// 2. Add a button that passes the input value to the parent component.
// 3. In the parent component, add logic to send the value to a backend with a POST request to
//the following url https://webhook.site/6064735c-c7f2-4584-ba9d-1f0e80f32721. Along with the email, send your github username in the JSON.
// 4. Add styling to the button (Button) and input (Input) using the ShadCN Component library here: https://ui.shadcn.com/docs/components/input

interface EmailFormDummy {
  onSubmitForm: (email: string) => void;
}

const EmailForm: React.FC<EmailFormDummy> = ({ onSubmitForm }) => {
  const [email, setEmail] = useState<string>("");

  const handleClick = () => {
    onSubmitForm(email);
  };

  return (
    <div className="container">
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your Email Address..."
        className="input"
      />
      <button onClick={handleClick} className="button">
        Submit
      </button>
    </div>
  );
};

export default function App() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState(false);
  const handleSubmit = (submitEmail: string) => {
    setEmail(submitEmail);
    fetch("https://webhook.site/6064735c-c7f2-4584-ba9d-1f0e80f32721", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        email: email,
        githubusername: "https://github.com/Rahulyadav0296",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setMessage(true);
        console.error(err);
      });
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <EmailForm onSubmitForm={handleSubmit} />
      {message ? (
        <p className="success-message">The Form Sent Successfully</p>
      ) : (
        ""
      )}
    </div>
  );
}
