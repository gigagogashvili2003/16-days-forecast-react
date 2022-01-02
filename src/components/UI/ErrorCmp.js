import classes from "./ErrorCmp.module.css";

const ErrorCmp = (props) => {
  return (
    <div className={classes.errorContainer}>
      <h1>City name isn't valid!</h1>
    </div>
  );
};

export default ErrorCmp;
