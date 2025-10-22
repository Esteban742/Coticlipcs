import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TimeSelectorProps {
  time: {
    hour: string;
    minute: string;
    period: string;
  };
  onChange: (time: any) => void;
}

export function TimeSelector({ time, onChange }: TimeSelectorProps) {
  const hours = Array.from({ length: 12 }, (_, i) => 
    (i + 1).toString().padStart(2, '0')
  );
  
  const minutes = Array.from({ length: 60 }, (_, i) => 
    i.toString().padStart(2, '0')
  );

  return (
    <div className="flex gap-2">
      <div className="w-[90px]">
        <Select
          value={time.hour}
          onValueChange={(hour) => onChange({ ...time, hour })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Hora" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-[90px]">
        <Select
          value={time.minute}
          onValueChange={(minute) => onChange({ ...time, minute })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Min" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-[90px]">
        <Select
          value={time.period}
          onValueChange={(period) => onChange({ ...time, period })}
        >
          <SelectTrigger>
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}