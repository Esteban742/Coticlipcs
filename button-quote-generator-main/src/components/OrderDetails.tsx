import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorIcon } from "lucide-react";

interface OrderDetailsProps {
  selectedProduct: string;
  formData: any;
  onInputChange: (field: string, value: string) => void;
  onCalculate: () => void;
}

export function OrderDetails({ selectedProduct, formData, onInputChange, onCalculate }: OrderDetailsProps) {
  const renderProductSpecificFields = () => {
    switch (selectedProduct) {
      case "manualOrder":
        return (
          <>
            <div>
              <Label>Descripción</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => onInputChange("description", e.target.value)}
                placeholder="Descripción del pedido"
                className="h-24"
              />
            </div>
            <div>
              <Label>Total</Label>
              <Input
                value={formData.manualTotal}
                onChange={(e) => onInputChange("manualTotal", e.target.value.replace(/\D/g, ''))}
                placeholder="Valor total"
                type="number"
              />
            </div>
          </>
        );
      case "businessCards":
        return (
          <>
            <div>
              <Label>Cantidad (Por Millar)</Label>
              <Input
                value={formData.businessCardCount}
                onChange={(e) => onInputChange("businessCardCount", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad en millares"
                type="number"
              />
            </div>
            <div>
              <Label>Acabados</Label>
              <Select
                value={formData.businessCardFinish}
                onValueChange={(value) => onInputChange("businessCardFinish", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione acabado..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-lado-brillante">1 lado plastificado brillante</SelectItem>
                  <SelectItem value="2-caras-brillante">2 caras plastificados brillante</SelectItem>
                  <SelectItem value="2-caras-mate-filtro">2 caras plastificado mate + filtro U</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "stickers":
        return (
          <>
            <div>
              <Label>Cantidad de Stickers</Label>
              <Input
                value={formData.stickerCount}
                onChange={(e) => onInputChange("stickerCount", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad"
                type="number"
              />
            </div>
            <div>
              <Label>Tipo de Acabado</Label>
              <Select
                value={formData.stickerType}
                onValueChange={(value) => onInputChange("stickerType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tipo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plastificado-50x30">Plastificado y corte 50x30 (cm)</SelectItem>
                  <SelectItem value="plastificado-23x50">Plastificado y corte 23x50 (cm)</SelectItem>
                  <SelectItem value="ninguno">Ninguno</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "botones":
        return (
          <>
            <div>
              <Label>Cantidad de Botones</Label>
              <Input
                value={formData.buttonCount}
                onChange={(e) => onInputChange("buttonCount", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad"
                type="number"
              />
            </div>
          </>
        );
      case "mugs":
        return (
          <>
            <div>
              <Label>Cantidad de Mugs</Label>
              <Input
                value={formData.mugCount}
                onChange={(e) => onInputChange("mugCount", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad"
                type="number"
              />
            </div>
            <div>
              <Label>Tipo de Mug</Label>
              <Select
                value={formData.mugType}
                onValueChange={(value) => onInputChange("mugType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tipo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple-1-12">Sencillo de 1 a 12</SelectItem>
                  <SelectItem value="simple-more-12">Sencillo más de 12</SelectItem>
                  <SelectItem value="color-internal">Color Interno + Tapa + Oreja</SelectItem>
                  <SelectItem value="silicone-base">Con Tapa + Base de Silicona</SelectItem>
                  <SelectItem value="glitter">Escarchado</SelectItem>
                  <SelectItem value="magic">Mágico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "libros":
        return (
          <>
            <div>
              <Label>Cantidad de Libros</Label>
              <Input
                value={formData.bookQuantity}
                onChange={(e) => onInputChange("bookQuantity", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad de libros"
                type="number"
              />
            </div>
            <div>
              <Label>Número de Páginas</Label>
              <Input
                value={formData.bookPages}
                onChange={(e) => onInputChange("bookPages", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad de páginas"
                type="number"
              />
            </div>
            <div>
              <Label>Tamaño de Página</Label>
              <Select
                value={formData.bookSize}
                onValueChange={(value) => onInputChange("bookSize", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tamaño..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oficio">Oficio</SelectItem>
                  <SelectItem value="carta">Carta</SelectItem>
                  <SelectItem value="medioOficio">Medio Oficio</SelectItem>
                  <SelectItem value="mediaCarta">Media Carta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tipo de Impresión</Label>
              <Select
                value={formData.printType}
                onValueChange={(value) => onInputChange("printType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tipo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="una-cara-bn">Una cara B/N</SelectItem>
                  <SelectItem value="lado-lado-bn">Lado x lado B/N</SelectItem>
                  <SelectItem value="una-cara-color">Una cara color</SelectItem>
                  <SelectItem value="lado-lado-color">Lado x lado color</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tipo de Empaste</Label>
              <Select
                value={formData.bindingType}
                onValueChange={(value) => onInputChange("bindingType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tipo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="espiral">Espiral</SelectItem>
                  <SelectItem value="cartilla-carta-oficio">T. Cartilla Cart y Ofic</SelectItem>
                  <SelectItem value="cartilla-media">T. Cartilla 1/2 Cart y 1/2 Ofic</SelectItem>
                  <SelectItem value="pasta-dura-carta-oficio">Pasta Dura Cart y Ofic</SelectItem>
                  <SelectItem value="pasta-dura-media">Pasta Dura 1/2 Cart y 1/2 Ofic</SelectItem>
                  <SelectItem value="doble-o">Doble O</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "carnets":
        return (
          <>
            <div>
              <Label>Cantidad de Carnets</Label>
              <Input
                value={formData.carnetCount}
                onChange={(e) => onInputChange("carnetCount", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad"
                type="number"
              />
            </div>
            <div>
              <Label>Tipo de Carnet</Label>
              <Select
                value={formData.carnetType}
                onValueChange={(value) => onInputChange("carnetType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tipo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-cara">1 Cara</SelectItem>
                  <SelectItem value="2-caras">2 Caras</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "pendones":
        return (
          <>
            <div>
              <Label>Ancho (cm)</Label>
              <Input
                value={formData.pendonWidth}
                onChange={(e) => onInputChange("pendonWidth", e.target.value.replace(/\D/g, ''))}
                placeholder="Ancho en centímetros"
                type="number"
              />
            </div>
            <div>
              <Label>Alto (cm)</Label>
              <Input
                value={formData.pendonHeight}
                onChange={(e) => onInputChange("pendonHeight", e.target.value.replace(/\D/g, ''))}
                placeholder="Alto en centímetros"
                type="number"
              />
            </div>
            <div>
              <Label>Material</Label>
              <Select
                value={formData.pendonMaterial}
                onValueChange={(value) => onInputChange("pendonMaterial", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione material..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lona">Lona</SelectItem>
                  <SelectItem value="vinilo">Vinilo</SelectItem>
                  <SelectItem value="microperforado">Microperforado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Plastificado</Label>
              <Select
                value={formData.pendonPlastificado}
                onValueChange={(value) => onInputChange("pendonPlastificado", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="¿Incluir plastificado?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Ojaletes</Label>
              <Select
                value={formData.pendonOjaletes}
                onValueChange={(value) => onInputChange("pendonOjaletes", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="¿Incluir ojaletes?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              {formData.pendonOjaletes === "si" && (
                <div className="mt-4">
                  <Label>Cantidad de Ojaletes</Label>
                  <Input
                    value={formData.pendonOjaletesCount}
                    onChange={(e) => onInputChange("pendonOjaletesCount", e.target.value.replace(/\D/g, ''))}
                    placeholder="Número de ojaletes"
                    type="number"
                  />
                </div>
              )}
            </div>
            <div>
              <Label>Perfiles</Label>
              <Select
                value={formData.pendonPerfiles}
                onValueChange={(value) => onInputChange("pendonPerfiles", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="¿Incluir perfiles?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "retablos":
        return (
          <>
            <div>
              <Label>Ancho (cm)</Label>
              <Input
                value={formData.retabloWidth}
                onChange={(e) => onInputChange("retabloWidth", e.target.value.replace(/\D/g, ''))}
                placeholder="Ancho en centímetros"
                type="number"
              />
            </div>
            <div>
              <Label>Alto (cm)</Label>
              <Input
                value={formData.retabloHeight}
                onChange={(e) => onInputChange("retabloHeight", e.target.value.replace(/\D/g, ''))}
                placeholder="Alto en centímetros"
                type="number"
              />
            </div>
            <div>
              <Label>Gancho</Label>
              <Select
                value={formData.retabloHook}
                onValueChange={(value) => onInputChange("retabloHook", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="¿Incluir gancho?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.retabloHook === "si" && (
              <div>
                <Label>Cantidad de Ganchos</Label>
                <Input
                  value={formData.retabloHookCount}
                  onChange={(e) => onInputChange("retabloHookCount", e.target.value.replace(/\D/g, ''))}
                  placeholder="Número de ganchos"
                  type="number"
                />
              </div>
            )}
            <div>
              <Label>Soporte</Label>
              <Select
                value={formData.retabloSupport}
                onValueChange={(value) => onInputChange("retabloSupport", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="¿Incluir soporte?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "rollup":
        return (
          <>
            <div>
              <Label>Cantidad de Roll Ups</Label>
              <Input
                value={formData.rollUpCount}
                onChange={(e) => onInputChange("rollUpCount", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad"
                type="number"
              />
            </div>
            <div>
              <Label>Tamaño</Label>
              <Select
                value={formData.rollUpSize}
                onValueChange={(value) => onInputChange("rollUpSize", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tamaño..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="160-60">160 cm x 60 cm</SelectItem>
                  <SelectItem value="200-100">200 cm x 100 cm</SelectItem>
                  <SelectItem value="200-200">200 cm x 200 cm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "plotter":
        return (
          <>
            <div>
              <Label>Cantidad de Impresiones</Label>
              <Input
                value={formData.plotterCount}
                onChange={(e) => onInputChange("plotterCount", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad"
                type="number"
              />
            </div>
            <div>
              <Label>Tamaño y Material</Label>
              <Select
                value={formData.plotterSize}
                onValueChange={(value) => onInputChange("plotterSize", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tamaño y material..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pliego-opalina">Pliego Opalina (60x100cm)</SelectItem>
                  <SelectItem value="pliego-bond">Pliego Bond (60x100cm)</SelectItem>
                  <SelectItem value="medio-pliego-opalina">Medio Pliego Opalina (50x70cm)</SelectItem>
                  <SelectItem value="medio-pliego-bond">Medio Pliego Bond (50x60cm)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "spiderBanner":
        return (
          <>
            <div>
              <Label>Cantidad</Label>
              <Input
                value={formData.spiderBannerCount}
                onChange={(e) => onInputChange("spiderBannerCount", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad"
                type="number"
              />
            </div>
            <div>
              <Label>Tamaño</Label>
              <Select
                value={formData.spiderBannerSize}
                onValueChange={(value) => onInputChange("spiderBannerSize", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tamaño..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60-160">60 cm x 160 cm</SelectItem>
                  <SelectItem value="80-180">80 cm x 180 cm</SelectItem>
                  <SelectItem value="100-200">100 cm x 200 cm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "posters":
        return (
          <>
            <div>
              <Label>Cantidad de Posters</Label>
              <Input
                value={formData.posterCount}
                onChange={(e) => onInputChange("posterCount", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad"
                type="number"
              />
            </div>
            <div>
              <Label>Acabados</Label>
              <Select
                value={formData.posterFinish}
                onValueChange={(value) => onInputChange("posterFinish", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione acabado..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Plastificado Mate">Plastificado Mate</SelectItem>
                  <SelectItem value="Plastificado Brillante">Plastificado Brillante</SelectItem>
                  <SelectItem value="Ninguno">Ninguno</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "flyers":
        return (
          <>
            <div>
              <Label>Cantidad (Por Millar)</Label>
              <Input
                value={formData.flyerCount}
                onChange={(e) => onInputChange("flyerCount", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad en millares"
                type="number"
              />
            </div>
            <div>
              <Label>Medida y Tipo de Papel</Label>
              <Select
                value={formData.flyerType}
                onValueChange={(value) => onInputChange("flyerType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tipo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-cara-21x12-115gr">1 Cara, 21cm x 12cm, P.115gr</SelectItem>
                  <SelectItem value="2-caras-21x12-115gr">2 Caras, 21cm x 12cm, P.115gr</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "dtfUv":
        return (
          <>
            <div>
              <Label>Ancho (cm)</Label>
              <Input
                value={formData.dtfUvWidth}
                onChange={(e) => onInputChange("dtfUvWidth", e.target.value.replace(/\D/g, ''))}
                placeholder="Ancho en centímetros"
                type="number"
              />
            </div>
            <div>
              <Label>Alto (cm)</Label>
              <Input
                value={formData.dtfUvHeight}
                onChange={(e) => onInputChange("dtfUvHeight", e.target.value.replace(/\D/g, ''))}
                placeholder="Alto en centímetros"
                type="number"
              />
            </div>
          </>
        );
      case "magnetSheet":
        return (
          <>
            <div>
              <Label>Ancho (cm)</Label>
              <Input
                value={formData.magnetSheetWidth}
                onChange={(e) => onInputChange("magnetSheetWidth", e.target.value.replace(/\D/g, ''))}
                placeholder="Ancho en centímetros"
                type="number"
              />
            </div>
            <div>
              <Label>Alto (cm)</Label>
              <Input
                value={formData.magnetSheetHeight}
                onChange={(e) => onInputChange("magnetSheetHeight", e.target.value.replace(/\D/g, ''))}
                placeholder="Alto en centímetros"
                type="number"
              />
            </div>
          </>
        );
      case "photocopies":
        return (
          <>
            <div>
              <Label>Cantidad</Label>
              <Input
                value={formData.photocopiesCount}
                onChange={(e) => onInputChange("photocopiesCount", e.target.value.replace(/\D/g, ''))}
                placeholder="Cantidad"
                type="number"
              />
            </div>
            <div>
              <Label>Tipo de Impresión</Label>
              <Select
                value={formData.printType}
                onValueChange={(value) => onInputChange("printType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tipo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carta-1-cara">Carta 1 cara</SelectItem>
                  <SelectItem value="carta-lxl">Carta LxL</SelectItem>
                  <SelectItem value="oficio-1-cara">Oficio 1 cara</SelectItem>
                  <SelectItem value="oficio-lxl">Oficio LxL</SelectItem>
                  <SelectItem value="color-carta-1-cara">Color carta 1 cara</SelectItem>
                  <SelectItem value="color-carta-lxl">Color carta LxL</SelectItem>
                  <SelectItem value="color-oficio-1-cara">Color oficio 1 cara</SelectItem>
                  <SelectItem value="color-oficio-lxl">Color oficio LxL</SelectItem>
                  <SelectItem value="laser-color-carta-1-cara">Laser color carta 1 cara</SelectItem>
                  <SelectItem value="laser-color-carta-lxl">Laser color carta LxL</SelectItem>
                  <SelectItem value="laser-oficio-1-cara">Laser Oficio 1 cara</SelectItem>
                  <SelectItem value="laser-oficio-lxl">Laser Oficio LxL</SelectItem>
                  <SelectItem value="laser-media-carta-1-cara">Laser Media Carta 1 Cara</SelectItem>
                  <SelectItem value="laser-media-carta-lxl">Laser Media Carta LxL</SelectItem>
                  <SelectItem value="laser-medio-oficio">Laser Medio Oficio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CalculatorIcon className="w-5 h-5" />
        Detalles del Pedido
      </h2>
      
      <div className="space-y-4">
        {renderProductSpecificFields()}

        <div>
          <Label>Diseño (opcional)</Label>
          <Input
            value={formData.design}
            onChange={(e) => onInputChange("design", e.target.value.replace(/\D/g, ''))}
            placeholder="Valor del diseño"
            type="number"
          />
        </div>

        <div>
          <Label>Abono</Label>
          <Input
            value={formData.deposit}
            onChange={(e) => onInputChange("deposit", e.target.value.replace(/\D/g, ''))}
            placeholder="Valor del abono"
            type="number"
          />
        </div>

        <div>
          <Label>Domicilio</Label>
          <Input
            value={formData.delivery}
            onChange={(e) => onInputChange("delivery", e.target.value.replace(/\D/g, ''))}
            placeholder="Valor del domicilio"
            type="number"
          />
        </div>

        <div>
          <Label>Dirección</Label>
          <Textarea
            value={formData.address}
            onChange={(e) => onInputChange("address", e.target.value)}
            placeholder="Dirección de entrega"
            className="h-24"
          />
        </div>

        <Button 
          onClick={onCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Calcular
        </Button>
      </div>
    </Card>
  );
}
