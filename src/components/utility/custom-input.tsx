import { InputHTMLAttributes, forwardRef } from "react";

import { classNames } from "@/utility/classNames";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={classNames(
          "bg-background text-accent focus-within:border-accent focus-within:ring-accent w-full rounded-lg border-none font-semibold placeholder:font-normal placeholder:text-zinc-400 focus-within:border-2",
          className,
        )}
      />
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
