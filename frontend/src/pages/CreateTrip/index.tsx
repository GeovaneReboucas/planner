import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";

import { tripService } from "../../services/TripService";
import { TripCreateResponse } from "../../types";

import { InviteGuestsModal } from "./components/InviteGuestsModal";
import { CreateTripModal } from "./components/CreateTripModal";
import { DestinationAndDateStep } from "../../components/DestinationAndDateStep";
import { InviteGuestsStep } from "./components/InviteGuestsStep";

export function CreateTripPage() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

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

  async function createTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const ownerEmail = data.get('ownerEmail')?.toString();
    const ownerName = data.get('ownerName')?.toString();

    if (
      !ownerEmail ||
      !ownerName ||
      !destination ||
      !emailsToInvite.length ||
      !eventStartAndEndDates?.to  ||
      !eventStartAndEndDates?.from
    ) return;

    const trip = {
      ownerEmail: ownerEmail,
      ownerName: ownerName,
      destination,
      emailsToInvite: emailsToInvite,
      startsAt: eventStartAndEndDates.from,
      endsAt: eventStartAndEndDates.to
    };
    const { tripId } = await tripService.post<TripCreateResponse>(trip);
    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            destination={destination}
            eventStartAndEndDates={eventStartAndEndDates}
            closeInputs={isGuestsInputOpen}
            onClick={toggleGuestsInput}
            onInputsChange={({ destination, eventStartAndEndDates }) => {
              setDestination(destination);
              setEventStartAndEndDates(eventStartAndEndDates);
            }}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              toggleGuestsModal={toggleGuestsModal}
              toggleConfirmTripModal={toggleConfirmTripModal}
            />
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
          emailsToInvite={emailsToInvite}
          setEmailsToInvite={setEmailsToInvite}
          onClose={toggleGuestsModal}
        />
      )}

      {/* Confirm Trip Modal */}
      {isConfirmTripModalOpen && (
        <CreateTripModal
          onCreateTrip={createTrip}
          onClose={toggleConfirmTripModal}
        />
      )}
    </div>
  )
}
