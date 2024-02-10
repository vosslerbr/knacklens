/**
 * A tag that displays "Yes" or "No" based on the value passed in. Defaults to "Yes" and "No" but can be overridden with the trueLabel and falseLabel props.
 */
const YesNoTag = ({ value, trueLabel, falseLabel }: { value: boolean; trueLabel?: string; falseLabel?: string }) => {
  const success = (
    <span className="py-1 px-2 rounded bg-emerald-200 text-emerald-800 text-sm uppercase font-semibold">
      {trueLabel ? trueLabel : "Yes"}
    </span>
  );
  const danger = (
    <span className="py-1 px-2 rounded bg-rose-200 text-rose-800 text-sm uppercase font-semibold">
      {falseLabel ? falseLabel : "No"}
    </span>
  );

  return value ? success : danger;
};

export default YesNoTag;
