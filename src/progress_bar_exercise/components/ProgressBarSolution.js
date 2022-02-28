import React from "react";
import "./ProgressBarSolution.scss";

const ProgressBarSolution = () => {
  const [status, setStatus] = React.useState("idle");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (status === "ended") {
      const idleTimeout = setTimeout(() => {
        setStatus("idle");
      }, 5000);

      return () => {
        clearTimeout(idleTimeout);
      };
    }
  }, [status]);

  const startRequest = () => {
    setStatus("active");
    setIsLoading(true);
  };

  const endRequest = () => {
    setStatus("ended");
    setIsLoading(false);
  };

  return (
    <div className={status}>
      <div className="progress-bar-container">
        <div className="progress-bar"></div>
      </div>
      <div className="buttons-container">
        <button className="button start-request" onClick={startRequest}>
          {isLoading ? "Loading..." : "Start Request"}
        </button>
        <button className="button finish-request" onClick={endRequest}>
          Finish Request
        </button>
      </div>
    </div>
  );
};

export default ProgressBarSolution;
