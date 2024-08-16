import { FormEvent, useState } from "react";
import { Calendar, Tag } from "lucide-react";

import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

interface ActivityModalProps {
  onSave: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onClose: () => void;
}

export function ActivityModal({ onSave, onClose }: ActivityModalProps) {
  const [isLoadingFormActivity, setIsLoadingFormActivity] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoadingFormActivity(true);
    await onSave(e);
    setIsLoadingFormActivity(false);
  }

  return (
    <Modal
      title='Cadastrar Atividade'
      subtitle='Todos convidados podem visualizar as atividades'
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="space-y-2">
        <Input name="title" id="title" placeholder="Qual a atividade?" icon={Tag} />

        <Input
          name="occursAt"
          id="occursAt"
          type="datetime-local"
          placeholder="Data e horário da atividade"
          icon={Calendar}
        />

        <Button size="full" type="submit">
          {isLoadingFormActivity ? 'Processando Informações...' : 'Salvar Atividade'}
        </Button>
      </form>
    </Modal>
  )
}