import React from "react";
import { ErrorBoundary } from "react-error-boundary";

const CustomErrorBoundary = ({
  filename,
  children
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={'Something went wrong...'}
      onError={(error, errorInfo) => {
        // log the error
        console.log("Error caught!", filename);
        console.error(error);
        console.error(errorInfo);
        // record the error in an APM tool...
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default CustomErrorBoundary;