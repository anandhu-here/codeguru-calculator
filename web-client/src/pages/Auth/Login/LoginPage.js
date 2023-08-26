
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';

import useResponsive from '../../../utils/useResponsive';

import LoginForm from './LoginForm';


const StyledRoot = styled('div')(({ theme }) => ({
  display:'flex',
  height:'100vh',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor: '#61d9fd',
  background: "linear-gradient(0deg, #61d9fd 0%, #97D9E1 100%)",


  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width:'100%',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  backgroundColor:'white',
  margin: 'auto',
  textAlign:'center',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  alignItems:'center',
  borderRadius:15,
  boxShadow:'1px 0 10px rgba(0, 0, 0, 0.3)',
}));


export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>

      <StyledRoot>


        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              LOGIN
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" href='/register' >Get started</Link>
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
