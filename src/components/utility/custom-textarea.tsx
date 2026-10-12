import { InputHTMLAttributes, forwardRef } from "react";

import { classNames } from "@/utility/classNames";

export interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

const CustomTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
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

CustomTextarea.displayName = "CustomTextarea";

export default CustomTextarea;
