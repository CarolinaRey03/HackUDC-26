import { forwardRef } from "react";

export interface BodyTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const BodyText = forwardRef<HTMLParagraphElement, BodyTextProps>(({ className, ...props }, ref) => {
  return <p ref={ref} className={`body-text ${className ?? ""}`} {...props} />;
});

BodyText.displayName = "BodyText";

export default BodyText;
