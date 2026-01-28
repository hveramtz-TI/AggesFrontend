import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'

/**
 * Exporta solo la sección de conversión de materiales como PDF,
 * agregando márgenes para que el contenido no quede pegado a los bordes.
 */
export const exportOnlyConversionSection = async (
    elementId: string = 'conversion-section',
    fileName: string = 'conversion-materiales'
) => {
    const element = document.getElementById(elementId)
    if (!element) return

    try {
        // Ocultar elementos no exportables
        const noExportElements = element.querySelectorAll('.no-export')
        noExportElements.forEach(el => {
            (el as HTMLElement).style.display = 'none'
        })

        const dataUrl = await toPng(element, {
            cacheBust: true,
            backgroundColor: '#f8f9fa',
        })

        // Restaurar elementos ocultos
        noExportElements.forEach(el => {
            (el as HTMLElement).style.display = ''
        })

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        })

        // 👉 Márgenes
        const marginTop = 15
        const marginBottom = 15
        const marginX = 10

        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()

        // Solución: obtener dimensiones de la imagen usando un objeto Image
        const img = new window.Image()
        img.src = dataUrl
        await new Promise(resolve => (img.onload = resolve))

        const usableWidth = pageWidth - marginX * 2
        const imgHeight = (img.height * usableWidth) / img.width

        const maxHeight = pageHeight - marginTop - marginBottom
        const finalHeight = Math.min(imgHeight, maxHeight)

        pdf.addImage(
            dataUrl,
            'PNG',
            marginX,
            marginTop,
            usableWidth,
            finalHeight
        )

        pdf.save(`${fileName}.pdf`)
    } catch (error) {
        console.error('Error al exportar la sección de conversión:', error)
    }
}
/**
 * Captura un elemento del DOM y lo descarga como PDF multipágina,
 * con márgenes superiores e inferiores.
 */
export const exportToPDF = async (
    elementId: string,
    fileName: string = 'informe-agges'
) => {
    const element = document.getElementById(elementId)
    if (!element) return

    // Ajustes temporales para overflow y tablas
    const overflowDivs = Array.from(
        element.querySelectorAll('.overflow-x-auto')
    ) as HTMLElement[]

    const originalOverflow = overflowDivs.map(div => div.style.overflowX)
    overflowDivs.forEach(div => (div.style.overflowX = 'visible'))

    const tables = Array.from(element.querySelectorAll('table')) as HTMLElement[]
    const originalWidths = tables.map(table => table.style.width)
    tables.forEach(table => {
        table.style.width = '100%'
        table.style.minWidth = '0'
    })

    try {
        // Ocultar elementos no exportables
        const noExportElements = element.querySelectorAll('.no-export')
        noExportElements.forEach(el => {
            (el as HTMLElement).style.display = 'none'
        })

        const dataUrl = await toPng(element, {
            cacheBust: true,
            backgroundColor: '#f8f9fa',
        })

        noExportElements.forEach(el => {
            (el as HTMLElement).style.display = ''
        })

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        })

        // 👉 Márgenes
        const marginTop = 15
        const marginBottom = 15
        const marginX = 10

        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()

        const usableWidth = pageWidth - marginX * 2
        const usableHeight = pageHeight - marginTop - marginBottom

        const img = new Image()
        img.src = dataUrl
        await new Promise(resolve => (img.onload = resolve))

        const ratio = usableWidth / img.width
        const pageHeightPx = usableHeight / ratio

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('No se pudo crear canvas')

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        let positionY = 0
        let page = 0

        while (positionY < img.height) {
            const pageCanvas = document.createElement('canvas')
            pageCanvas.width = img.width
            pageCanvas.height = Math.min(pageHeightPx, img.height - positionY)

            const pageCtx = pageCanvas.getContext('2d')
            if (!pageCtx) throw new Error('No se pudo crear canvas de página')

            pageCtx.drawImage(
                canvas,
                0,
                positionY,
                img.width,
                pageCanvas.height,
                0,
                0,
                img.width,
                pageCanvas.height
            )

            if (page > 0) pdf.addPage()

            pdf.addImage(
                pageCanvas.toDataURL('image/png'),
                'PNG',
                marginX,
                marginTop,
                usableWidth,
                pageCanvas.height * ratio
            )

            positionY += pageHeightPx
            page++
        }

        pdf.save(`${fileName}.pdf`)
    } catch (error) {
        console.error('Error al generar el PDF:', error)
    } finally {
        // Restaurar estilos
        overflowDivs.forEach((div, i) => {
            div.style.overflowX = originalOverflow[i]
        })
        tables.forEach((table, i) => {
            table.style.width = originalWidths[i]
        })
    }
}