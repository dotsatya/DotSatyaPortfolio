const TerminalHeader = () => {
  return (
    <div className="w-full flex items-center justify-between text-sm text-gray-300">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <span className="text-gray-400">{">_"}</span>
        <span>bash — guest</span>
      </div>

      {/* CENTER */}
      <div className="absolute left-1/2 -translate-x-1/2 text-gray-400">
        profiled.site/terminal
      </div>

      {/* RIGHT (window buttons) */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
      </div>
    </div>
  );
};

export default TerminalHeader;