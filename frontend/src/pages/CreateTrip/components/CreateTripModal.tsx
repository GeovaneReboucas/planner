import { Mail, User } from "lucide-react";
import { Modal } from "../../../components/Modal";
import { FormEvent } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

interface CreateTripModalInterface {
  onCreateTrip: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

export function CreateTripModal({ onCreateTrip, onClose }: CreateTripModalInterface) {
  return (
    <Modal
      title="Confirmar criação de viagem"
      onClose={onClose}
      subtitle={
        <p className="text-sm text-zinc-400">
          Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 e Agosto de 2024</span> preencha seus dados abaixo:
        </p>
      }
    >
      <form
        className="space-y-2"
        onSubmit={onCreateTrip}
      >
        <Input
          name="ownerName"
          placeholder="Seu nome completo"
          icon={User}
        />

        <Input
          type="email"
          name="ownerEmail"
          placeholder="Seu e-mail pessoal"
          icon={Mail}
        />

        <Button type="submit" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  )
}