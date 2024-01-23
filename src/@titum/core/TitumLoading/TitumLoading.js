import { useTimeout } from "@titum/hooks";
import React, { useState } from "react";
import Loading from "Components/MUI_components/loading";

function TitumLoading(props) {
  const [showLoading, setShowLoading] = useState(!props.delay);

  useTimeout(() => {
    setShowLoading(true);
  }, props.delay);

  if (!showLoading) {
    return null;
  }

  return <Loading text="Please wait.." noIcon={false} height={"100vh"} />;
}

TitumLoading.defaultProps = {
  delay: false,
};

export default TitumLoading;
