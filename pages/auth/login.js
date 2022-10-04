import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";

function Page() {
  const [userDatas, setUserDatas] = useState({});

  const formHandler = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, userDatas.email, userDatas.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <section>
      <div>Login</div>
      <form onSubmit={formHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) =>
            setUserDatas({ ...userDatas, email: e.currentTarget.value })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={(e) =>
            setUserDatas({ ...userDatas, password: e.currentTarget.value })
          }
        />

        <button>Login</button>
      </form>
    </section>
  );
}

export default Page;
