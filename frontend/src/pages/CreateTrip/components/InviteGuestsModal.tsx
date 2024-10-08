import { AtSign, Plus, X } from "lucide-react";
import { Modal } from "../../../components/Modal";
import React, { FormEvent } from "react";
import { Button } from "../../../components/Button";

interface InviteGuestsModalProps {
  emailsToInvite: string[];
  setEmailsToInvite: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: () => void;
}

export function InviteGuestsModal({ emailsToInvite, setEmailsToInvite, onClose }: InviteGuestsModalProps) {
  function addNewEmailToInvite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email')?.toString();
    if (!email) return;
    if (emailsToInvite.includes(email)) return;
    setEmailsToInvite(prevState => [...prevState, email]);
    e.currentTarget.reset();
  }

  function removeEmailFromInvite(email: string) {
    const emailsFiltered = emailsToInvite.filter(emailInvite => emailInvite !== email);
    setEmailsToInvite(emailsFiltered);
  }

  return (
    <Modal
      title="Selecionar convidados"
      subtitle="os convidados irão receber e-emails para confirmar a participação na viagem."
      onClose={onClose}
    >
      <div className="space-y-5">
        {/* Emails Render */}
        {!!emailsToInvite.length && (
          <div className="flex flex-wrap gap-2">
            {emailsToInvite.map((email, index) => (
              <div className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2" key={index}>
                <span className="text-zinc-300">{email}</span>
                <button onClick={() => removeEmailFromInvite(email)}>
                  <X className="size-4 text-zinc-400" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="w-full h-px bg-zinc-800" />

        {/* Email Form */}
        <form
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
          onSubmit={addNewEmailToInvite}
        >
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
            />
          </div>

          <Button type="submit">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </Modal>
  )
}