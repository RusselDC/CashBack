import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import {
  AppProvider,
  Session,
  type Navigation,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { destroyAuth } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useUser from "../hooks/userUser";



const NAVIGATION: Navigation = [
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

const demoTheme = createTheme({
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

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useUser()
  const {first_name, last_name, email} = user

  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: ``,
      email: "",
      image: "",
    },
  });


  useEffect(() => {
    setSession({
      user: {
        name: `${first_name} ${last_name}`,
        email: email,
        image: "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
      }
    })
  },[email, first_name, last_name])



  const authentication = React.useMemo(() => {
    return {
      signIn : () => {
        setSession({
          user: {
            name: `${first_name} ${last_name}`,
            email: email,
            image: "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
          }
        })
      },
      signOut: () => {
        navigate("/");
        dispatch(destroyAuth());
      },
    };
  }, [dispatch, email, first_name, last_name, navigate]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      session={session}
      navigation={NAVIGATION}
      authentication={authentication}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: "",
        title: "CashBack",
        homeUrl: "/user/dashboard",
      }}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}
