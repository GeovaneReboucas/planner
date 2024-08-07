import { X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface ModalProps {
  title: String;
  subtitle?: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ title, subtitle, children, onClose }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 400);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`
        fixed inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleOverlayClick}
    >
      <div
        className={`
          w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 transition-transform duration-300 text-left
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold"> {title} </h2>
            <button onClick={handleClose}>
              <X className="size-5 transition-all text-zinc-400 hover:text-zinc-200" />
            </button>
          </div>

          {subtitle && (
            <p className="text-sm text-zinc-400">
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
