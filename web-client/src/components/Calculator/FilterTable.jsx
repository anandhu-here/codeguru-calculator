import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CheckBox, CheckBoxRounded } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',

    borderRadius:10
  },
  table: {
    minWidth: 650,
    borderRadius:10
  }
});

function createData(name,  detail) {
  return { name, detail };
}

const rows = [
  createData(
    'Sort by category',
    [
        'Home',
        'Shopping',
        'Food'
    ]
  ),
  
];

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};



const cat = ['Home', 'Shopping', 'Food']

export default function FilterTable() {
  const classes = useStyles();
  const [ sort_cat, setSortCat ] = useState([]);
  const appContext = useSelector(state=>state.appState);
  const dispatch = useDispatch()



  useEffect(()=>{
    dispatch({type:'FILTER_LOADING', payload:true});
    const {expenses_list, expenses_list_back} = appContext;
    if(sort_cat.length>0){
        const toBeFiltered = [...expenses_list];
        const filteredData = toBeFiltered.map(entry => ({
            ...entry,
            days: entry.days.map(day => ({
            ...day,
            expenses: day.expenses.filter(expense => sort_cat.includes(expense.category))
            }))
        })).filter(entry => entry.days.some(day => day.expenses.length > 0));
        const finalFilteredData = filteredData.filter(entry => entry.days.length > 0);
        dispatch({type:"SET_EXPENSES_LIST", payload:finalFilteredData});
        dispatch({type:"FILTER_LOADING", payload:false});

    }
    else{
        console.log(expenses_list_back, "pppp")
        dispatch({type:"SET_EXPENSES_LIST", payload:expenses_list_back});
        dispatch({type:'FILTER_LOADING', payload:false});
    }
    

  }, [sort_cat])

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>Filters</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map(row => (
            <React.Fragment key={row.name}>
              <TableRow>
                <TableCell padding="checkbox">
                  <IconButton>
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            </React.Fragment>
          ))} */}
          <ExpandableTableRow
                expandComponent={
                <>
                    {
                        cat.map(item=>(
                            <TableRow>
                                <TableCell>
                                    <Checkbox onChange={e=>{
                                        if(e.target.checked){
                                            setSortCat(prev=>([
                                                ...prev,
                                                item
                                            ]))
                                        }
                                        else{
                                            setSortCat(prev=>{
                                                prev = prev.filter(i=>i!==item)
                                                return prev
                                            })
                                        }
                                    }} />
                                    {item}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </>
                }
            >
                <TableCell component="th" scope="row">
                    Sort by Category
                </TableCell>
            </ExpandableTableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
