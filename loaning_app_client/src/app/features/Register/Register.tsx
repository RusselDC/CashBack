import { Button, CssBaseline, Stack } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { Step, Stepper, StepLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { formatterMap } from "../../constants/form-request-formatters";
import {useForm as useFormGen} from "../../hooks/useFormGen"
import ReviewPage from "./component/ReviewPage";
import DynamicForm from "../../utils/form-generator/dynamic-form";
import { forms, formWidth, labels } from "./constants";
import { Buttons, submit } from "./helpers";

const Register = () => {
    const [step, setStep] = React.useState(0);
    const navigate = useNavigate()
    const { setForm, selectedForm, setFormDatas, formDatas } = useFormGen();
    const formRef = React.useRef<HTMLFormElement | null>(null);
    const formRequest = formatterMap['register']
    const buttons = Buttons(step, setStep, formRequest(formDatas as Record<string, string | Date>), formRef, navigate)
    const registerForms = React.useMemo(() => forms,[]);

    React.useEffect(() => {
        return () => setFormDatas({})
    },[])
    
    React.useEffect(() => {
        if (step !== 3) {
            setForm(registerForms[step]);
        }
    }, [step, registerForms, setForm]);
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
                }}>
                <Box
                    sx={{
                    height: "70%",
                    width: "70%",
                    borderRadius: "2.5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                <Stepper
                    activeStep={step}
                    alternativeLabel
                    sx={{ marginBottom: "10px", width: "100%" }}>
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
                        <DynamicForm formRef={formRef} onSubmit={(data) => submit(data,selectedForm, setStep, setFormDatas)} />
                    </LocalizationProvider>
                </Box>
                <Box
                    sx={{
                        height: "auto",
                        width: "80%",
                        display: "flex",
                        flexDirection: "row-reverse",
                    }}>
                </Box>
                </>
                ) : (
                    <ReviewPage formDatas={formDatas}/>
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
    
export default Register;
    