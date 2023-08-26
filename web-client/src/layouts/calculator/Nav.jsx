import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, Container } from '@mui/material';

import NavSection from '../../components/nav-section'
import navConfig from './NavConfig';
import useResponsive from '../../utils/useResponsive';
//


// ----------------------------------------------------------------------

const NAV_WIDTH = 300;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  // backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const userContext = useSelector(state=>state.userState);
  const appContext = useSelector(state=>state.appState);
  const {userInfo} = userContext;
  const {nav} = appContext;
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Container
    >

      <Box sx={{ mb: 2, mt:5, mx: 0 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar  alt="photoURL" />

            <Box sx={{ ml: 1, textAlign:'start' }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {userInfo?.user?.firstname} {userInfo?.user?.lastname}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {userInfo?.user?.email}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      
    </Container>
  );

  return (
    <Box
      component="nav"
      sx={{
        display:'flex',
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
        maxHeight:'100vh',
        alignItems:'center',
        justifyContent:{
            lg:'center'
        }
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
                display:'flex',
              width: NAV_WIDTH - 20,
              height:'95vh',
              position:'relative',
              backgroundColor: "#ffffff",
            background: 'linear-gradient(331deg, #ffffff 0%, #e4e4e4 100%)',

              borderRadius:5,
              borderRightStyle: "hidden",
              boxShadow:'5px 0 10px rgba(0, 0, 0, 0.1)'
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
