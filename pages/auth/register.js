import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";

export default function Page() {
  const [userDatas, setUserDatas] = useState({});
  const [errorCode, setErrorCode] = useState();
  const Router = useRouter();

  const formHandler = async (e) => {
    e.preventDefault();
    // Cek apakah password sudah cukup 8 karakter
    if (userDatas.password.length < 8) {
      return setErrorCode(2);
    }

    // Cek apakah password yang dimasukkan sama
    if (userDatas.password != userDatas.confirmPassword) {
      return setErrorCode(1);
    }

    //Request register
    createUserWithEmailAndPassword(auth, userDatas.email, userDatas.password)
      .then((userCredential) => {
        console.log(userCredential);
        Router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;

        //Jika email sudah digunakan
        if (errorCode == "auth/email-already-in-use") {
          setErrorCode(3);
        }
      });
  };
  return (
    <section>
      <div>register</div>
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
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="text"
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) =>
            setUserDatas({
              ...userDatas,
              confirmPassword: e.currentTarget.value,
            })
          }
        />
        <button>Register</button>
        {errorCode == 1
          ? "Password tidak sama"
          : errorCode == 2
          ? "Password minimal harus memiliki panjang 8 karakter"
          : errorCode == 3
          ? "Email sudah digunakan, silahkan coba email lain"
          : ""}
      </form>
    </section>
  );
}

export function getServerSideProps() {
  const user = auth.currentUser;
  if (user) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return { props: {} };
}
