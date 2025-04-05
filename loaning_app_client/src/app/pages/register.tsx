import { Button, CssBaseline, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { Step, Stepper, StepLabel } from "@mui/material";
import { useForm as useFormGen } from "../hooks/useFormGen";
import DynamicForm from "../utils/form-generator/dynamic-form";
import { IButtons } from "app/types/buttons";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { prettifyString } from "../utils/common";

const RegisterPage = () => {
  const [step, setStep] = React.useState(0);
  const { setForm, selectedForm, setFormDatas, formDatas } = useFormGen();
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const labels = [
    "Account Details",
    "Personal Information",
    "Address",
    "Review Inputs",
  ];
  const formWidth = ["50%", "50%", "50%"];

  const submit = (data: Record<string, unknown>) => {
    if (step < 3) selectedForm.onSubmit(data, setStep, setFormDatas);
  };

  const registerForms = React.useMemo(
    () => [
      "account_register_form",
      "borrower_register_form",
      "borrower_address_form",
    ],
    [],
  );

  React.useEffect(() => {
    if (step !== 3) {
      setForm(registerForms[step]);
    }
  }, [step, registerForms, setForm]);

  const buttons: IButtons[] = [
    {
      title: "Back",
      variant: "contained",
      color: "primary",
      sx: { display: step === 0 ? "none" : "flex" },
      onClick: () => setStep((prev) => prev - 1),
    },
    {
      title: step === 3 ? "Submit" : "Next",
      variant: "contained",
      color: "primary",
      onClick: () => step === 3 ? console.log(formDatas) : formRef.current?.requestSubmit(),
    },
  ];



  return (
    <>
      <CssBaseline>
        <Container
          disableGutters
          sx={{
            height: "100vh",
            width: "100vw",
            minWidth: "100vw",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "70%",
              width: "70%",
              borderRadius: "2.5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stepper
              activeStep={step}
              alternativeLabel
              sx={{ marginBottom: "10px", width: "100%" }}
            >
              {labels.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {step !== 3 ? (
              <>
                <Box sx={{ height: "60%", width: formWidth[step] }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DynamicForm formRef={formRef} onSubmit={submit} />
                  </LocalizationProvider>
                </Box>
                <Box
                  sx={{
                    height: "auto",
                    width: "80%",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                >
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: "auto",
                  width: "50%",
                  display: "flex",
                  gap: 5,
                  justifyContent: "center",
                  paddingTop: "20px",
                }}
              >
                <Box>
                  {Object.keys(formDatas).map((key) => {
                    if(!key.includes("password"))
                    {
                      return (
                        <Box
                          sx={{
                            height: "auto",
                            width: "auto",
                          }}
                        >
                          <Typography>{prettifyString(key)} :</Typography>
                        </Box>
                      );
                    }
                  })}
                </Box>
                <Box>
                  {Object.keys(formDatas).map((key) => {
                    if(!key.includes("password"))
                    {
                      return (
                        <Box
                          sx={{
                            height: "auto",
                            width: "auto",
                          }}
                        >
                          <Box sx={{ height: "auto", width: "auto" }}>
                            <Typography>
                              {(typeof formDatas[key] === "string" ||
                                formDatas[key] instanceof Date) &&
                              key.toLowerCase().includes("date")
                                ? dayjs(formDatas[key]).isValid()
                                  ? dayjs(formDatas[key]).format("YYYY-MM-DD")
                                  : String(formDatas[key])
                                : String(formDatas[key])}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    }
                  })}
                </Box>
              </Box>
            )}
            <Stack flexDirection="row" gap={1} sx={{justifyContent : "flex-end", width:"100%"}}>
            {buttons.map((button, key) => (
              <Button key={key} {...button}>
                {button.title}
              </Button>
            ))}
            </Stack>
          </Box>
        </Container>
      </CssBaseline>
    </>
  );
};

export default RegisterPage;
