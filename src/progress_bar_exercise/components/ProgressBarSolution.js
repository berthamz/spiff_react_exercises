import React from "react";
import "./ProgressBarSolution.scss";

const breakpoints = [10, 25, 40, 65, 80, 90];

const ProgressBarSolution = () => {
  const [status, setStatus] = React.useState("idle");
  const [addBreakpoints, setAddBreakpoints] = React.useState(false);
  const [breakpoint, setBreakpoint] = React.useState(null);

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

  React.useEffect(() => {
    const shouldGoToNextBreakpoint =
      status === "active" &&
      addBreakpoints &&
      breakpoint < breakpoints.length - 1;

    if (shouldGoToNextBreakpoint) {
      const breakpointsTimeOut = setTimeout(() => {
        setBreakpoint((current) => current + 1);
      }, 3000);

      return () => {
        clearTimeout(breakpointsTimeOut);
      };
    }
  }, [status, addBreakpoints, breakpoint]);

  const startRequest = () => {
    if (addBreakpoints) {
      setBreakpoint(0);
    }

    setStatus("active");
  };

  const endRequest = () => {
    setStatus("ended");
    setBreakpoint(null);
  };

  const toggleBreakpoints = () => {
    setAddBreakpoints(!addBreakpoints);
  };

  const inlineStyles =
    breakpoint === null ? null : { width: `${breakpoints[breakpoint]}%` };

  const wrapperClassName =
    addBreakpoints && status === "active" ? "active-breakpoints" : status;

  return (
    <div id="progressbar-exercise" className={wrapperClassName}>
      <div className="progress-bar-container">
        <div className="progress-bar" style={inlineStyles}></div>
      </div>
      <div className="buttons-container">
        <button
          className="button semi-bold small upcase start-request"
          onClick={startRequest}
        >
          {status === "active" ? "Loading..." : "Start Request"}
        </button>
        <button
          className="button semi-bold small upcase finish-request"
          onClick={endRequest}
        >
          Finish Request
        </button>
      </div>
      <label className="breakpoints-checkbox small">
        <input
          disabled={status === "active"}
          type="checkbox"
          onChange={toggleBreakpoints}
          checked={addBreakpoints}
        />
        Add breakpoints
      </label>
    </div>
  );
};

export default ProgressBarSolution;
