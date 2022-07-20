import React from "react";

const Wrapper = (props) => {
  return (
    <div style={{ border: "2px green solid" }}>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          className: "good",
        });
      })}
    </div>
  );
};

export default Wrapper;
