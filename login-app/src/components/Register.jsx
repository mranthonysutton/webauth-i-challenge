import React, {useState} from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import {Button, Container, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Register = props => {
  const classes = useStyles();
  const [registerCredentials, setRegisterCredentials] = useState([]);

  const handleRegister = event => {
    event.preventDefault();
    axiosWithAuth()
      .post('api/register', registerCredentials)
      .then(response => {
        console.log(response.data);
        props.history.push('/users');
      })
      .catch(error => console.log(error));
  };

  const handleChange = event => {
    setRegisterCredentials({
      ...registerCredentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container maxWidth={'sm'}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
            Register
          </Button>
          <Button
            fullWidth
            size={'large'}
            margin={'normal'}
            variant={'contained'}
            color={'secondary'}
            href="/">
            Login
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Register;
