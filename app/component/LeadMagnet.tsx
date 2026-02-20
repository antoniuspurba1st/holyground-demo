"use client";

import { useState, useEffect } from "react";

export default function LeadMagnet() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

useEffect(() => {
  const hasClosed = localStorage.getItem("closedPopup");

  if (!hasClosed) {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1999);

    return () => clearTimeout(timer);
  }
}, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded w-full max-w-md text-black relative">
<button
  onClick={() => {
    localStorage.setItem("closedPopup", "true");
    setShow(false);
  }}
  className="absolute top-2 right-3 text-xl"
>
  ×
</button>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Get a Free Catholic eBook 📖
            </h2>

            <input
              type="email"
              placeholder="Enter your email"
              className="border px-3 py-2 w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

<button
  onClick={async () => {
    if (!email.includes("@")) {
      alert("Enter valid email");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log("Signup response:", data);

    setSubmitted(true);
  }}
  className="bg-black text-white w-full py-2"
>
  Download Free eBook
</button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Thank you! 🙏
            </h2>
            <p>
              Your free Catholic eBook has been sent to {email}.
            </p>
          </>
        )}
      </div>
    </div>
  );
}