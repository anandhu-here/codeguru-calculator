import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { Box, Checkbox, Collapse, Grid, IconButton, Input, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ArrowDownward, ArrowDropDown, ArrowDropUp, ArrowUpward, DeleteForever, Edit, EditAttributes, MoreVert } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { deleteExpense, editExpense, getExpenses } from "../../utils/requests";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import FilterTable from "./FilterTable";
import Loader from "../../utils/loader";


const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});


const CollapsedRow = ({ childrenRow, row }) => {
    
    const [childRows, setChildRows] = useState(childrenRow);
    const [expandedRowId, setExpandedRowId] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [openFunction, setOpenFunction] = React.useState(false);
  const [edit, setEdit] = useState({open:false, id:null});
  const [ editValue, setValue ] = useState('');
  const dispatch = useDispatch()


  const appContext = useSelector(state=>state.appState);


  

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const onEdit = (rowId) => {
    // Handle edit
    setEdit({open:true, id:rowId})
    setMenuAnchorEl(null);

  };

  const onDelete = (rowId) => {
    // Handle delete
    deleteExpense(rowId).then(response=>{
        const { expenses_list } = appContext;
        var updated = [...expenses_list];
        const days = updated.filter(item=>item.days)
        for (const month of updated) {
            for (const day of month.days) {
                for (const exp of day.expenses){
                    if(exp.id === rowId){
                        day.expenses = day.expenses.filter(expense => expense.id !== rowId);
                        console.log(day.expenses, "p")
                    }
                }
                // if(day.expenses.length === 1){
                //     if(day.expenses[0].id === rowId){
                //         if(month.days.length === 1){
                //             updated = updated.filter(up=>up.id !== month.id)
                //         }
                //         else{
                //             month.days = month.days.filter(d=>d.id !== day.id)
                //         }
                //     }
                    
                // }
                // else{
                //     for (const exp of day.expenses){
                //         if(exp.id === rowId){
                //             day.expenses = day.expenses.filter(expense => expense.id !== rowId);
                //             console.log(day.expenses, "p")
                //         }
                //     }
                // }
            //   if (day.id === rowId) { // Change this to 40
            //     console.log(day.id, "id")
            //     day.expenses = day.expenses.filter(expense => expense.id !== 40);
            //   }
            }
          }

        console.log(updated, "pppp")

        dispatch({type:"SET_EXPENSES_LIST", payload:updated});
    }).catch(error=>{
        console.log(error)
    })
    
  };

  const handleSubmitEdit = (id) =>{
    editExpense(id, editValue).then(response=>{
        const { expenses_list } = appContext;
        const updated = [...expenses_list];
        setEdit(false);
        for (const month of updated) {
            for (const day of month.days) {
                for (const exp of day.expenses){
                    if(exp.id === id){
                        var cur_total =  parseFloat(day.totalAmount)
                            var cur_exp_amount = parseFloat(exp.amount);
                            const new_amount =  parseFloat(editValue) - cur_exp_amount
                            day.totalAmount = cur_total + new_amount;
                            exp.amount = editValue;
                            month.totalAmount = parseFloat(month.totalAmount) + new_amount;
                    }
                }
            }
          }
        
        dispatch({type:"SET_EXPENSES_LIST", payload:updated});
    })
    .catch(error=>{
        console.log(error, "error")
    })
  }


  return (
    <React.Fragment>
      <TableRow key={childrenRow.name}>
        <TableCell style={{ width: "62px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenFunction(!openFunction)}
          >
            {openFunction ? (
              <ArrowDropUp />
            ) : (
              <ArrowDropDown />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {dayjs(childrenRow.day).format('DD')}th
        </TableCell>
        <TableCell component="th" scope="row">
          AED {childrenRow.totalAmount}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse
            in={openFunction}
            timeout="auto"
            unmountOnExit
          >
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {childRows.expenses.map((childrenRow) => (
                    <TableRow key={childrenRow.name}>
                      <TableCell component="th" scope="row">
                        
                      </TableCell>
                      <TableCell>{childrenRow.category}</TableCell>
                      <TableCell>
                        {
                            edit.id===childrenRow.id?(
                                <Input value={editValue} onChange={(e)=>setValue(e.currentTarget.value)} onKeyDown={e=>{
                                    
                                    if(e.key === "Enter"){
                                        console.log(childrenRow.id, 'iddddd')
                                        handleSubmitEdit(childrenRow.id)
                                    }
                                }} />
                            ):(
                                <>
                                 AED {childrenRow.amount}
                                </>
                               
                            )
                        }
                      </TableCell>
                      <TableCell style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={()=>{
                            onEdit(childrenRow.id)
                            }}>
                            <Edit />
                            </IconButton>
                            <IconButton onClick={()=>{
                                onDelete(childrenRow.id)
                            }}>
                            <DeleteForever />
                            </IconButton>
                            
                        </TableCell>
                    
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

function Row(props) {
  const { row } = props;
  const [openModule, setOpenModule] = React.useState(false);
  const [openFunction, setOpenFunction] = React.useState(false);
  
  // const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  // console.log("row", row);
  // for (const key in row) {
  //   if (Object.prototype.hasOwnProperty.call(row, key)) {
  //     const element = row[key];
  //     console.log("element", element);
  //   }
  // }


  return (
    <React.Fragment>
      <TableRow className={classes.root} style={{ background: "#fff",  }}>
        <TableCell style={{ width: "62px", }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenModule(!openModule)}
            style={{}}
          >
            {openModule ? <ArrowDropUp />: <ArrowDropDown /> }
          </IconButton>
        </TableCell>
        <TableCell style={{  }}>{dayjs(row.month).format('MMM')}</TableCell>
        <TableCell align="right" style={{  }}>AED {row.totalAmount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openModule} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.days.map((childrenRow) => (
                    <CollapsedRow
                      row={row}
                      childrenRow={childrenRow}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


function Table1() {
  const [ date, setDate ] = useState(dayjs());
  const [rows, setrows] = useState([]);
  const appContext = useSelector(state=>state.appState);
  const userContext = useSelector(state=>state.userState);
  const dispatch = useDispatch();

  useEffect(()=>{
    getExpenses(date.year(), date.month()+1, userContext.userInfo.token).then(response=>{
        dispatch({type:"SET_EXPENSES_LIST", payload:response.data});
        dispatch({type:"SET_EXPENSES_LIST_BACK", payload:response.data});
        setrows(response.data)
    })

}, [])
const { scale } = useSpring({
  from: { scale: 0.5 }, // Initial scale
  to: { scale: 1 }, // Final scale
  config: { tension: 200, friction: 12 }, // Animation configuration
});
return (
<animated.div style={{
    display:'flex',
    backgroundColor:'white',

    borderRadius:20,
    width:'100%',
    height:'100%',
    boxShadow:'1px 0 10px rgba(0, 0, 0, 0.3)',
    transform: scale.interpolate((s) => `scale(${s})`), // Apply scale transformation
    
    
}} >
{appContext.filter_loading?(
  <div  style={{
    display:'flex',
    width:"100%",height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }}>
    <Loader  size={50}/>
  </div>
):(
  <TableContainer component={Paper} style={{
    // position:'relative',
    // display:'flex',
    // width:'90%',
    // backgroundColor:'white',
    // height:'300px',
    // justifyContent:'center',
    // alignItems:'center',
    borderRadius:20,
    padding:10,
    
}}>
  <Table aria-label="collapsible table">
  <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        <TableCell>Months</TableCell>
        <TableCell align="right">Total Expense</TableCell>
        <TableCell align="right">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker closeOnSelect views={["year"]} value={dayjs(date)} format="YYYY" onChange={date=>{
                    // setLoading(true);
                    // setDate(date);
                    // getExpensesByMonth(`0${date.month()+1}`, `${date.year()}`).then(response=>{
                    //     // const series = response.data.map(i=>i.total_amount)
                    //     console.log(response.data, "p")
                    //     setExpense(response.data);
                    //     setLoading(false);
                    // }).catch(error=>{
                    //     setLoading(false);
                    //     console.log(error, "error")
                    // })
                }} />
            </LocalizationProvider>
        </TableCell>
      </TableRow>
    </TableHead>
    {
      appContext.filter_loading===false&&(
        <TableBody  >
          {appContext.expenses_list.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      )
    }
  </Table>
</TableContainer>)}
</animated.div>

);
}




export default function Insights(){
  return(
    <Grid container style={{
      display:'flex',
    width:'100%',
    height:'100%',
    justifyContent:'space-around',
    boxShadow:'1px 0 10px rgba(0, 0, 0, 0.3)',
    }} >
      <Grid  md = {3}  >
          <FilterTable />
      </Grid>
      <Grid  md={8} >
          <Table1 />
      </Grid>
    </Grid>
  )
}
