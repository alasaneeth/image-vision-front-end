import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const PREFIX = "Stepper";
const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
  instructions: `${PREFIX}-instructions`,
};
const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: "100%",
  },
  [`&.${classes.button}`]: {
    height: 45,
    marginRight: theme.spacing(1),
  },
  [`&.${classes.instructions}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function HorizontalLinearStepper(props) {
  const { StepContent, getSteps, activeStep, values, setFieldValue } = props;
  const steps = getSteps;

  return (
    <Root className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step
              key={label}
              {...stepProps}
              style={{ margin: "0 30px 20px 30px" }}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <div>
          <div className={classes.instructions}>
            {StepContent(activeStep, values, setFieldValue)}
          </div>
        </div>
      </div>
    </Root>
  );
}
