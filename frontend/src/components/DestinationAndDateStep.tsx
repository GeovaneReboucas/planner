import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { format } from "date-fns";
import classNames from "classnames";

import { Button } from "./Button";
import { Modal } from "./Modal";

import "react-day-picker/dist/style.css";

interface DestinationAndDateStepInterface {
  destination: string;
  eventStartAndEndDates?: DateRange;
  closeInputs: boolean;
  onClick: () => void;
  onInputsChange?: (inputValues: { destination: string; eventStartAndEndDates?: DateRange }) => void;
}

export function DestinationAndDateStep({
  destination,
  eventStartAndEndDates,
  closeInputs,
  onClick,
  onInputsChange
}: DestinationAndDateStepInterface) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const formatDateStr = "d ' de ' LLL";
  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to ?
    format(eventStartAndEndDates.from, formatDateStr).concat(' até ').concat(format(eventStartAndEndDates.to, formatDateStr)) :
    undefined;

  function toggleDatePicker() {
    setIsDatePickerOpen(prevState => !prevState);
  }

  function onChangeInputDestination(value: string){
    if(!onInputsChange) return;
    const inputsValue = { destination: value, eventStartAndEndDates };
    onInputsChange(inputsValue);
  }

  function onChangeInputEventDates(value?: DateRange){
    if(!onInputsChange) return;
    const inputsValue = { destination, eventStartAndEndDates: value };
    onInputsChange(inputsValue);
  }

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          type="text"
          placeholder="Para onde você vai?"
          value={destination}
          disabled={closeInputs}
          onChange={e => onChangeInputDestination(e.target.value)}
        />
      </div>

      <button className="flex items-center text-zinc-400 gap-2 text-left" disabled={closeInputs} onClick={toggleDatePicker}>
        <Calendar className="size-5" />
        <span
          className={classNames('text-lg', {
            'text-white': displayedDate,
          })}
        >
          {displayedDate || 'Quando?'}
        </span>
      </button>

      <div className="w-px h-6 bg-zinc-800"></div>

      {
        closeInputs ? (
          <Button onClick={onClick} variant="secondary">
            Alterar local/data
            <Settings2 className="size-5 text-zinc-400" />
          </Button>
        ) : (
          <Button
            className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 transition-colors hover:bg-lime-400"
            onClick={onClick}
          >
            Continuar
            <ArrowRight className="size-5" />
          </Button>
        )
      }

      {isDatePickerOpen && (
        <Modal title='Selecione a data' subtitle='Ciicando duas vezes no calendário é possível escolher o range da data.' onClose={toggleDatePicker}>
          <div className="flex justify-center">
            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={onChangeInputEventDates}
            />
          </div>
        </Modal>
      )}
    </div>
  )
}