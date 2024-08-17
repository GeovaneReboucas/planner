import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { CircleCheck, CircleDashed, Plus } from "lucide-react";
import { format, isBefore, startOfDay } from "date-fns";
import { ptBR } from 'date-fns/locale';
import classNames from "classnames";

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
  const currentDate = new Date();

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
            const activityPlanningDate = startOfDay(new Date(activityPlanning.date));
            const isExpiredPlanning = isBefore(activityPlanningDate, startOfDay(currentDate));

            return (
              <div className="space-y-2.5" key={activityPlanning.date}>
                <div className="flex gap-2 items-baseline">
                  <span
                    className={
                      classNames('text-xl text-zinc-300 font-semibold', {
                        'text-zinc-500': isExpiredPlanning,
                      })
                    }
                  >
                    Dia {format(activityPlanning.date, 'dd')}
                  </span>
                  <span
                    className={
                      classNames('text-xs text-zinc-500', {
                        'text-zinc-600': isExpiredPlanning,
                      })
                    }
                  >
                    {format(activityPlanning.date, 'eeee', { locale: ptBR })}
                  </span>
                </div>

                {!activityPlanning.activities.length ?
                  (<p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>) :
                  activityPlanning.activities.map(activity => {
                    const activityDate = new Date(activity.occursAt);
                    const isExpiredActivity = isBefore(activityDate, currentDate);

                    return (
                      <div className="space-y-2.5" key={activity.id}>
                        <div
                          className={
                            classNames('px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3', {
                              'bg-opacity-65': isExpiredActivity
                            })
                          }
                        >
                          {isExpiredActivity ? (
                            <CircleCheck className="size-5 text-lime-300" />
                          ) : (
                            <CircleDashed className="size-5 text-zinc-500" />
                          )}
                          <span
                            className={
                              classNames('text-zinc-100 mr-auto', {
                                'text-opacity-50': isExpiredActivity
                              })
                            }
                          >
                            {activity.title}
                          </span>
                          <span
                            className={
                              classNames('text-zinc-400 text-sm', {
                                'text-opacity-65': isExpiredActivity,
                              })
                            }
                          >
                            {format(activity.occursAt, 'p', { locale: ptBR })}
                          </span>
                        </div>
                      </div>
                    )
                  })
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