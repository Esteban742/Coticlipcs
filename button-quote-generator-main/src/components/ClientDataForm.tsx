import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/DatePicker";
import { TimeSelector } from "@/components/TimeSelector";
import { Card } from "@/components/ui/card";
import { UserIcon } from "lucide-react";

interface ClientDataFormProps {
  formData: {
    attendedBy: string;
    client: string;
    whatsapp: string;
    deliveryDate: Date;
    deliveryTime: {
      hour: string;
      minute: string;
      period: string;
    };
  };
  onInputChange: (field: string, value: string | Date) => void;
}

export function ClientDataForm({ formData, onInputChange }: ClientDataFormProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <UserIcon className="w-5 h-5" />
        Datos del Cliente
      </h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Atendido por</Label>
          <Select
            value={formData.attendedBy}
            onValueChange={(value) => onInputChange("attendedBy", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Freddy">Freddy</SelectItem>
              <SelectItem value="Aura">Aura</SelectItem>
              <SelectItem value="Gerson">Gerson</SelectItem>
              <SelectItem value="Erika">Erika</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Cliente</Label>
          <Input
            value={formData.client}
            onChange={(e) => onInputChange("client", e.target.value)}
            placeholder="Nombre del cliente"
          />
        </div>

        <div className="space-y-2">
          <Label>WhatsApp</Label>
          <Input
            value={formData.whatsapp}
            onChange={(e) => onInputChange("whatsapp", e.target.value.replace(/\D/g, ''))}
            placeholder="Número de WhatsApp"
            type="tel"
          />
        </div>

        <div className="space-y-2">
          <Label>Fecha de Entrega</Label>
          <DatePicker
            date={formData.deliveryDate}
            onSelect={(date) => onInputChange("deliveryDate", date)}
          />
        </div>

        <div className="space-y-2">
          <Label>Hora de Entrega</Label>
          <TimeSelector
            time={formData.deliveryTime}
            onChange={(time) => onInputChange("deliveryTime", time)}
          />
        </div>
      </div>
    </Card>
  );
}