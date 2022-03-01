import React from "react";
import "./ProgressBarSolution.scss";

const ProgressBarSolution = () => {
  const [status, setStatus] = React.useState("idle");

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
  };

  const endRequest = () => {
    setStatus("ended");
  };

  return (
    <div className={status}>
      <div className="progress-bar-container">
        <div className="progress-bar"></div>
      </div>
      <div className="buttons-container">
        <button className="button start-request" onClick={startRequest}>
          {status === "active" ? "Loading..." : "Start Request"}
        </button>
        <button className="button finish-request" onClick={endRequest}>
          Finish Request
        </button>
      </div>
    </div>
  );
};

export default ProgressBarSolution;
