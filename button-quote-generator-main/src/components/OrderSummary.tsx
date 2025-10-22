import { Card } from "@/components/ui/card";

interface OrderSummaryProps {
  formData: {
    description?: string;
    manualTotal?: string;
    attendedBy: string;
    client: string;
    whatsapp: string;
    deliveryDate: Date;
    deliveryTime: {
      hour: string;
      minute: string;
      period: string;
    };
    address: string;
    buttonCount: string;
    design: string;
    deposit: string;
    delivery: string;
    mugCount?: string;
    mugType?: string;
    bookQuantity?: string;
    bookPages?: string;
    bookSize?: string;
    printType?: string;  // Single declaration for printType
    bindingType?: string;
    pendonWidth?: string;
    pendonHeight?: string;
    pendonMaterial?: string;
    pendonPlastificado?: string;
    pendonOjaletes?: string;
    pendonPerfiles?: string;
    pendonOjaletesCount?: string;
    carnetCount?: string;
    carnetType?: string;
    retabloWidth?: string;
    retabloHeight?: string;
    retabloHook?: string;
    retabloHookCount?: string;
    retabloSupport?: string;
    rollUpSize?: string;
    rollUpCount?: string;
    stickerCount?: string;
    stickerType?: string;
    plotterCount?: string;
    plotterSize?: string;
    spiderBannerCount?: string;
    spiderBannerSize?: string;
    posterCount?: string;
    posterFinish?: string;
    businessCardCount?: string;
    businessCardFinish?: string;
    flyerCount?: string;
    flyerType?: string;
    dtfUvWidth?: string;
    dtfUvHeight?: string;
    magnetSheetWidth?: string;
    magnetSheetHeight?: string;
    photocopiesCount?: string;
  };
  calculations: {
    total: number;
    balance: number;
    unitPrice?: number;
  };
  selectedProduct: string;
}

