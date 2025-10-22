import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package } from "lucide-react";

interface ProductSelectorProps {
  selectedProduct: string;
  onProductChange: (value: string) => void;
}

export function ProductSelector({ selectedProduct, onProductChange }: ProductSelectorProps) {
  return (
    <div className="mb-8 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Package className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight text-primary">Seleccionar Producto</h2>
      </div>
      <Select
        value={selectedProduct}
        onValueChange={onProductChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Seleccione un producto" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="manualOrder">Cotizador de Orden Manual</SelectItem>
          <SelectItem value="botones">Cotizador de Botones</SelectItem>
          <SelectItem value="mugs">Cotizador de Mugs</SelectItem>
          <SelectItem value="libros">Cotizador de Libros</SelectItem>
          <SelectItem value="carnets">Cotizador de Carnets Teslin</SelectItem>
          <SelectItem value="pendones">Cotizador de Pendones</SelectItem>
          <SelectItem value="retablos">Cotizador de Retablos</SelectItem>
          <SelectItem value="rollup">Cotizador de Roll Up</SelectItem>
          <SelectItem value="stickers">Cotizador de Stickers</SelectItem>
          <SelectItem value="plotter">Cotizador de Plotter</SelectItem>
          <SelectItem value="spiderBanner">Cotizador de Pendón Tipo Araña</SelectItem>
          <SelectItem value="posters">Cotizador de Posters</SelectItem>
          <SelectItem value="businessCards">Cotizador de Tarjetas de Presentación</SelectItem>
          <SelectItem value="flyers">Cotizador de Volantes</SelectItem>
          <SelectItem value="dtfUv">Cotizador DTF UV</SelectItem>
          <SelectItem value="magnetSheet">Cotizador Lámina de Imán</SelectItem>
          <SelectItem value="photocopies">Cotizador de Fotocopias y Impresiones</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}