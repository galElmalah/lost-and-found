import * as React from 'react';
import GoogleLogin from 'react-google-login';
import Container from '@material-ui/core/Container';
import { UserDetailsContext } from '../../providers/UserDetailsProvider/index';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';

export const LoginPage = () => {
  const { userDetails, setUserDetails } = React.useContext(UserDetailsContext);
  const history = useHistory();
  console.log(userDetails);
  const responseGoogle = (response) => {
    setUserDetails(response.profileObj);
    history.push('/map');
  };

  if (userDetails.name) {
    return <Redirect to="/map" />;
  }

  return (
    <Container maxWidth="sm">
      <p>Login via your google account</p>
      <GoogleLogin
        clientId="1034938527427-ka0dtgorj5rgot11oofffp7l5v74rp9c.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={console.error}
        cookiePolicy={'single_host_origin'}
      />
    </Container>
  );
};
