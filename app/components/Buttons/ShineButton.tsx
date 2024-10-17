import React from 'react';

interface ShineButtonProps {
  children: React.ReactNode;
}

const ShineButton: React.FC<ShineButtonProps> = ({ children }) => {
  return (
    <button className="group/button bg-red-500 text-white hover:shadow-red-500/30 relative flex items-center justify-center gap-x-2 overflow-hidden rounded-3xl bg-twilight-light px-8 py-5 text-xs font-normal transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      {children}
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
        <div className="bg-white/20 relative h-full w-8" />
      </div>
    </button>
  );
};

export default ShineButton;
