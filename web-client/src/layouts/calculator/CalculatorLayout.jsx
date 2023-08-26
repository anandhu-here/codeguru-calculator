import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//

import Nav from './Nav';
import Header, { HEADER_DESKTOP } from '../header/Header';
import { theme_color } from '../../theme/colors';
import { getExpenses } from '../../utils/requests';


// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 100;
const NAV_WIDTH = 280;

const StyledRoot = styled('div')({
  display: 'flex',
  height:'100vh',
  width:'100%',
  paddingInline:10,

//   backgroundColor:'#c38d93',\background-color: #0093E9;

background: `linear-gradient(to bottom, ${theme_color} 40%, #F9F9F6 40%) no-repeat`,

//   background:'linear-gradient(62deg, #ffffff 0%, #908a96 100%)'

});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  
  [theme.breakpoints.up('lg')]: {
    display:'flex',
    width: `calc(100% - ${NAV_WIDTH + 30}px)`,
    marginLeft:'auto',
    justifyContent: 'center',
    alignItems: 'center',
    height:`calc(100vh - ${HEADER_DESKTOP + 1}px)`,
    marginTop:HEADER_DESKTOP,

  },
}));

// ----------------------------------------------------------------------

export default function CalculatorLayout() {
  const [open, setOpen] = useState(false);
  
//   const isDesktop = useResponsive('up', 'lg');

    

  return (
    <StyledRoot >
        
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
