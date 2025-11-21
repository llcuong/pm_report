const MenuHeadSeparated = () => {
  const width = 100;
  const height = 56;
  const diagonal = Math.sqrt(width ** 2 + height ** 2);
  const angle = Math.atan(height / width) * (180 / Math.PI);

  return (
    <div className="relative overflow-hidden border-r"
      style={{ width, height }}>
      <div
        className="absolute top-0 left-0"
        style={{
          width: `${diagonal}px`,
          borderTop: "1px solid gray",
          transform: `rotate(${angle}deg)`,
          transformOrigin: "top left",
        }} />
      <span className="absolute top-1 right-1 text-xs font-bold">Machine</span>
      <span className="absolute bottom-2 left-2 text-xs font-bold">Hour</span>
    </div>
  );
};

export default MenuHeadSeparated;