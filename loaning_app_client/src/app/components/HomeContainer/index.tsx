import { AppProvider, AppProviderProps, Session} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { destroyAuth } from "../../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useUser from "../../hooks/userUser";
import { NAVIGATION, demoTheme } from "./constants";
import { DemoProps } from "./type";
import { appName } from "../../constants/common-labels";

export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, setUser} = useUser()
  

  const [session, setSession] = React.useState<Session | null>(null);


  useEffect(() => {
    setSession({
      user: {
        name: `${user?.first_name} ${user?.last_name}`,
        email: user?.email,
        image: "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
      }
    })
  },[user])



  const authentication = React.useMemo(() => {
    return {
      signIn : () => {
        setSession({
          user: {
            name: `${user?.first_name} ${user?.last_name}`,
            email: user?.email,
            image: "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
          }
        })
      },
      signOut: () => {
        setUser(null)
        navigate("/");
        dispatch(destroyAuth());
      },
    };
  }, [dispatch, navigate, setUser, user?.email, user?.first_name, user?.last_name]);

  const demoWindow = window !== undefined ? window() : undefined;

  const AppProviderProperties : AppProviderProps = {
    session : session,
    navigation : NAVIGATION,
    authentication : authentication,
    theme : demoTheme,
    window : demoWindow,
    branding : {
      logo : "",
      title : `${appName}`,
      homeUrl : "/user/dashboard"
    }, 
    children :  (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    )
  }

  return (
    <AppProvider {...AppProviderProperties}/>
  );
}
