import { SxProps, Theme } from "@mui/material";

export interface IButtons {
  title: string;
  variant: string;
  color: string;
  sx?: SxProps<Theme>;
  onClick: () => void;
}
