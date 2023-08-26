import { Grid, Input } from '@mui/material'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AddBoxOutlined, AddRounded, HomeOutlined, RestaurantOutlined, ShoppingBagOutlined } from '@mui/icons-material';
import { theme_color } from '../../theme/colors';
import { createExpense } from '../../utils/requests';


// function createData(name, drop) {
//     return {
//       name,
//       drop
//     };
//   }
  
//   function Row(props) {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);
  
//     return (
//       <React.Fragment>
//         <TableRow sx={{ '& > *': { border:'none' } }} style={{display:'flex', width:'100%', justifyContent:'space-between'}} >
          
//           <TableCell style={{display:'flex', width:'30%', border:'none', alignItems:'center'}} component="th" scope="row">
//             {row.name}
//           </TableCell>
//           <TableCell component="th" scope="row">
//             $ <Input />
//           </TableCell>
//           <TableCell>
//             <IconButton
//               size="small"
//               onClick={() => setOpen(!open)}
//             >
//               {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//             </IconButton>
//           </TableCell>
//         </TableRow>
//         {
//             row.drop.map(item=>{
//                 return(
//                     <TableRow sx={{ '& > *': { border:'none' } }} style={{display:'flex', width:'100%', justifyContent:'space-between'}} >
//                         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                         <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             {item}
                            
//                         </Box>
//                         $ <Input />
//                         </Collapse>
//                     </TableCell>
//                     </TableRow>
//                 )
//             })
//         }
//       </React.Fragment>
//     );
//   }
  
//   Row.propTypes = {
//     row: PropTypes.shape({
//       calories: PropTypes.number.isRequired,
//       carbs: PropTypes.number.isRequired,
//       fat: PropTypes.number.isRequired,
//       history: PropTypes.arrayOf(
//         PropTypes.shape({
//           amount: PropTypes.number.isRequired,
//           customerId: PropTypes.string.isRequired,
//           date: PropTypes.string.isRequired,
//         }),
//       ).isRequired,
//       name: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//       protein: PropTypes.number.isRequired,
//     }).isRequired,
//   };
  






function createData(name, sub, Icon) {
    return {
      name,
      sub,
      Icon
    };
  }
  
  function Row(props) {
    const { row, setFields, fields } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row">
            {row.Icon}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell component="th" scope="row">
            AED <Input id={row.name} />
          </TableCell>
        </TableRow>
        
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
  
  const rows = [
    createData('Home', ['Rent', 'Bills', 'Maintenence'], <HomeOutlined />),
    createData('Food', ['Groceries', 'Restaurents'], <RestaurantOutlined />),
    createData('Shopping', [ 'Clothings', 'Furnitures', 'Technologies' ], <ShoppingBagOutlined />),
  ];
  


function CollapsibleSideBar({user_id, setExpense, date}) {
    
    const [ categories, setCategories] = useState([
        "Home",
        "Food",
        "Shopping"
    ])
    return (
      <TableContainer component={Paper} style={{
        display:'flex',
        width:'500px',
        backgroundColor:'white',
        height:'100%',
        boxShadow:'1px 0 10px rgba(0, 0, 0, 0.3)',
        borderRadius:20,
        padding:10
    }} >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Input today's expenses </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
        <IconButton sx={
            {
                bgcolor:theme_color,
                fontSize:40
            }
        } style={{
            position:'absolute',
            bottom:'12%',
            right:'2%',


        }} onClick={()=>{
            var expenses = [

            ]
            const currentDate = new Date();
            var total_amount = 0;

            const year = date.year();
            const month = String(date.month() + 1).padStart(2, '0'); // Adding 1 to the month index since it's zero-based
            const day = String(date.date()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            categories.map(cat=>{
                const value = document.getElementById(cat).value;
                if(value.length>0){
                    total_amount+=parseInt(value);
                    expenses.unshift({
                        amount: value,
                        category:cat,
                        date: formattedDate,
                        description:''
                    })
                }
            })

            
            

            // const expenses = {
            //     user_id:user_id,
            //     expenses:[
            //         {
            //             ""
            //         }
            //     ]
            // }

            createExpense(user_id, expenses).then(response=>{
                setExpense(prev=>({
                    ...prev,
                    total:parseInt(prev.total)+total_amount
                }))
                categories.map(cat=>{
                    document.getElementById(cat).value = '';
                })

            }).catch(error=>{
                console.log(error)
            })
        }} >
            <AddRounded fontSize="30px" htmlColor={"white"} />
        </IconButton>
      </TableContainer>
    );
  }

export default CollapsibleSideBar;
  