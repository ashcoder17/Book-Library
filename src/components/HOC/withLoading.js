// src/components/HOC/withLoading.js
const withLoading = (WrappedComponent) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) return <p>Loading library data...</p>;
    return <WrappedComponent {...props} />;
  };
};

export default withLoading;