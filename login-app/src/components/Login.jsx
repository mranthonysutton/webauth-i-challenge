import React, {useState} from 'react';
import {Button, Container, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const [loginCredentials, setLoginCredentials] = useState([]);

  const handleLogin = event => {
    event.preventDefault();
    console.log(loginCredentials);
  };

  const handleChange = event => {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container maxWidth={'sm'}>
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <TextField
          required
          autoFocus
          fullWidth
          margin={'normal'}
          label={'Username...'}
          variant={'outlined'}
          type="text"
          name="username"
          placeholder="Username..."
          onChange={handleChange}
        />
        <TextField
          required
          autoFocus
          fullWidth
          margin={'normal'}
          label={'Password...'}
          variant={'outlined'}
          type="password"
          name="password"
          placeholder="Password..."
          onChange={handleChange}
        />
        <div className={classes.root}>
          <Button
            fullWidth
            size={'large'}
            margin={'normal'}
            variant={'contained'}
            color={'primary'}
            type="submit">
            Login
          </Button>
          <Button
            fullWidth
            size={'large'}
            margin={'normal'}
            variant={'contained'}
            color={'secondary'}>
            Register
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
