import { DestinationAndDateStep } from "../../components/DestinationAndDateStep";
import { LinksSection } from "./components/LinksSection";
import { GuestsSection } from "./components/GuestsSection";
import { ActivitiesSection } from "./components/ActivitiesSection";

export function TripDetailsPage() {

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateStep isGuestsInputOpen={true} onClick={() => { }} />

      <main className="flex gap-16 px-6">
        <ActivitiesSection />

        <div className="w-80 space-y-6">
          <LinksSection />
          <div className="w-full h-px bg-zinc-800" />
          <GuestsSection />
        </div>
      </main>
    </div>
  )
}