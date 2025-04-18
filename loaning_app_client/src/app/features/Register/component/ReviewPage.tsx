import { Typography,Box } from "@mui/material";
import { prettifyString } from "../../../utils/common";
import dayjs from "dayjs";

const ReviewPage = (props : {formDatas : Record<string,unknown>}) => {
    const {formDatas} = props
    
    return (
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
    )
}

export default ReviewPage