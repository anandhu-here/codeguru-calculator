import React, { useState } from 'react';

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LOGIN_FAILED, LOGIN_OK } from '../../../redux/types';
// components
import { login } from '../../../utils/requests';
import { Visibility, VisibilityOff } from '@mui/icons-material';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        email:'',
        password:''
      });
    const [formErrors, setFormErrors] = React.useState({
        email: false,
        password: false,
        // ...other form fields
    });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setLoading(true)
    login({...formData}).then(response=>{
      localStorage.setItem('user', JSON.stringify(response.data));
      setLoading(false)
      dispatch({type:LOGIN_OK, payload:response.data});
      window.location.href = "/"
    }).catch(error=>{
      setLoading(false)
      dispatch({type:LOGIN_FAILED});
    })
  };

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };
  const validateField = (field) => {
    if (formData[field].trim() === '') {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [field]: true,
      }));
      return false;
    }
    return true;
  };

  const isFormValid = () => {
   
    return validateField('email') && validateField('password') 
  };

  return (
    <>
      <Stack spacing={3} px={4} style={{width:'100%'}}  >
        <TextField  name="email" label="Email address" value={formData.email} // Set the value from the state
            onChange={(event) => handleInputChange('email', event.target.value)} // Handle input change
            error={formErrors.email} // Set error state based on formErrors
            helperText={formErrors.email ? 'First name is required' : ''} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {!showPassword?(<Visibility />):(<VisibilityOff />)}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={formData.password} // Set the value from the state
          onChange={(event) => handleInputChange('password', event.target.value)} // Handle input change
          error={formErrors.password} // Set error state based on formErrors
          helperText={formErrors.password ? 'First name is required' : ''}
        />
      </Stack>

      <Stack px={4} direction="row" alignItems="center" justifyContent="space-between"  sx={{ my: 2,}}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton loading={loading} fullWidth size="large" type="submit" variant="contained" style={{width:'70%', maxHeight:'50px',}} onClick={handleClick}>
          Login
      </LoadingButton>
      
    </>
  );
}
