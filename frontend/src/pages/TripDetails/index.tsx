import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { api } from "../../services/axios";
import { Link, Participant, Trip } from "../../types";

import { DestinationAndDateStep } from "../../components/DestinationAndDateStep";
import { LinksSection } from "./components/LinksSection";
import { ParticipantsSection } from "./components/ParticipantsSection";
import { ActivitiesSection } from "./components/ActivitiesSection";
import { Loading } from "../../components/Loading";

export function TripDetailsPage() {
  const { tripId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [trip, setTrip] = useState<Trip>();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    loadData();
  }, [tripId]);

  async function findTripById() {
    const { data } = await api.get(`trips/${tripId}`);
    if (data) setTrip(data);
  }

  async function findParticipantsByTrip() {
    const { data } = await api.get(`trips/${tripId}/participants`);
    if (data) setParticipants(data);
  }

  async function findLinksByTrip() {
    const { data } = await api.get(`trips/${tripId}/links`);
    if (data) setLinks(data);
  }

  async function loadData() {
    setIsLoading(true);
    if(!tripId) return;
    await findTripById();
    await findParticipantsByTrip();
    await findLinksByTrip();
    setIsLoading(false);
  }

  return (
    isLoading ? (<Loading />) : (
      <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
        <DestinationAndDateStep
          destination={trip!.destination}
          closeInputs={true}
          eventStartAndEndDates={{
            to: new Date(trip!.startsAt),
            from: new Date(trip!.endsAt)
          }}
          onClick={() => {}}
        />

        <main className="flex gap-16 px-6">
          <ActivitiesSection />

          <div className="w-80 space-y-6">
            <LinksSection
              links={links}
              tripId={tripId!}
              findLinksByTrip={findLinksByTrip}
            />
            <div className="w-full h-px bg-zinc-800" />
            <ParticipantsSection participants={participants} />
          </div>
        </main>
      </div>
    )

  )
}