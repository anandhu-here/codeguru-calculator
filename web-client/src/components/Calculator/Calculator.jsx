import { Box, Button, Grid, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { HEADER_DESKTOP } from '../../layouts/header/Header'
import { AccountBalance, AccountBalanceOutlined, AccountBalanceWallet, AttachMoneyOutlined, BalanceOutlined, MoneyOffOutlined } from '@mui/icons-material'
import Chart from 'react-apexcharts'
import CollapsibleSideBar from './Add'
import { getExpenses, getExpensesByMonth } from '../../utils/requests'
import { useSelector } from 'react-redux'
import { theme_color } from '../../theme/colors'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Loader from '../../utils/loader'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useSpring, animated } from 'react-spring';




const StyledCalculator = styled('div')({
    display:'flex',
    width:'100%',
    height:'100% !important',
    // paddingTop:HEADER_DESKTOP,
})
const StyledGrid = styled('div')({
    display:'flex',
    flexDirection:'column',
    width:'100%',
    height:'100% !important',
    // backgroundColor:'orange'
    // paddingTop:HEADER_DESKTOP,
})
const Top = styled('div')({
    display:'flex',
    width:'100%',
    height:`calc(22% - 0px)`,
    backgroundColor:'transparent',
    justifyContent:'space-evenly'
})

const Bottom = styled('div')({
    display:'flex',
    width:'100%',
    height:`calc(60% - 0px)`,
    paddingInline:10,
    justifyContent:'space-around'
    // paddingTop:HEADER_DESKTOP,
})
const HeaderItem = styled('div')({
    position:'relative',
    display:'flex',
    flexDirection:'column',
    width:'100%',
    height:'fit-content',
    height:'100%',
    backgroundColor:'inherit',
    paddingInline:15,
    justifyContent:'center',
    borderRadius:20,
    boxShadow:'5px 0 10px rgba(0, 0, 0, 0.3)'
    // paddingTop:HEA DER_DESKTOP,
})
const HeaderItemFilter = styled('div')({
    position:'relative',
    display:'flex',
    flexDirection:'column',
    width:'100%',
    backgroundColor:'#F9F9F6',
    height:'fit-content',
    paddingInline:15,
    height:'100%',
    justifyContent:'center',
    borderRadius:10,
    boxShadow:'5px 0 10px rgba(0, 0, 0, 0.3)'
    // paddingTop:HEA DER_DESKTOP,
})


const IconStyled = styled('div')({
    display:'flex',
    padding:10,
    color:'white',
    borderRadius:100,
    backgroundColor: theme_color,
    background: `linear-gradient(160deg, ${theme_color} 0%, #80D0C7 100%)`

    // paddingTop:HEADER_DESKTOP,
})
const LineGraph = styled('div')({
    display:'flex',
    width:'50%',
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:'35%'
    // paddingTop:HEADER_DESKTOP,
})

const expense_header = (income, expense_thismonth, account_balance, current_month)=>{return[
    {
        title:'INCOME',
        amount:`AED ${income}`,
        Icon: <AttachMoneyOutlined color='white' />,
        change: 'No change',
        
    },
    {
        title:`EXPENSE IN ${current_month.toUpperCase()}`,
        amount:`AED ${expense_thismonth}`,

        Icon: <MoneyOffOutlined />,
        change:'+5% since last month'
    },
    {
        title:'BALANCE',
        amount:`AED ${income - expense_thismonth}`,
        Icon: <AccountBalanceWallet />,
        change:'Approximatley'
    },
]}

