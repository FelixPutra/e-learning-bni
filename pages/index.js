import { auth } from "../firebase";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";


export default function Home() {
  const Router = useRouter()
  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        Router.push('/')
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <button onClick={logoutHandler}>Log Out</button>
    </div>
  )
}
