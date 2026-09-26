import { prisma } from '../lib/prisma';

/**
 * Generates a unique reference number in format FP-XXXXX
 */
export async function generateReferenceNumber(): Promise<string> {
  const prefix = 'FP';
  let ref: string;
  let exists = true;

  do {
    const num = Math.floor(10000 + Math.random() * 90000);
    ref = `${prefix}-${num}`;
    const count = await prisma.case.count({ where: { referenceNumber: ref } });
    exists = count > 0;
  } while (exists);

  return ref;
}
