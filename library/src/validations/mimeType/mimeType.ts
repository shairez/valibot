import type { ErrorMessage, PipeResult } from '../../types.ts';
import { getOutput, getPipeIssues } from '../../utils/index.ts';

/**
 * Creates a validation function that validates the MIME type of a file.
 *
 * @param requirement The MIME types.
 * @param error The error message.
 *
 * @returns A validation function.
 */
export function mimeType<
  TInput extends Blob,
  const TRequirement extends `${string}/${string}`[]
>(requirement: TRequirement, error?: ErrorMessage) {
  return {
    kind: 'mime_type' as const,
    message: error ?? 'Invalid MIME type',
    requirement,
    _parse(input: TInput): PipeResult<TInput> {
      return !requirement.includes(input.type as `${string}/${string}`)
        ? getPipeIssues(this.kind, this.message, input)
        : getOutput(input);
    },
  };
}
