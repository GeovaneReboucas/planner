import { X } from "lucide-react";

interface ModalProps {
  title: String;
  children: JSX.Element;
  onClose: () => void;
}

export function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold"> {title} </h2>
          <button onClick={onClose}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}