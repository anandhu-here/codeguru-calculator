import { BarChartOutlined, HomeOutlined } from "@mui/icons-material";
import { theme_color } from "../../theme/colors";



const NavConfig = [
  {
    title: 'Expenses',
    path: '/dashboard/expenses',
    icon: <HomeOutlined htmlColor={theme_color} />
  },
  {
    title: 'Insights',
    path: '/dashboard/insights',
    icon: <BarChartOutlined htmlColor={theme_color}  />,
  },
]

export default NavConfig