import { Calendar, Tag } from "lucide-react";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

interface CreateActivityModalProps {
  onClose: () => void;
}

export function CreateActivityModal({ onClose }: CreateActivityModalProps) {
  return (
    <Modal
      title='Cadastrar Atividade'
      subtitle='Todos convidados podem visualizar as atividades'
      onClose={onClose}
    >
      <div className="space-y-2">
        <Input name="title" id="title" placeholder="Qual a atividade?" icon={Tag} />

        <Input
          name="occurs_at"
          id="occurs_at"
          type="datetime-local"
          placeholder="Data e horário da atividade"
          icon={Calendar}
        />

        <Button size="full" onClick={() => { }}>
          Salvar Atividade
        </Button>
      </div>
    </Modal>
  )
}