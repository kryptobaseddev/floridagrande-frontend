import { z } from 'zod'
import Papa from 'papaparse'
import { createServiceError } from '@/lib/core/utils/errors'

const SERVICE_DOMAIN = 'csv-parser'

/** CSV column mapping configuration */
export interface CsvColumnMapping {
  firstName: string
  lastName: string
  email: string
  phone?: string
  [key: string]: string | undefined
}

/** Default column mapping */
export const defaultColumnMapping: CsvColumnMapping = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  phone: 'Phone'
}

/** CSV row validation schema */
const csvRowSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional()
})

export type CsvProfileData = z.infer<typeof csvRowSchema>

/** CSV parsing options */
export interface CsvParseOptions {
  columnMapping?: Partial<CsvColumnMapping>
  skipFirstRow?: boolean
  chunkSize?: number
}

/** CSV parsing result */
export interface CsvParseResult {
  profiles: CsvProfileData[]
  errors: Array<{
    row: number
    errors: string[]
  }>
  totalRows: number
  validRows: number
}

/**
 * Parses and validates CSV data for bulk profile updates
 * @param csvData Raw CSV string data
 * @param options Parsing options
 * @returns Parsed and validated profile data
 */
export function parseCsvProfiles(
  csvData: string,
  options: CsvParseOptions = {}
): CsvParseResult {
  const {
    columnMapping = defaultColumnMapping,
    skipFirstRow = true,
    chunkSize = 1000
  } = options

  try {
    // Parse CSV data
    const parseResult = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transform: (value: string) => value.trim()
    })

    if (parseResult.errors.length > 0) {
      throw createServiceError({
        domain: SERVICE_DOMAIN,
        operation: 'parseCsvProfiles',
        code: 'CSV_PARSE_ERROR',
        message: 'Failed to parse CSV data',
        context: {
          parseErrors: parseResult.errors
        }
      })
    }

    const result: CsvParseResult = {
      profiles: [],
      errors: [],
      totalRows: parseResult.data.length,
      validRows: 0
    }

    // Process rows in chunks
    for (let i = skipFirstRow ? 1 : 0; i < parseResult.data.length; i += chunkSize) {
      const chunk = parseResult.data.slice(i, i + chunkSize)
      
      chunk.forEach((row: unknown, index: number) => {
        try {
          if (typeof row !== 'object' || !row) {
            throw new Error('Invalid row data')
          }

          const rowData = row as Record<string, string>
          
          // Map columns to profile data
          const profileData = {
            firstName: rowData[columnMapping.firstName ?? ''],
            lastName: rowData[columnMapping.lastName ?? ''],
            email: rowData[columnMapping.email ?? ''],
            phone: columnMapping.phone ? rowData[columnMapping.phone] : undefined,
            metadata: {} as Record<string, unknown>
          }

          // Add any additional columns to metadata
          Object.entries(rowData).forEach(([key, value]) => {
            const mappedValues = Object.values(columnMapping)
            if (!mappedValues.includes(key)) {
              profileData.metadata[key] = value
            }
          })

          // Validate the profile data
          const validatedData = csvRowSchema.parse(profileData)
          result.profiles.push(validatedData)
          result.validRows++
        } catch (error) {
          if (error instanceof z.ZodError) {
            result.errors.push({
              row: i + index + 1,
              errors: error.errors.map(e => e.message)
            })
          }
        }
      })
    }

    return result
  } catch (error) {
    throw createServiceError({
      domain: SERVICE_DOMAIN,
      operation: 'parseCsvProfiles',
      code: 'CSV_PARSE_ERROR',
      message: 'Failed to parse CSV data',
      context: {
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    })
  }
}

/**
 * Generates a CSV template for bulk profile updates
 * @param columnMapping Custom column mapping
 * @returns CSV template string
 */
export function generateCsvTemplate(
  columnMapping: CsvColumnMapping = defaultColumnMapping
): string {
  const headers = Object.values(columnMapping).filter(Boolean)
  return Papa.unparse([headers])
}

/**
 * Validates a single row of profile data
 * @param data Profile data to validate
 * @returns Validated profile data
 */
export function validateProfileData(
  data: unknown
): CsvProfileData {
  return csvRowSchema.parse(data)
} 