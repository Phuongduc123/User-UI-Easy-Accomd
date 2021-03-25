import React from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export const createNotification = (type) => {
  return () => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success("Success message", "Title here");
        break;
      case "warning":
        // NotificationManager.warning(
        //   "Warning message",
        //   "Close after 3000ms",
        //   3000
        // );
        // break;
        NotificationManager.warning("Warning message", "Click me!", 10000000, () => {
          alert("callback");
        });
      case "error":
        NotificationManager.error("Error message", "Click me!", 5000, () => {
          alert("callback");
        });
        break;
    }
  };
};
