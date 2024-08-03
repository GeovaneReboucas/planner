import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/Button";

interface InviteGuestsStepInterface {
  emailsToInvite: string[];
  toggleGuestsModal: () => void;
  toggleConfirmTripModal: () => void;
}

export function InviteGuestsStep({ emailsToInvite, toggleGuestsModal, toggleConfirmTripModal }: InviteGuestsStepInterface) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
      <button className="flex items-center gap-2 flex-1 text-left" type="button" onClick={toggleGuestsModal}>
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length ? (
          <span className="text-zinc-100 text-lg flex-1">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-zinc-400 text-lg flex-1">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800"></div>

      <Button onClick={toggleConfirmTripModal}>
        Confirmar Viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}