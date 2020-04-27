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
        clientId="1034938527427-ka0dtgorj5rgot11oofffp7l5v74rp9c.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </Container>
  );
};
