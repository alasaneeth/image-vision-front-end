import { CircularProgress, Typography } from "@mui/material";

interface loadingProps {
  text?: any;
  height: any;
  noIcon: boolean;
}

const Loading = (props: loadingProps) => {
  const { text, height, noIcon } = props;
  return (
    <div className="loading-container" style={{ height: height }}>
      {noIcon ? null : <CircularProgress size={20} />}
      <Typography style={{ marginTop: 10 }} component="legend">
        {text ? text : " Loading.."}
      </Typography>
    </div>
  );
};

export default Loading;
