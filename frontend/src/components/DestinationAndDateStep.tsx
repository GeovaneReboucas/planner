import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "./Button";

interface DestinationAndDateStepInterface {
  isGuestsInputOpen: boolean;
  onClick: () => void;
}

export function DestinationAndDateStep({ isGuestsInputOpen, onClick }: DestinationAndDateStepInterface) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          type="text"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputOpen}
        />
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <input
          className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
          type="text"
          placeholder="Quando?"
          disabled={isGuestsInputOpen}
        />
      </div>

      <div className="w-px h-6 bg-zinc-800"></div>

      {
        isGuestsInputOpen ? (
          <Button onClick={onClick} variant="secondary">
            Alterar local/data
            <Settings2 className="size-5 text-zinc-400" />
          </Button>
        ) : (
          <Button
            className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 transition-colors hover:bg-lime-400"
            onClick={onClick}
          >
            Continuar
            <ArrowRight className="size-5" />
          </Button>
        )
      }
    </div>
  )
}