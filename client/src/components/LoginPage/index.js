import * as React from 'react';
import GoogleLogin from 'react-google-login';
import Container from '@material-ui/core/Container';

export const LoginPage = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <Container maxWidth="sm">
      <p>Login via your google account</p>
      <GoogleLogin
        clientId="496365561514-sniul99m71tfo5of9ic00griog2ff8me.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </Container>
  );
};
