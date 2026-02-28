import { forwardRef } from "react";

// Props que heredan TODO lo que puede tener un h1
export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(({ className, ...props }, ref) => {
  return <h1 ref={ref} className={`title ${className ?? ""}`} {...props} />;
});

Title.displayName = "Title";

export default Title;
