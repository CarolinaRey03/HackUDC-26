import type { ChildrenProp } from "../../../interfaces";

interface PanelProps extends ChildrenProp {}

function Panel({ children }: PanelProps) {
  return <div className="panel">{children}</div>;
}

export default Panel;
