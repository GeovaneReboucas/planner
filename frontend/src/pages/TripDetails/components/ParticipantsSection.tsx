import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../../components/Button";
import { Participant } from "../../../types/Participant";

interface ParticipantsSectionProps {
  participants: Participant[];
}

export function ParticipantsSection({ participants }: ParticipantsSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      {!participants.length && (
        <p className="text-zinc-500 text-sm">Nenhum convidado cadastrado nessa viagem.</p>
      )}
      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div key={(participant).id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{participant.name ?? 'Convidado ' + (index+1)}</span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            {
              participant.isConfirmed ? (
                <CheckCircle2 className="text-green-400 size-5 shrink-0" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )
            }
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  )
}