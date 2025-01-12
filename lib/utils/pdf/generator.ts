import { jsPDF } from 'jspdf'
import type {
  PDFGeneratorOptions,
  PDFGeneratorResult,
  PDFGenerationStats,
  PDFGenerationErrorType,
  PDFGenerationErrorDetails
} from './types'

export class PDFGenerationError extends Error {
  constructor(
    message: string,
    public details: PDFGenerationErrorDetails,
    public cause?: Error
  ) {
    super(message)
    this.name = 'PDFGenerationError'
    Object.setPrototypeOf(this, PDFGenerationError.prototype)
  }
}

function createErrorDetails(
  type: PDFGenerationErrorType,
  message: string,
  context?: Record<string, unknown>
): PDFGenerationErrorDetails {
  return {
    type,
    message,
    code: `PDF_${type}`,
    timestamp: new Date(),
    context
  }
}

export async function generateMeetingPDF(options: PDFGeneratorOptions): Promise<PDFGeneratorResult> {
  const startTime = Date.now()
  let stats: PDFGenerationStats | undefined
  
  try {
    const doc = new jsPDF()
    const now = new Date()
    
    // Set metadata
    doc.setProperties({
      title: options.title,
      author: 'Florida Grande HOA',
      subject: `${options.type === 'agenda' ? 'Meeting Agenda' : 'Meeting Minutes'} - ${options.date}`,
      creator: 'Florida Grande HOA Document System',
      producer: 'Florida Grande HOA',
      keywords: ['meeting', options.type, 'florida grande', 'hoa'].join(','),
      created: now.toISOString(),
      modified: now.toISOString()
    })
    
    // Header
    doc.setFontSize(20)
    doc.text('Florida Grande HOA', 105, 20, { align: 'center' })
    doc.setFontSize(16)
    doc.text(`${options.type === 'agenda' ? 'Meeting Agenda' : 'Meeting Minutes'}`, 105, 30, { align: 'center' })
    
    // Meeting details
    doc.setFontSize(12)
    doc.text([
      `Date: ${new Date(options.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}`,
      `Time: ${options.startTime} - ${options.endTime}`,
      `Location: ${options.location}`
    ], 20, 45)
    
    let yPos = 70
    
    // Attendees
    if (options.attendees?.length) {
      doc.setFontSize(14)
      doc.text('Attendees:', 20, yPos)
      doc.setFontSize(12)
      yPos += 10
      options.attendees.forEach(attendee => {
        if (yPos > 270) {
          doc.addPage()
          yPos = 20
        }
        doc.text(`• ${attendee}`, 30, yPos)
        yPos += 7
      })
      yPos += 10
    }
    
    // Agenda
    if (options.agenda?.length) {
      doc.setFontSize(14)
      doc.text('Agenda:', 20, yPos)
      doc.setFontSize(12)
      yPos += 10
      options.agenda.forEach((item, index) => {
        const lines = doc.splitTextToSize(item, 170)
        lines.forEach((line: string) => {
          if (yPos > 270) {
            doc.addPage()
            yPos = 20
          }
          doc.text(`${index + 1}. ${line}`, 30, yPos)
          yPos += 7
        })
        yPos += 3
      })
      yPos += 10
    }
    
    // Minutes
    if (options.type === 'minutes' && options.minutes?.length) {
      doc.setFontSize(14)
      doc.text('Minutes:', 20, yPos)
      doc.setFontSize(12)
      yPos += 10
      options.minutes.forEach(minute => {
        const lines = doc.splitTextToSize(minute, 170)
        lines.forEach((line: string) => {
          if (yPos > 270) {
            doc.addPage()
            yPos = 20
          }
          doc.text(`• ${line}`, 30, yPos)
          yPos += 7
        })
        yPos += 3
      })
      yPos += 10
    }
    
    // Voting Record
    if (options.voting_record?.length) {
      doc.setFontSize(14)
      doc.text('Voting Record:', 20, yPos)
      doc.setFontSize(12)
      yPos += 10
      
      options.voting_record.forEach(record => {
        if (yPos > 270) {
          doc.addPage()
          yPos = 20
        }
        
        // Motion
        const motionLines = doc.splitTextToSize(`Motion: ${record.motion}`, 170)
        motionLines.forEach((line: string) => {
          doc.text(line, 30, yPos)
          yPos += 7
        })
        
        // Vote counts
        const votes = {
          yes: record.votes.filter(v => v.vote === 'yes').length,
          no: record.votes.filter(v => v.vote === 'no').length,
          abstain: record.votes.filter(v => v.vote === 'abstain').length
        }
        
        doc.text([
          `Yes: ${votes.yes}`,
          `No: ${votes.no}`,
          `Abstain: ${votes.abstain}`
        ], 40, yPos)
        
        yPos += 15
      })
    }
    
    // Footer with page numbers and timestamp
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(10)
      doc.text(
        `Page ${i} of ${pageCount} | Generated on ${now.toLocaleString('en-US')}`,
        105,
        290,
        { align: 'center' }
      )
    }
    
    // Generate PDF buffer
    const buffer = Buffer.from(doc.output('arraybuffer'))
    
    // Calculate stats
    stats = {
      pageCount,
      fileSize: buffer.length,
      generationTime: Date.now() - startTime,
      createdAt: now
    }
    
    // Generate filename
    const fileName = `${options.type}_${new Date(options.date).toISOString().split('T')[0]}.pdf`
    
    return {
      buffer,
      metadata: {
        title: options.title,
        author: 'Florida Grande HOA',
        subject: `${options.type === 'agenda' ? 'Meeting Agenda' : 'Meeting Minutes'} - ${options.date}`,
        keywords: ['meeting', options.type, 'florida grande', 'hoa'],
        creationDate: now,
        modificationDate: now,
        fileName,
        contentType: 'application/pdf',
        contentLength: buffer.length
      }
    }
  } catch (error) {
    const errorDetails = createErrorDetails(
      error instanceof Error ? 'GENERATION_FAILED' : 'UNKNOWN_ERROR',
      'Failed to generate PDF document',
      {
        options,
        stats,
        error: error instanceof Error ? { 
          name: error.name,
          message: error.message,
          stack: error.stack
        } : String(error)
      }
    )
    
    throw new PDFGenerationError(
      'Failed to generate PDF document',
      errorDetails,
      error instanceof Error ? error : new Error(String(error))
    )
  }
} 