const month_names = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function Calculator() {
    const [ expenseData, setExpense ] = useState(null);
    const userContext = useSelector(state=>state.userState);
    const [ expense_year, setExpYear ] = useState([]);
    const [ date, setDate ] = useState(dayjs());
    const [ y_data, setYData ] = useState(Array(month_names.slice(0, dayjs().month())));
    const [ loading, setLoading ] = useState(true);

    const options={
        options: {
            chart:{
                background:'#fff',
            },
            stroke: {
              curve: 'smooth'
            },
            markers: {
              size: 0
            },
            xaxis: {
              categories: month_names.slice(0, dayjs().month()+1),
              labels: {
                style: {
                  colors: 'grey', // Change the font color for x-axis labels
                  fontSize: '10px', // Change the font size for x-axis labels
                },
              },
            },
            toolbar: {
                tools: {
                  download: false, // Hide the download button
                  zoom: false, // Hide the zoom button
                  zoomin: false, // Hide the zoom in button
                  zoomout: false, // Hide the zoom out button
                  pan: false, // Hide the pan button
                  reset: false, // Hide the reset button
                },
              },
            yaxis: {
                labels: {
                  style: {
                    colors: 'grey', // Change the font color for y-axis labels
                    fontSize: '10px', // Change the font size for y-axis labels
                  },
                },
            },
            grid: {
                strokeDashArray: 5, // Set the dash array for the grid lines
              },
          },
          series: [{
            data:y_data,
            style: {
                strokeDashArray: 15, // Adjust the dash array as needed
              },
          }],
        
    }

    const getExpensedata = (date) =>{
        getExpensesByMonth(date.month()+1, date.year(), userContext.userInfo.token).then(response=>{
            // const series = response.data.map(i=>i.total_amount)
            setExpense(response.data);
            getExpenses(date.year(), date.month(),  userContext.userInfo.token).then(response=>{
                
                var series = Array(date.month()).fill(0);
                for (var month of response.data ){
                    var index = dayjs(month.month).month()+1;
                    var expense = month.totalAmount;
                    series[index] = expense
                }
                // const series = response.data.monthly_expenses.slice(0, date.getMonth()+1).map(i=>i.total_amount)
                // setXData(month_names.slice(0, response.data.length))
                
                // setYData(series)
                setExpYear(response.data.expenses);
                setYData(series)
                setLoading(false);
            }).catch(error=>{

                setLoading(false);
            })
        }).catch(error=>{
            
            setLoading(false);
        })
    }
    useEffect(()=>{
        
        getExpensedata(date)

    }, [])
    const {userInfo} = userContext;
    const navigate = useNavigate();

    const { scale } = useSpring({
        from: { scale: 0.5 }, // Initial scale
        to: { scale: 1 }, // Final scale
        config: { tension: 200, friction: 12 }, // Animation configuration
      });
  return (
    <StyledCalculator >
        {/* <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', height:'100%', margin:'auto 0px', sjustifyContent:'center'}} width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
            No expenses to show. Start adding
            <Button size='large' type="button" variant="contained" >
                <Typography>
                    ADD
                </Typography>
            </Button>
        </div> */}
        {
            loading?(
                <div style={{position:'absolute', backgroundColor:'rgba(0,0,0,0.4)', top:0,left:0, zIndex:10000, display:'flex', width:'100%', height:'100%', justifyContent:'center' , alignItems:'center'}} >
                    <Loader size={100} />
                </div>
            ):(
                <StyledGrid>
                    <Top >
                        <animated.div
                            style={{
                                transform: scale.interpolate((s) => `scale(${s})`), // Apply scale transformation
                                position:'relative',
                                display:'flex',
                                flexDirection:'column',
                                width:'calc(100% / 6.5)',
                                backgroundColor:'#F9F9F6',
                                height:'fit-content',
                                height:'70%',
                                justifyContent:'center',
                                borderRadius:20,
                            }}
                            >
                        <HeaderItemFilter>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker closeOnSelect views={["year", "month"]} value={dayjs(date)} format="MMM-YYYY" onChange={date=>{
                                setLoading(true);
                                setDate(date);
                                getExpensesByMonth(`0${date.month()+1}`, `${date.year()}`, userContext.userInfo.token).then(response=>{
                                    // const series = response.data.map(i=>i.total_amount)
                                    console.log(response.data, "data")
                                    setExpense(response.data);
                                    setLoading(false);
                                }).catch(error=>{
                                    setLoading(false);
                                    console.log(error, "error")
                                })
                            }} />
                                </LocalizationProvider>
                        </HeaderItemFilter>
                        </animated.div>
                        {
                            expense_header(userInfo?.user?.income, expenseData?.total, 0, month_names[date.month()]).map(item=>(
                                
                                <animated.div
                                style={{
                                  transform: scale.interpolate((s) => `scale(${s})`), // Apply scale transformation
                                  position:'relative',
                                  display:'flex',
                                  flexDirection:'column',
                                  width:'calc(100% / 4.3)',
                                  backgroundColor:'#F9F9F6',
                                  height:'fit-content',
                                  height:'70%',
                                  justifyContent:'center',
                                  borderRadius:20,
                                }}
                              >
                                <HeaderItem onClick={()=>{
                                    navigate(`/dashboard/discover/?month=0${date.month+1}?year=${date.year}`, {})
                                }} >
                                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }} >
                                        <div>
                                            <Typography color='grey' fontSize="small" >{item.title}</Typography>
                                            <Typography>{item.amount}</Typography>
                                        </div>
                                        <IconStyled  >
                                            {item.Icon}
                                        </IconStyled>
                                    </div>
                                    <div>
                                        <Typography color='grey' fontSize="small">{item.change}</Typography>
                                    </div>
                                </HeaderItem>
                            </animated.div>
                            ))
                        }
                    </Top>
                    <Bottom>
                        <Grid container justifyContent="space-around" >

                            <Grid md={5} lg={5} sm={12}  className="line">
                                
                                <Chart options={options.options} series={options.series} type="line" style={{
                                        display:'flex',
                                        width:'500px',
                                        backgroundColor:'white',
                                        height:'100%',
                                        boxShadow:'1px 0 10px rgba(0, 0, 0, 0.3)',
                                        borderRadius:20,
                                        padding:10
                                    }} />
                                </Grid>
                                <Grid md={5} lg={5} sm={12}  >
                                    <CollapsibleSideBar date={date} user_id={userInfo?.user?.id} setExpense={setExpense}/>
                                </Grid>
                        </Grid>
                    </Bottom>
                </StyledGrid>
            )
        }
    </StyledCalculator>
  )
}

export default Calculator