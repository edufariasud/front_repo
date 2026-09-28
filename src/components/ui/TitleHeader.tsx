import React from "react";

interface TitleHeaderProps {
  text1: string;
  highlight1: string;
  text2?: string;
  highlight2?: string;
  className?: string;
}

export default function TitleHeader({
  text1,
  highlight1,
  text2,
  highlight2,
  className = ""
}: TitleHeaderProps) {
  return (
    <div className={`font-black tracking-tight leading-none ${className}`} style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)" }}>
      {/* Linha 1 */}
      <div>
        <span className="text-base-content">
          {text1}
        </span>
        {" "}
        <span className="text-primary">
          {highlight1}
        </span>
      </div>

      {/* Linha 2 */}
      {(text2 || highlight2) && (
        <div className="mt-2">
          {text2 && (
            <span className="text-base-content">
              {text2}
            </span>
          )}
          {" "}
          {highlight2 && (
            <span className="text-secondary">
              {highlight2}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

