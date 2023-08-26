import PropTypes from 'prop-types';

import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const user = localStorage.getItem('user');
  
  const userInfo = JSON.parse(user);
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => {
          // console.log(JSON.parse(item.for).includes(userInfo.user.role),"pp", JSON.parse(item.for))
          return(
            <NavItem key={item.title} item={item} />
          )
        })}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;
  const dispatch = useDispatch();

  return (
    <StyledNavItem
      onClick = {()=>{
        dispatch({type:'NAV_CHANGE', payload:title})
      }}
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
