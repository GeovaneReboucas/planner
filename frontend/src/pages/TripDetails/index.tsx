import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { tripService } from "../../services/TripService";
import { ActivityPlanning, Link, Participant, Trip } from "../../types";

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
  const [activitiesPlanning, setActivitiesPlanning] = useState<ActivityPlanning[]>([]);

  useEffect(() => {
    loadData();
  }, [tripId]);

  async function findTripById() {
    const data = await tripService.findTripById(tripId!);
    if (data) setTrip(data);
  }

  async function findParticipantsByTrip() {
    const data = await tripService.findParticipantsByTrip(tripId!);
    if (data) setParticipants(data);
  }

  async function findLinksByTrip() {
    const data = await tripService.findLinksByTrip(tripId!);
    if (data) setLinks(data);
  }

  async function findActivitiesByTrip() {
    const data = await tripService.findActivitiesByTrip(tripId!);
    if (data) setActivitiesPlanning(data);
  }

  async function loadData() {
    setIsLoading(true);
    if(!tripId) return;
    await findTripById();
    await findParticipantsByTrip();
    await findLinksByTrip();
    await findActivitiesByTrip();
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
          <ActivitiesSection
            activitiesPlanning={activitiesPlanning}
            findActivitiesByTrip={findActivitiesByTrip}
          />

          <div className="w-80 space-y-6">
            <LinksSection
              links={links}
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