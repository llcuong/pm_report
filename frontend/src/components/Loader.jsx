export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full z-2003">
      <div className="relative w-full h-1 bg-gray-200 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-[#1b9eaf] animate-loader" />
      </div>
    </div>
  );
};