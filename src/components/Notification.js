import classes from "./Notification.module.css";

const Notification = (props) => {
  let specialClasses = "";

  if (props.status === "pending") {
    specialClasses = classes.pending;
  }
  if (props.status === "success") {
    specialClasses = classes.success;
  }
  if (props.status === "error") {
    specialClasses = classes.error;
  }

  return (
    <div className={`${classes.notification} ${specialClasses}`}>
      <h1>{props.title}</h1>
      <p>{props.message}</p>
    </div>
  );
};
export default Notification;
