import type { DocumentMetadata } from '@/lib/core/documents'

export interface PDFGeneratorOptions {
  type: 'agenda' | 'minutes'
  title: string
  date: string // ISO date string
  startTime: string // HH:MM format
  endTime: string // HH:MM format
  location: string
  attendees: string[] // Array of attendee names
  minutes?: string[] // Array of minute entries
  agenda?: string[] // Array of agenda items
  // voting_record?: DocumentMetadata['voting_record']
}

export interface PDFGeneratorResult {
  buffer: Buffer
  metadata: {
    title: string
    author: string
    subject: string
    keywords: string[]
    creationDate: Date
    modificationDate: Date
    fileName?: string // Optional filename for download
    contentType: 'application/pdf'
    contentLength: number // Size in bytes
  }
}

export interface PDFGenerationStats {
  pageCount: number
  fileSize: number
  generationTime: number // in milliseconds
  createdAt: Date
}

// Error types
export type PDFGenerationErrorType = 
  | 'INVALID_INPUT'
  | 'GENERATION_FAILED'
  | 'FILE_SYSTEM_ERROR'
  | 'MEMORY_ERROR'
  | 'UNKNOWN_ERROR'

export interface PDFGenerationErrorDetails {
  type: PDFGenerationErrorType
  message: string
  code?: string
  timestamp: Date
  context?: Record<string, unknown>
} 