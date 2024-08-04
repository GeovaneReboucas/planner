import { Calendar, Tag } from "lucide-react";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";

interface CreateActivityModalProps {
  onClose: () => void;
}

export function CreateActivityModal({ onClose }: CreateActivityModalProps) {
  return (
    <Modal title='Cadastrar Atividade' onClose={onClose}>
      <div className="space-y-5">
        <p className="text-sm text-zinc-400 mt-2">
          Todos convidados podem visualizar as atividades
        </p>

        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Tag className="size-5 text-zinc-400" />
          <input
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            name="title"
            placeholder="Qual a atividade?"
          />
        </div>

        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <input
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            type="datetime-local"
            name="occurs_at"
            placeholder="Data e horário da atividade"
          />
        </div>

        <Button size="full" onClick={() => { }}>
          Salvar Atividade
        </Button>
      </div>
    </Modal>
  )
}