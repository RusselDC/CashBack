import {
  Grid2,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface ICardComponent {
  title: string;
  data: Record<string, unknown>;
  navigate: string;
}

const prettifyString = (text: string) =>
  String(text).charAt(0).toUpperCase() +
  String(text).slice(1).replace("_", " ");

const CardComponent = (props: ICardComponent) => {
  const { title, data, navigate } = props;
  const new_url = useNavigate();

  return (
    <Grid2 size={4}>
      <Card sx={{ height: "300px", width: "100%" }}>
        <CardActionArea
          sx={{ height: "100%", width: "100%" }}
          onClick={() => new_url(navigate)}
        >
          <CardContent
            sx={{
              height: "30%",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" color="primary">
              {prettifyString(title)}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ height: "70%", width: "100%" }}>
            {Object.entries(data).map(([key, value]) => (
              <Typography
                key={key}
                variant="h6"
              >{`${prettifyString(key)}: ${value}`}</Typography>
            ))}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid2>
  );
};

export default CardComponent;
