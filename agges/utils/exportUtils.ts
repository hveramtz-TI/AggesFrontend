import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Captura un elemento del DOM y lo descarga como PDF.
 * @param elementId ID del elemento HTML a capturar.
 * @param fileName Nombre del archivo a descargar (sin extensión).
 */
export const exportToPDF = async (elementId: string, fileName: string = 'informe-agges') => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        // Ocultar elementos con la clase 'no-export' temporalmente
        const noExportElements = element.querySelectorAll('.no-export');
        noExportElements.forEach((el) => {
            (el as HTMLElement).style.display = 'none';
        });

        // html-to-image maneja mejor los colores modernos y SVGs
        const dataUrl = await toPng(element, {
            cacheBust: true,
            backgroundColor: '#f8f9fa',
            style: {
                transform: 'scale(1)', // Asegurar escala normal durante captura
            }
        });

        // Restaurar elementos ocultos
        noExportElements.forEach((el) => {
            (el as HTMLElement).style.display = '';
        });

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const imgProps = (pdf as any).getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fileName}.pdf`);
    } catch (error) {
        console.error('Error al generar el PDF:', error);
    }
};

/**
 * Captura un elemento del DOM y lo descarga como Imagen (PNG).
 * @param elementId ID del elemento HTML a capturar.
 * @param fileName Nombre del archivo a descargar.
 */
export const exportToImage = async (elementId: string, fileName: string = 'dashboard-agges') => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const noExportElements = element.querySelectorAll('.no-export');
        noExportElements.forEach((el) => {
            (el as HTMLElement).style.display = 'none';
        });

        const dataUrl = await toPng(element, {
            cacheBust: true,
            backgroundColor: '#f8f9fa',
        });

        noExportElements.forEach((el) => {
            (el as HTMLElement).style.display = '';
        });

        const link = document.createElement('a');
        link.download = `${fileName}.png`;
        link.href = dataUrl;
        link.click();
    } catch (error) {
        console.error('Error al generar la imagen:', error);
    }
};
