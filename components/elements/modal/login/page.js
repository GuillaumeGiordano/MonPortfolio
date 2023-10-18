import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import ButtonRegular from "../../../buttons/buttonRegular/page";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
        {/* <ButtonRegular onClick={() => signOut()} libelle={"Se déconnecter"} /> */}
      </>
    );
  }

  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign in</button>
      {/* <ButtonRegular onClick={() => signOut()} libelle={"Se connecter"} /> */}
    </>
  );
};

export default Login;
