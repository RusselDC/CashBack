import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { createTheme } from "@mui/material/styles";
import { Navigation } from "@toolpad/core/AppProvider";

export const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Main items",
    },
    {
      segment: "user/dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      segment: "user/loans",
      title: "Loans",
      icon: <CreditScoreIcon />,
    },
  ];


export const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});