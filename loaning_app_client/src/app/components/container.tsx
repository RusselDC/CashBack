import { CssBaseline, Container as MuiContainer, Box, Typography } from "@mui/material";
import { subColor } from "../constants/common";
import { appName } from "../constants/common-labels";
import { Outlet } from "react-router-dom" ;

const Container = () => {
    return <>
        <CssBaseline />
        <MuiContainer disableGutters sx={{  height:"100vh", width: '100vw', minWidth:"100vw", padding: 0, margin: 0, display: "flex", flexDirection:'row', borderStyle:"solid" }}>
            <Box sx={{ height: "100%", 
                width: "60%", 
                display:"flex", 

                backgroundImage: "url('https://mrwallpaper.com/images/hd/finance-coins-and-calculator-d4hbo7k0vtaxbqcs.jpg')", 
                backgroundSize:"cover", 
                backgroundRepeat:"no-repeat"}}>
            </Box>
            <Box sx={{
                height:"100%",
                width:"40%",
                padding:0,
                margin:0,
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
               
            }}>
                <Box sx={{height:"20%",
                     width:"100%", 
                     display:"flex",
                     paddingLeft:"26%",
                     paddingTop:"20%",
                     
                }}>
                        <Typography variant="h5" color={subColor}>{appName}</Typography>
                </Box>
                <Box sx={{
                    height:"70%",
                    width:"100%",
                    display:"flex",
                    justifyContent:"center",
                    padding:0,
                    margin:0,
                }}>
                    
                    <Outlet/>
                </Box>


            </Box>
        </MuiContainer>
    </>
}

export default Container;
