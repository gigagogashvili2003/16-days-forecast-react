import classes from "./ErrorCmp.module.css";

const ErrorCmp = (props) => {
  return (
    <div className={classes.errorContainer}>
      <h1>Something Went Wrong!</h1>
    </div>
  );
};

export default ErrorCmp;
