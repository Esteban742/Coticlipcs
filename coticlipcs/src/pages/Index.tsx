import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FileTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProductSelector } from "@/components/ProductSelector";
import { ClientDataForm } from "@/components/ClientDataForm";
import { OrderDetails } from "@/components/OrderDetails";
import { OrderSummary } from "@/components/OrderSummary";
import { bookPrices, plotterPrices, spiderBannerPrices, posterPrices, businessCardPrices, flyerPrices, dtfUvPrices, magnetSheetPrices } from "@/constants/prices";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState("botones");
  const [formData, setFormData] = useState({
    description: "",
    manualTotal: "",
    attendedBy: "",
    client: "",
    whatsapp: "",
    deliveryDate: new Date(),
    deliveryTime: { hour: "12", minute: "00", period: "AM" },
    address: "",
    buttonCount: "",
    mugCount: "",
    design: "0",
    deposit: "0",
    delivery: "0",
    mugType: "simple-1-12",
    carnetType: "1-cara",
    carnetCount: "",
    bookQuantity: "1",
    bookPages: "",
    bookSize: "oficio",
    printType: "una-cara-bn",
    bindingType: "espiral",
    pendonWidth: "",
    pendonHeight: "",
    pendonMaterial: "lona",
    pendonPlastificado: "no",
    pendonOjaletes: "no",
    pendonPerfiles: "no",
    pendonOjaletesCount: "",
    retabloWidth: "",
    retabloHeight: "",
    retabloHook: "no",
    retabloHookCount: "",
    retabloSupport: "no",
    rollUpSize: "160-60",
    rollUpCount: "",
    stickerCount: "",
    stickerType: "plastificado-50x30",
    plotterCount: "",
    plotterSize: "pliego-opalina",
    spiderBannerCount: "",
    spiderBannerSize: "60-160",
    posterCount: "",
    posterFinish: "Ninguno",
    businessCardCount: "",
    businessCardFinish: "",
    flyerCount: "",
    flyerType: "",
    dtfUvWidth: "",
    dtfUvHeight: "",
    magnetSheetWidth: "",
    magnetSheetHeight: "",
    photocopiesCount: "",
  });

  const [calculations, setCalculations] = useState({
    total: 0,
    balance: 0,
    unitPrice: 0
  });

  const handleInputChange = (field: string, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePrice = () => {
    try {
      if (selectedProduct === "libros") {
        const bookQuantity = parseInt(formData.bookQuantity) || 0;
        const bookPages = parseInt(formData.bookPages) || 0;
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!bookQuantity || bookQuantity < 1) {
          toast.error("Por favor ingrese una cantidad válida de libros");
          return;
        }

        if (!bookPages || bookPages < 1) {
          toast.error("Por favor ingrese un número válido de páginas");
          return;
        }

        const pagePrice = bookPrices.pageTypes[formData.bookSize][formData.printType];
        const bindingPrice = bookPrices.binding[formData.bindingType];
        const unitPrice = (pagePrice * bookPages) + bindingPrice;
        const total = (unitPrice * bookQuantity) + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice });
        toast.success("Cálculo realizado con éxito");
      }
      
      if (selectedProduct === "manualOrder") {
        const manualTotal = parseInt(formData.manualTotal) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;
        const design = parseInt(formData.design) || 0;

        if (!manualTotal) {
          toast.error("Por favor ingrese un valor total válido");
          return;
        }

        const total = manualTotal + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice: 0 });
        toast.success("Cálculo realizado con éxito");
      }
      if (selectedProduct === "businessCards") {
        const count = parseInt(formData.businessCardCount);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!count || count < 1) {
          toast.error("Por favor ingrese una cantidad válida de millares");
          return;
        }

        const basePrice = businessCardPrices.finishes[formData.businessCardFinish] || 0;
        const total = count * basePrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice: basePrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "posters") {
        const count = parseInt(formData.posterCount);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!count || count < 1) {
          toast.error("Por favor ingrese una cantidad válida de posters");
          return;
        }

        const basePrice = posterPrices.basePrice;
        const finishPrice = posterPrices.finishes[formData.posterFinish] || 0;
        const unitPrice = basePrice + finishPrice;
        const total = (count * unitPrice) + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "spiderBanner") {
        const count = parseInt(formData.spiderBannerCount);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!count || count < 1) {
          toast.error("Por favor ingrese una cantidad válida");
          return;
        }

        let basePrice;
        switch (formData.spiderBannerSize) {
          case "60-160":
            basePrice = spiderBannerPrices["60-160"];
            break;
          case "80-180":
            basePrice = spiderBannerPrices["80-180"];
            break;
          case "100-200":
            basePrice = spiderBannerPrices["100-200"];
            break;
          default:
            basePrice = spiderBannerPrices["60-160"];
        }

        const total = count * basePrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice: basePrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "plotter") {
        const plotterCount = parseInt(formData.plotterCount);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!plotterCount || plotterCount < 1) {
          toast.error("Por favor ingrese una cantidad válida de impresiones");
          return;
        }

        let basePrice;
        switch (formData.plotterSize) {
          case "pliego-opalina":
            basePrice = plotterPrices["pliego-opalina"];
            break;
          case "pliego-bond":
            basePrice = plotterPrices["pliego-bond"];
            break;
          case "medio-pliego-opalina":
            basePrice = plotterPrices["medio-pliego-opalina"];
            break;
          case "medio-pliego-bond":
            basePrice = plotterPrices["medio-pliego-bond"];
            break;
          default:
            basePrice = plotterPrices["pliego-opalina"];
        }

        const total = plotterCount * basePrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice: basePrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "botones") {
        const buttonCount = parseInt(formData.buttonCount);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!buttonCount || buttonCount < 1) {
          toast.error("Por favor ingrese una cantidad válida de botones");
          return;
        }

        let unitPrice = 2200;
        if (buttonCount >= 12 && buttonCount <= 100) {
          unitPrice = 1700;
        } else if (buttonCount > 100) {
          unitPrice = 1500;
        }

        const total = buttonCount * unitPrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "mugs") {
        const mugCount = parseInt(formData.mugCount);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!mugCount || mugCount < 1) {
          toast.error("Por favor ingrese una cantidad válida de mugs");
          return;
        }

        let unitPrice;
        switch (formData.mugType) {
          case "simple-1-12":
            unitPrice = 16000;
            break;
          case "simple-more-12":
            unitPrice = 13000;
            break;
          case "color-internal":
            unitPrice = 20000;
            break;
          case "silicone-base":
            unitPrice = 28000;
            break;
          case "glitter":
            unitPrice = 25000;
            break;
          case "magic":
            unitPrice = 25000;
            break;
          default:
            unitPrice = 16000;
        }

        const total = mugCount * unitPrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "carnets") {
        const carnetCount = parseInt(formData.carnetCount);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!carnetCount || carnetCount < 1) {
          toast.error("Por favor ingrese una cantidad válida de carnets");
          return;
        }

        let unitPrice;
        switch (formData.carnetType) {
          case "1-cara":
            unitPrice = 6000;
            break;
          case "2-caras":
            unitPrice = 7000;
            break;
          default:
            unitPrice = 6000;
        }

        const total = carnetCount * unitPrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "pendones") {
        const width = parseFloat(formData.pendonWidth);
        const height = parseFloat(formData.pendonHeight);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!width || !height || width < 1 || height < 1) {
          toast.error("Por favor ingrese dimensiones válidas");
          return;
        }

        const area = (width * height) / 10000;
        let basePrice = area * 35000;

        if (formData.pendonPlastificado === "si") {
          basePrice += area * 10000;
        }

        if (formData.pendonOjaletes === "si") {
          const ojaletesCount = parseInt(formData.pendonOjaletesCount) || 0;
          basePrice += ojaletesCount * 1500;
        }

        if (formData.pendonPerfiles === "si") {
          basePrice += 8000;
        }

        basePrice += 5000;

        const total = basePrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice: basePrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "retablos") {
        const width = parseFloat(formData.retabloWidth);
        const height = parseFloat(formData.retabloHeight);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!width || !height || width < 1 || height < 1) {
          toast.error("Por favor ingrese dimensiones válidas");
          return;
        }

        const area = (width * height) / 10000;
        let basePrice = area * 150000;

        if (formData.retabloHook === "si") {
          const hookCount = parseInt(formData.retabloHookCount) || 0;
          basePrice += hookCount * 1000;
        }

        if (formData.retabloSupport === "si") {
          basePrice += 1500;
        }

        basePrice += 10000;

        const total = basePrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice: basePrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "rollup") {
        const rollUpCount = parseInt(formData.rollUpCount);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!rollUpCount || rollUpCount < 1) {
          toast.error("Por favor ingrese una cantidad válida de Roll Ups");
          return;
        }

        let unitPrice;
        switch (formData.rollUpSize) {
          case "160-60":
            unitPrice = 190000;
            break;
          case "200-100":
            unitPrice = 283000;
            break;
          case "200-200":
            unitPrice = 563000;
            break;
          default:
            unitPrice = 190000;
        }

        const total = rollUpCount * unitPrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "stickers") {
        const stickerCount = parseInt(formData.stickerCount);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!stickerCount || stickerCount < 1) {
          toast.error("Por favor ingrese una cantidad válida de stickers");
          return;
        }

        let basePrice = stickerCount * 3000;
        let finishingPrice = 0;

        switch (formData.stickerType) {
          case "plastificado-50x30":
            finishingPrice = stickerCount * 7000;
            break;
          case "plastificado-23x50":
            finishingPrice = stickerCount * 5000;
            break;
          case "ninguno":
            finishingPrice = 0;
            break;
        }

        const total = basePrice + finishingPrice + design;
        const balance = total - deposit + delivery;
        const unitPrice = (basePrice + finishingPrice) / stickerCount;

        setCalculations({ total, balance, unitPrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "flyers") {
        const count = parseInt(formData.flyerCount);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!count || count < 1) {
          toast.error("Por favor ingrese una cantidad válida de millares");
          return;
        }

        const basePrice = flyerPrices.finishes[formData.flyerType] || 0;
        const total = count * basePrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice: basePrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "dtfUv") {
        const width = parseFloat(formData.dtfUvWidth);
        const height = parseFloat(formData.dtfUvHeight);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!width || !height || width < 1 || height < 1) {
          toast.error("Por favor ingrese dimensiones válidas");
          return;
        }

        const areaM2 = (width * height) / 10000;
        const basePrice = dtfUvPrices.basePrice;
        const total = areaM2 * basePrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice: basePrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "magnetSheet") {
        const width = parseFloat(formData.magnetSheetWidth);
        const height = parseFloat(formData.magnetSheetHeight);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!width || !height || width < 1 || height < 1) {
          toast.error("Por favor ingrese dimensiones válidas");
          return;
        }

        const areaM2 = (width * height) / 10000;
        const basePrice = magnetSheetPrices.basePrice;
        const total = areaM2 * basePrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice: basePrice });
        toast.success("Cálculo realizado con éxito");
      } else if (selectedProduct === "photocopies") {
        const photocopiesCount = parseInt(formData.photocopiesCount);
        const design = parseInt(formData.design) || 0;
        const deposit = parseInt(formData.deposit) || 0;
        const delivery = parseInt(formData.delivery) || 0;

        if (!photocopiesCount || photocopiesCount < 1) {
          toast.error("Por favor ingrese una cantidad válida de copias");
          return;
        }

        let basePrice;
        switch (formData.printType) {
          case "carta-1-cara":
            basePrice = 70;
            break;
          case "carta-lxl":
            basePrice = 65;
            break;
          case "oficio-1-cara":
            basePrice = 80;
            break;
          case "oficio-lxl":
            basePrice = 75;
            break;
          case "color-carta-1-cara":
            basePrice = 200;
            break;
          case "color-carta-lxl":
            basePrice = 120;
            break;
          case "color-oficio-1-cara":
            basePrice = 250;
            break;
          case "color-oficio-lxl":
            basePrice = 150;
            break;
          case "laser-color-carta-1-cara":
            basePrice = 500;
            break;
          case "laser-color-carta-lxl":
            basePrice = 450;
            break;
          case "laser-oficio-1-cara":
            basePrice = 600;
            break;
          case "laser-oficio-lxl":
            basePrice = 550;
            break;
          case "laser-media-carta-1-cara":
            basePrice = 280;
            break;
          case "laser-media-carta-lxl":
            basePrice = 230;
            break;
          case "laser-medio-oficio":
            basePrice = 330;
            break;
          default:
            basePrice = 70;
        }

        const total = photocopiesCount * basePrice + design;
        const balance = total - deposit + delivery;

        setCalculations({ total, balance, unitPrice: basePrice });
        toast.success("Cálculo realizado con éxito");
      }
    } catch (error) {
      toast.error("Error al calcular. Verifique los datos ingresados");
    }
  };

  const generatePDF = async () => {
    try {
      toast.info("Generando PDF...");
      
      const tempContainer = document.createElement('div');
      tempContainer.style.padding = '2mm';
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.fontSize = '9pt';
      tempContainer.style.lineHeight = '1.2';
      tempContainer.style.width = '70mm';
      
      const contentWrapper = document.createElement('div');
      contentWrapper.style.display = 'flex';
      contentWrapper.style.flexDirection = 'column';
      contentWrapper.style.width = '100%';
      
      const logoDiv = document.createElement('div');
      logoDiv.style.textAlign = 'center';
      logoDiv.style.marginBottom = '4mm';
      const logo = new Image();
      logo.src = "/lovable-uploads/1f87f9a4-c2a2-415f-b9ef-4f3c9f1b309e.png";
      logo.style.height = '55px';
      logo.style.width = 'auto';
      logo.style.margin = '0 auto';
      await new Promise((resolve) => {
        logo.onload = resolve;
      });
      logoDiv.appendChild(logo);
      contentWrapper.appendChild(logoDiv);

      const summaryElement = document.getElementById('order-summary');
      if (!summaryElement) {
        toast.error("Error al generar el PDF");
        return;
      }
      const summaryContent = summaryElement.cloneNode(true);
      contentWrapper.appendChild(summaryContent);
      
      tempContainer.appendChild(contentWrapper);
      document.body.appendChild(tempContainer);

      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: 'white',
        width: tempContainer.offsetWidth,
        height: tempContainer.offsetHeight
      });

      document.body.removeChild(tempContainer);

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 160]
      });

      const margin = 5;
      const contentWidth = 70;
      const contentHeight = 150;

      const imgAspectRatio = canvas.width / canvas.height;
      let imgWidth = contentWidth;
      let imgHeight = imgWidth / imgAspectRatio;

      if (imgHeight > contentHeight) {
        imgHeight = contentHeight;
        imgWidth = imgHeight * imgAspectRatio;
      }

      const xOffset = margin + (contentWidth - imgWidth) / 2;
      
      pdf.addImage(imgData, 'PNG', xOffset, margin, imgWidth, imgHeight);
      
      const date = new Date().toLocaleDateString('es-CO').replace(/\//g, '-');
      const filename = `Cotizacion_${formData.client || 'Cliente'}_${date}.pdf`;
      
      pdf.save(filename);
      toast.success("PDF generado exitosamente");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Error al generar el PDF");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-center mb-4">
        <img 
          src="/lovable-uploads/75086f5b-8ff2-4026-ac63-fcd911b8aacf.png" 
          alt="Clip'cs Logo" 
          className="h-16 w-auto"
        />
      </div>

      <ProductSelector 
        selectedProduct={selectedProduct}
        onProductChange={setSelectedProduct}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ClientDataForm 
          formData={formData}
          onInputChange={handleInputChange}
        />

        <OrderDetails
          selectedProduct={selectedProduct}
          formData={formData}
          onInputChange={handleInputChange}
          onCalculate={calculatePrice}
        />

        <Card className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <FileTextIcon className="w-5 h-5" />
            Resumen de la Orden
          </h2>
          
          <div id="order-summary" className="space-y-4">
            <OrderSummary
              formData={formData}
              calculations={calculations}
              selectedProduct={selectedProduct}
            />
          </div>

          <Button 
            onClick={generatePDF}
            variant="outline"
            className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white border-red-600 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FileTextIcon className="w-4 h-4" />
            Generar PDF
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Index;