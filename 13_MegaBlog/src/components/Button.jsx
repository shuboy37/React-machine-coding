import React from "react";

function Button({
  children,
  classname = "",
  type = "button",
  bgColor = "bg-blue-600",
  text = "text-white",
  ...props
}) {
  return (
    <button
      className={`px-4 rounded-lg py-2 ${bgColor} ${text} ${classname}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
