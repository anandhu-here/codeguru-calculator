
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, MenuItem, Typography } from '@mui/material';
import AccountPopover from './AccountPopover';
import { Menu } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { theme_color } from '../../theme/colors';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

export const HEADER_DESKTOP = 100;

const StyledRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor:'inherit',
    boxShadow:'none',

//   zIndex:11111,
  [theme.breakpoints.up('lg')]: {
    position:'fixed',
    height:HEADER_DESKTOP,
    width: `calc(100% - ${NAV_WIDTH + 30}px)`,
    marginLeft:'auto',
    padding:0
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    paddingInline:20
  },
}));

// ----------------------------------------------------------------------



export default function Header({ onOpenNav }) {
    const appContext = useSelector(state=>state.appState);

  const {nav} = appContext;
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >

        <Menu />  
        </IconButton>

        <Box>
            <Typography style={{
                color: "white",
                textShadow:'1px 1px 2px rgba(0, 0, 0, 0.5)',
                backgroundImage:`linear-gradient(to right, ${theme_color}, ${theme_color})`,
                backgroundClip:'text',
                
            }} typography={"h6"} >{nav}</Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
