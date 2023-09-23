const CheckOrX = ({ value, alignCenter = false }: { value: boolean; alignCenter?: boolean }) => {
  const style: {
    width: string;
    height: string;
    margin?: string;
  } = {
    width: "1.75rem",
    height: "1.75rem",
  };

  if (alignCenter) {
    style.margin = "auto";
  }

  return value ? (
    <div
      className="flex align-items-center justify-content-center bg-green-100 border-round"
      style={style}>
      <i className="pi pi-check text-green-500 text-m"></i>
    </div>
  ) : (
    <div
      className="flex align-items-center justify-content-center bg-red-100 border-round"
      style={style}>
      <i className="pi pi-times text-red-500 text-m"></i>
    </div>
  );
};

export default CheckOrX;
