import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, User, Mail } from "lucide-react";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./components/InviteGuestsModal";

export function CreateTripPage() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  const navigate = useNavigate();

  function toggleGuestsInput() {
    setIsGuestsInputOpen(prevState => !prevState);
  }

  function toggleGuestsModal() {
    setIsGuestsModalOpen(prevState => !prevState);
  }

  function toggleConfirmTripModal() {
    setIsConfirmTripModalOpen(prevState => !prevState);
  }

  function createTrip(){
    navigate('/trips/123');
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
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
                <button
                  className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 transition-colors hover:bg-zinc-700"
                  onClick={toggleGuestsInput}
                >
                  Alterar local/data
                  <Settings2 className="size-5 text-zinc-400" />
                </button>
              ) : (
                <button
                  className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 transition-colors hover:bg-lime-400"
                  onClick={toggleGuestsInput}
                >
                  Continuar
                  <ArrowRight className="size-5" />
                </button>
              )
            }
          </div>

          {isGuestsInputOpen && (
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

              <button
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 transition-colors hover:bg-lime-400"
                onClick={toggleConfirmTripModal}
              >
                Confirmar Viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela Plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

      {/* Guests Modal */}
      {isGuestsModalOpen && (
        <InviteGuestsModal
          emails={emailsToInvite}
          setEmails={setEmailsToInvite}
          onClose={toggleGuestsModal}
        />
      )}


      {/* Confirm Trip Modal */}
      {isConfirmTripModalOpen && (
        <Modal title="Confirmar criação de viagem" onClose={toggleConfirmTripModal}>
          <div className="space-y-5">
            <p className="text-sm text-zinc-400 mt-2">
              Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 e Agosto de 2024</span> preencha seus dados abaixo:
            </p>

            {/* Confirm Trip Form */}
            <form
              className="space-y-3"
              onSubmit={() => { }}
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

              <button
                className="w-full bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center justify-center gap-2 transition-colors hover:bg-lime-400"
                type="submit"
                onClick={createTrip}
              >
                Confirmar criação da viagem
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}
