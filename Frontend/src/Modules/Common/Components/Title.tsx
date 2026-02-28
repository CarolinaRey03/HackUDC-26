import { forwardRef } from "react";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(({ className, ...props }, ref) => {
  return <h1 ref={ref} className={`title ${className ?? ""}`} {...props} />;
});

Title.displayName = "Title";

export default Title;
