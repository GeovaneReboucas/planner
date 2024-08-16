import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { CircleCheck, Plus } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

import { api } from "../../../services/axios";
import { ActivityPlanning } from "../../../types";

import { Button } from "../../../components/Button";
import { ActivityModal } from "./ActivityModal";

interface ActivitiesSectionProps {
  activitiesPlanning: ActivityPlanning[];
  findActivitiesByTrip: () => Promise<void>;
}

export function ActivitiesSection({ activitiesPlanning, findActivitiesByTrip }: ActivitiesSectionProps) {
  const { tripId } = useParams();
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  function toggleIsActivityModalOpen() {
    setIsActivityModalOpen(prevState => !prevState);
  }

  async function onSaveActivity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = data.get('title')?.toString();
    const occursAt = data.get('occursAt')?.toString();

    await api.post(`trips/${tripId}/activities`, {
      title,
      occursAt
    });
    await findActivitiesByTrip();
    toggleIsActivityModalOpen();
  }

  return (
    <>
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Atividades</h2>
          <Button onClick={toggleIsActivityModalOpen}>
            <Plus className="size-5" />
            Cadastrar Atividade
          </Button>
        </div>

        <div className="space-y-8">
          {activitiesPlanning.map(activityPlanning => {
            return (
              <div className="space-y-2.5">
                <div className="flex gap-2 items-baseline">
                  <span className="text-xl text-zinc-300 font-semibold">Dia {format(activityPlanning.date, 'dd')}</span>
                  <span className="text-xs text-zinc-500">{format(activityPlanning.date, 'eeee', { locale: ptBR })}</span>
                </div>

                {!activityPlanning.activities.length ?
                  (<p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>) :
                  activityPlanning.activities.map(activity => (
                    (
                      <div className="space-y-2.5">
                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                          <CircleCheck className="size-5 text-lime-300" />
                          <span className="text-zinc-100 mr-auto">{activity.title}</span>
                          <span className="text-zinc-400 text-sm">{format(activity.occursAt, 'p', { locale: ptBR })}</span>
                        </div>
                      </div>
                    )
                  ))
                }
              </div>
            )
          })}
        </div>
      </div>

      {isActivityModalOpen && (
        <ActivityModal onSave={onSaveActivity} onClose={toggleIsActivityModalOpen} />
      )}
    </>
  );
}