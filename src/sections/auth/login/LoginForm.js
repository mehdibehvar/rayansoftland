import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import { actionType, authContext } from '../../../contexts/authContext';
import Iconify from '../../../components/iconify';
import { setItem } from '../../../utils/storage.service';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
const [email, setEmail] = useState('abc@mail.com');
const [password, setPassword] = useState('123456');
const [rememberMe, setRememberMe] = useState(false);
const {dispatch}=useContext(authContext);
  const [showPassword, setShowPassword] = useState(false);

const handleLogin=(e)=>{
e.preventDefault();
dispatch({
  type:actionType.login_request,
})
try {
  dispatch({
    type:actionType.login_success,
    payload:{
      email,
      password
    }
  });
  if(rememberMe){
    setItem("email",JSON.stringify(email));
  }
  navigate('/dashboard', { replace: true });
} catch (error) {
  dispatch({
    type:actionType.login_error,
    payload:{
      error:"something went wrong"
    }
  })
}
}
  return (
    <>
<form onSubmit={handleLogin}>
<Stack spacing={3}>
        <TextField name="email" label="Email address" value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" checked={rememberMe} onChange={(e)=>setRememberMe(e.target.checked)}/>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
</form>
    </>
  );
}
