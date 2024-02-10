import { Tag } from "primereact/tag";

/**
 * A tag that displays "Yes" or "No" based on the value passed in. Defaults to "Yes" and "No" but can be overridden with the trueLabel and falseLabel props.
 */
const YesNoTag = ({
  value,
  trueLabel,
  falseLabel,
}: {
  value: boolean;
  trueLabel?: string;
  falseLabel?: string;
}) => {
  return value ? (
    <Tag value={trueLabel ? trueLabel : "Yes"} severity="success" />
  ) : (
    <Tag value={falseLabel ? falseLabel : "No"} severity="danger" />
  );
};

export default YesNoTag;
