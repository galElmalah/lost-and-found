import * as React from 'react';
import GoogleLogin from 'react-google-login';
import Container from '@material-ui/core/Container';
import { UserDetailsContext } from '../../providers/UserDetailsProvider/index';

export const LoginPage = () => {
  const { userDetails, setUserDetails } = React.useContext(UserDetailsContext);

  const responseGoogle = (response) => {
    console.log(response);
    setUserDetails(response);
  };

  console.log({ userDetails });
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