export function OrderSummary({ formData, calculations, selectedProduct }: OrderSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatTime = (time: { hour: string; minute: string; period: string }) => {
    return `${time.hour}:${time.minute} ${time.period}`;
  };

  const getMugTypeText = (type: string) => {
    switch (type) {
      case "simple-1-12":
        return "Sencillo de 1 a 12";
      case "simple-more-12":
        return "Sencillo más de 12";
      case "color-internal":
        return "Color Interno + Tapa + Oreja";
      case "silicone-base":
        return "Con Tapa + Base de Silicona";
      case "glitter":
        return "Escarchado";
      case "magic":
        return "Mágico";
      default:
        return type;
    }
  };

  const getBookSizeText = (size: string) => {
    switch (size) {
      case "oficio":
        return "Oficio";
      case "carta":
        return "Carta";
      case "medioOficio":
        return "Medio Oficio";
      case "mediaCarta":
        return "Media Carta";
      default:
        return size;
    }
  };

  const getPrintTypeText = (type: string) => {
    switch (type) {
      case "una-cara-bn":
        return "Una cara B/N";
      case "lado-lado-bn":
        return "Lado x lado B/N";
      case "una-cara-color":
        return "Una cara color";
      case "lado-lado-color":
        return "Lado x lado color";
      case "bn":
        return "B/N";
      case "color":
        return "Color";
      case "carta-1-cara":
        return "Carta una cara";
      case "carta-lxl":
        return "Carta lado por lado";
      case "oficio-1-cara":
        return "Oficio una cara";
      case "oficio-lxl":
        return "Oficio lado por lado";
      case "color-carta-1-cara":
        return "Color carta una cara";
      case "color-carta-lxl":
        return "Color carta lado por lado";
      case "color-oficio-1-cara":
        return "Color oficio una cara";
      case "color-oficio-lxl":
        return "Color oficio lado por lado";
      case "laser-color-carta-1-cara":
        return "Láser color carta una cara";
      case "laser-color-carta-lxl":
        return "Láser color carta lado por lado";
      case "laser-oficio-1-cara":
        return "Láser oficio una cara";
      case "laser-oficio-lxl":
        return "Láser oficio lado por lado";
      case "laser-media-carta-1-cara":
        return "Láser media carta una cara";
      case "laser-media-carta-lxl":
        return "Láser media carta lado por lado";
      case "laser-medio-oficio":
        return "Láser medio oficio";
      default:
        return type;
    }
  };

  const getBindingTypeText = (type: string) => {
    switch (type) {
      case "espiral":
        return "Espiral";
      case "cartilla-carta-oficio":
        return "T. Cartilla Cart y Ofic";
      case "cartilla-media":
        return "T. Cartilla 1/2 Cart y 1/2 Ofic";
      case "pasta-dura-carta-oficio":
        return "Pasta Dura Cart y Ofic";
      case "pasta-dura-media":
        return "Pasta Dura 1/2 Cart y 1/2 Ofic";
      case "doble-o":
        return "Doble O";
      default:
        return type;
    }
  };

  const getCarnetTypeText = (type: string) => {
    switch (type) {
      case "1-cara":
        return "1 Cara";
      case "2-caras":
        return "2 Caras";
      default:
        return type;
    }
  };

  const getRollUpSizeText = (size: string) => {
    switch (size) {
      case "160-60":
        return "160 cm x 60 cm";
      case "200-100":
        return "200 cm x 100 cm";
      case "200-200":
        return "200 cm x 200 cm";
      default:
        return size;
    }
  };

  const getStickerTypeText = (type: string) => {
    switch (type) {
      case "plastificado-50x30":
        return "Plastificado y corte 50x30 (cm)";
      case "plastificado-23x50":
        return "Plastificado y corte 23x50 (cm)";
      case "ninguno":
        return "Ninguno";
      default:
        return type;
    }
  };

  const getPlotterSizeText = (size: string) => {
    switch (size) {
      case "pliego-opalina":
        return "Pliego Opalina (60x100cm)";
      case "pliego-bond":
        return "Pliego Bond (60x100cm)";
      case "medio-pliego-opalina":
        return "Medio Pliego Opalina (50x70cm)";
      case "medio-pliego-bond":
        return "Medio Pliego Bond (50x60cm)";
      default:
        return size;
    }
  };

  const getSpiderBannerSizeText = (size: string) => {
    switch (size) {
      case "60-160":
        return "60 cm x 160 cm";
      case "80-180":
        return "80 cm x 180 cm";
      case "100-200":
        return "100 cm x 200 cm";
      default:
        return size;
    }
  };

  const getBusinessCardFinishText = (finish: string) => {
    switch (finish) {
      case "1-lado-brillante":
        return "1 lado plastificado brillante";
      case "2-caras-brillante":
        return "2 caras plastificados brillante";
      case "2-caras-mate-filtro":
        return "2 caras plastificado mate + filtro U";
      default:
        return finish;
    }
  };

  const getFlyerTypeText = (type: string) => {
    switch (type) {
      case "1-cara-21x12-115gr":
        return "1 Cara, 21cm x 12cm, P.115gr";
      case "2-caras-21x12-115gr":
        return "2 Caras, 21cm x 12cm, P.115gr";
      default:
        return type;
    }
  };

  const getProductTitle = () => {
    switch (selectedProduct) {
      case "manualOrder":
        return "COTIZADOR DE ORDEN MANUAL";
      case "botones":
        return "COTIZADOR DE BOTONES";
      case "mugs":
        return "COTIZADOR DE MUGS";
      case "carnets":
        return "COTIZADOR DE CARNETS TESLIN";
      case "libros":
        return "COTIZADOR DE LIBROS";
      case "pendones":
        return "COTIZADOR DE PENDONES";
      case "retablos":
        return "COTIZADOR DE RETABLOS";
      case "rollup":
        return "COTIZADOR DE ROLL UP";
      case "stickers":
        return "COTIZADOR DE STICKERS";
      case "plotter":
        return "COTIZADOR DE PLOTTER";
      case "spiderBanner":
        return "COTIZADOR DE PENDÓN TIPO ARAÑA";
      case "posters":
        return "COTIZADOR DE POSTERS";
      case "businessCards":
        return "COTIZADOR DE TARJETAS DE PRESENTACIÓN";
      case "flyers":
        return "COTIZADOR DE VOLANTES";
      case "dtfUv":
        return "COTIZADOR DTF UV";
      case "magnetSheet":
        return "COTIZADOR LÁMINA DE IMÁN";
      case "photocopies":
        return "COTIZADOR DE FOTOCOPIAS Y IMPRESIONES";
      default:
        return "COTIZADOR";
    }
  };

  return (
    <div className="space-y-4">
      <p className="font-bold text-lg">{getProductTitle()}</p>

      <div className="space-y-2">
        <p><strong>Atendido por:</strong> {formData.attendedBy || "No especificado"}</p>
        <p><strong>Cliente:</strong> {formData.client || "No especificado"}</p>
        <p><strong>WhatsApp:</strong> {formData.whatsapp || "No especificado"}</p>
        <p><strong>Fecha de Entrega:</strong> {formData.deliveryDate.toLocaleDateString('es-CO')}</p>
        <p><strong>Hora de Entrega:</strong> {formatTime(formData.deliveryTime)}</p>
      </div>

      <div className="space-y-2">
        {selectedProduct === "manualOrder" && (
          <p><strong>Descripción:</strong> {formData.description || "No especificado"}</p>
        )}

        {selectedProduct === "botones" && (
          <p><strong>Cantidad de Botones:</strong> {formData.buttonCount || "No especificado"}</p>
        )}

        {selectedProduct === "mugs" && (
          <>
            <p><strong>Cantidad de Mugs:</strong> {formData.mugCount || "No especificado"}</p>
            <p><strong>Tipo de Mug:</strong> {getMugTypeText(formData.mugType || '')}</p>
          </>
        )}

        {selectedProduct === "libros" && (
          <>
            <p><strong>Cantidad de Libros:</strong> {formData.bookQuantity || "No especificado"}</p>
            <p><strong>Número de Páginas:</strong> {formData.bookPages || "No especificado"}</p>
            <p><strong>Tamaño:</strong> {getBookSizeText(formData.bookSize || '')}</p>
            <p><strong>Tipo de Impresión:</strong> {getPrintTypeText(formData.printType || '')}</p>
            <p><strong>Tipo de Empaste:</strong> {getBindingTypeText(formData.bindingType || '')}</p>
          </>
        )}

        {selectedProduct === "pendones" && (
          <>
            <p><strong>Ancho (cm):</strong> {formData.pendonWidth || "No especificado"}</p>
            <p><strong>Alto (cm):</strong> {formData.pendonHeight || "No especificado"}</p>
            <p><strong>Material:</strong> {formData.pendonMaterial || "No especificado"}</p>
            <p><strong>Plastificado:</strong> {formData.pendonPlastificado === "si" ? "Sí" : "No"}</p>
            <p><strong>Ojaletes:</strong> {formData.pendonOjaletes === "si" ? "Sí" : "No"}</p>
            {formData.pendonOjaletes === "si" && (
              <p><strong>Cantidad de Ojaletes:</strong> {formData.pendonOjaletesCount || "No especificado"}</p>
            )}
            <p><strong>Perfiles:</strong> {formData.pendonPerfiles === "si" ? "Sí" : "No"}</p>
          </>
        )}

        {selectedProduct === "carnets" && (
          <>
            <p><strong>Cantidad de Carnets:</strong> {formData.carnetCount || "No especificado"}</p>
            <p><strong>Tipo:</strong> {getCarnetTypeText(formData.carnetType || '')}</p>
          </>
        )}

        {selectedProduct === "retablos" && (
          <>
            <p><strong>Ancho (cm):</strong> {formData.retabloWidth || "No especificado"}</p>
            <p><strong>Alto (cm):</strong> {formData.retabloHeight || "No especificado"}</p>
            <p><strong>Gancho:</strong> {formData.retabloHook === "si" ? "Sí" : "No"}</p>
            {formData.retabloHook === "si" && (
              <p><strong>Cantidad de Ganchos:</strong> {formData.retabloHookCount || "No especificado"}</p>
            )}
            <p><strong>Soporte:</strong> {formData.retabloSupport === "si" ? "Sí" : "No"}</p>
          </>
        )}

        {selectedProduct === "rollup" && (
          <>
            <p><strong>Cantidad:</strong> {formData.rollUpCount || "No especificado"}</p>
            <p><strong>Tamaño:</strong> {getRollUpSizeText(formData.rollUpSize || '')}</p>
          </>
        )}

        {selectedProduct === "stickers" && (
          <>
            <p><strong>Cantidad:</strong> {formData.stickerCount || "No especificado"}</p>
            <p><strong>Tipo:</strong> {getStickerTypeText(formData.stickerType || '')}</p>
          </>
        )}

        {selectedProduct === "plotter" && (
          <>
            <p><strong>Cantidad:</strong> {formData.plotterCount || "No especificado"}</p>
            <p><strong>Tamaño:</strong> {getPlotterSizeText(formData.plotterSize || '')}</p>
          </>
        )}

        {selectedProduct === "spiderBanner" && (
          <>
            <p><strong>Cantidad:</strong> {formData.spiderBannerCount || "No especificado"}</p>
            <p><strong>Tamaño:</strong> {getSpiderBannerSizeText(formData.spiderBannerSize || '')}</p>
          </>
        )}

        {selectedProduct === "posters" && (
          <>
            <p><strong>Cantidad:</strong> {formData.posterCount || "No especificado"}</p>
            <p><strong>Acabado:</strong> {formData.posterFinish || "No especificado"}</p>
          </>
        )}

        {selectedProduct === "businessCards" && (
          <>
            <p><strong>Cantidad:</strong> {formData.businessCardCount || "No especificado"}</p>
            <p><strong>Acabado:</strong> {getBusinessCardFinishText(formData.businessCardFinish || '')}</p>
          </>
        )}

        {selectedProduct === "flyers" && (
          <>
            <p><strong>Cantidad:</strong> {formData.flyerCount || "No especificado"}</p>
            <p><strong>Tipo:</strong> {getFlyerTypeText(formData.flyerType || '')}</p>
          </>
        )}

        {selectedProduct === "dtfUv" && (
          <>
            <p><strong>Ancho (cm):</strong> {formData.dtfUvWidth || "No especificado"}</p>
            <p><strong>Alto (cm):</strong> {formData.dtfUvHeight || "No especificado"}</p>
          </>
        )}

        {selectedProduct === "magnetSheet" && (
          <>
            <p><strong>Ancho (cm):</strong> {formData.magnetSheetWidth || "No especificado"}</p>
            <p><strong>Alto (cm):</strong> {formData.magnetSheetHeight || "No especificado"}</p>
          </>
        )}

        {selectedProduct === "photocopies" && (
          <>
            <p><strong>Cantidad:</strong> {formData.photocopiesCount || "No especificado"}</p>
            <p><strong>Tipo de Impresión:</strong></p>
            <p className="ml-4">{getPrintTypeText(formData.printType || '')}</p>
          </>
        )}

        {calculations.unitPrice !== undefined && 
         selectedProduct !== "dtfUv" && 
         selectedProduct !== "pendones" && 
         selectedProduct !== "retablos" &&
         selectedProduct !== "magnetSheet" &&
         selectedProduct !== "photocopies" && (
          <p><strong>Valor Unitario:</strong> {formatCurrency(calculations.unitPrice)}</p>
        )}
        
        <p><strong>Total:</strong> {formatCurrency(calculations.total)}</p>
        <p><strong>Abono:</strong> {formatCurrency(parseInt(formData.deposit) || 0)}</p>
        <p><strong>Diseño:</strong> {formatCurrency(parseInt(formData.design) || 0)}</p>
        <p><strong>Domicilio:</strong> {formatCurrency(parseInt(formData.delivery) || 0)}</p>
        <p><strong>Saldo Pendiente:</strong> {formatCurrency(calculations.balance)}</p>
      </div>

      {formData.address && (
        <div>
          <p><strong>Dirección de Entrega:</strong></p>
          <p className="whitespace-pre-line">{formData.address}</p>
        </div>
      )}
    </div>
  );
}
