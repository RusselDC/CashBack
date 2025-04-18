import { Box, Stack, Card, Tooltip, Typography } from "@mui/material";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { mainColor } from "../../constants/common";



const data = [
  {
    Title : "Total Loan Amount",
    Data : "30,000",
    icon : CreditScoreIcon
  }
]


const UserHome = () => {
  
  return (
    <Stack spacing={2}
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      height:"15%",
      width:"100%",
      paddingLeft:"20px",
      paddingRight:"20px",
      paddingTop:"20px",
      paddingBottom:"10px"
    }}
    >
      {
        [0,1,2,3].map((key) => {
          return (
            <Tooltip title={data[0].Title}>
          <Card sx={{
            height:"100%",
            width:"25%",
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Stack spacing={2} 
            direction="row"
            sx={{
              justifyContent : "center",
              alignItems : "center"
            }}>
              <CreditScoreIcon sx={{fontSize:"2rem", color:mainColor}}/>
              <Typography sx={{color : mainColor, fontSize:"1.5rem", fongWeight:"700"}}>{data[0].Data}</Typography>
            </Stack>
          </Card>
      </Tooltip>
          )
        })
      }
      
    </Stack>
  );
};

export default UserHome;
