import { Grid2 } from "@mui/material";
import { Box } from "@mui/system";
import CardComponent from "../../components/card";

const UserHome = () => {
  const dashbaoardData = [
    {
      title: "loans",
      data: {
        active_loan: 3,
        pending_payments: 3,
      },
      navigate: "/user/loans",
    },
  ];

  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          padding: "2.5%",
          flexGrow: 1,
        }}
      >
        <Grid2 container spacing={2} sx={{ height: "100%", width: "100%" }}>
          {Array.from(dashbaoardData).map((value, key) => (
            <CardComponent
              title={value.title}
              data={value.data}
              navigate={value.navigate}
              key={key}
            />
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export default UserHome;
