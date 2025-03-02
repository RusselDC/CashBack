import { Breadcrumbs, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";

import { AgGridReact } from "ag-grid-react";
import {  GridReadyEvent, ITooltipParams, GroupCellRendererParams, GridSizeChangedEvent } from "ag-grid-community";
import { themeAlpine } from "ag-grid-community";

const currencyFormatter = (params: { value: { toLocaleString: () => unknown; }; }) => {
    return `$${params.value.toLocaleString()}`;
};

const dueDatesRenderer = (params : GroupCellRendererParams | ITooltipParams) => {
    return params.value.join(", ");  // You can format it however you want
};

const UserLoans = () => {


    const rowData = [
        {
            loan_id: 202501,
            loan_amount: 50000,
            loan_term_months: 12,
            interest_rate: 5.5,
            monthly_installment: 4375,
            loan_status: "Approved",
            due_dates: [
                "2025-03-15",
                "2025-04-15",
                "2025-05-15"
            ]
        },
        {
            loan_id: 202502,
            loan_amount: 100000,
            loan_term_months: 24,
            interest_rate: 6.0,
            monthly_installment: 4600,
            loan_status: "Pending",
            due_dates: [
                "2025-03-20",
                "2025-04-20",
                "2025-05-20"
            ]
        },
        {
            loan_id: 202503,
            loan_amount: 75000,
            loan_term_months: 18,
            interest_rate: 4.8,
            monthly_installment: 4850,
            loan_status: "Approved",
            due_dates: [
                "2025-03-25",
                "2025-04-25",
                "2025-05-25"
            ]
        },
        {
            loan_id: 202504,
            loan_amount: 120000,
            loan_term_months: 36,
            interest_rate: 5.2,
            monthly_installment: 3800,
            loan_status: "Approved",
            due_dates: [
                "2025-03-30",
                "2025-04-30",
                "2025-05-30"
            ]
        },
        {
            loan_id: 202505,
            loan_amount: 25000,
            loan_term_months: 6,
            interest_rate: 7.0,
            monthly_installment: 4400,
            loan_status: "Rejected",
            due_dates: [
                "2025-03-05",
                "2025-04-05",
                "2025-05-05"
            ]
        },
        {
            loan_id: 202506,
            loan_amount: 85000,
            loan_term_months: 24,
            interest_rate: 6.5,
            monthly_installment: 3950,
            loan_status: "Approved",
            due_dates: [
                "2025-03-10",
                "2025-04-10",
                "2025-05-10"
            ]
        }
    ];
    

  const columnDefs = [
    { headerName: "Loan ID", field: "loan_id"},
    { headerName: "Loan Amount", field: "loan_amount", valueFormatter: currencyFormatter },
    { headerName: "Loan Term (Months)", field: "loan_term_months" },
    { headerName: "Interest Rate (%)", field: "interest_rate" },
    { headerName: "Monthly Installment", field: "monthly_installment", valueFormatter: currencyFormatter },
    { headerName: "Loan Status", field: "loan_status" },
    { headerName: "Due Dates", field: "due_dates", cellRenderer: dueDatesRenderer, tooltipValueGetter: (params : ITooltipParams) => params.value }
];


  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%", 
        padding: "2.5%",
        margin: 0,
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/user/dashboard">
          User
        </Link>
        <Typography sx={{ color: "text.primary" }}>Loans</Typography>
      </Breadcrumbs>

      <Typography
        variant="h3"
        color="primary"
        sx={{ marginTop: "2.5%", marginBottom: "1.5%" }}
      >
        Loans
      </Typography>

      <div
        className="ag-theme-alpine"
        style={{
          flex: 1, 
          height: "80%", 
          width: "100%", 
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          rowModelType="clientSide"
          onGridReady={onGridReady}
          theme={themeAlpine}
          defaultColDef={{
            filter:true,
            flex:1,
            minWidth:100,
          }}
          onGridSizeChanged={(params: GridSizeChangedEvent) => params.api.sizeColumnsToFit()}
         
          
        />
      </div>
    </Box>
  );
};

export default UserLoans;
