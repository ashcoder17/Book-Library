const withLoading = (WrappedComponent) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Loading, please wait...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
