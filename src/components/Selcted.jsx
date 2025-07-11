import React, { useId, forwardRef } from "react";

const Selected = forwardRef(function Selected(
  { options,
     label,
     className = "",
      ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        className={`
          w-50 h-10 px-4 rounded-lg border border-gray-500  flex justify-center items-center
          bg-white text-gray-800 text-sm font-medium
          transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          hover:border-gray-400
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option} className="text-sm">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Selected;
