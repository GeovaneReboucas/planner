import { Mail, User } from "lucide-react";
import { Modal } from "../../../components/Modal";
import { FormEvent } from "react";
import { Button } from "../../../components/Button";

interface CreateTripModalInterface {
  createTrip: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

export function CreateTripModal({ createTrip, onClose }: CreateTripModalInterface) {
  return (
    <Modal title="Confirmar criação de viagem" onClose={onClose}>
      <div className="space-y-5">
        <p className="text-sm text-zinc-400 mt-2">
          Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 e Agosto de 2024</span> preencha seus dados abaixo:
        </p>

        {/* Confirm Trip Form */}
        <form
          className="space-y-3"
          onSubmit={createTrip}
        >
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              name="name"
              placeholder="Seu nome completo"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="email"
              name="name"
              placeholder="Seu e-mail pessoal"
            />
          </div>

          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </Modal>
  )
}