import { Error } from "@mui/icons-material";
import { Typography } from "@mui/material";

interface ErrorProps {
  text?: any;
  height: any;
  noIcon: boolean;
}

const ErrorMessage = (props: ErrorProps) => {
  const { text, height, noIcon } = props;
  return (
    <div className="loading-container" style={{ height: height }}>
      {noIcon ? null : <Error />}
      <Typography style={{ marginTop: 10 }} component="legend">
        {text ? text : " Something went wrong!!.."}
      </Typography>
    </div>
  );
};

export default ErrorMessage;
