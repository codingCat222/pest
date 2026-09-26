import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const eligibilitySchema = z.object({
  pest:             z.string(),
  activityLocation: z.string(),
  duration:         z.string(),
  sightings:        z.array(z.string()).min(1),
  fullName:         z.string().min(2),
  email:            z.string().email(),
  phone:            z.string().min(10),
  address:          z.string().min(5),
  postcode:         z.string().min(5),
});

// POST /api/v1/eligibility
export async function submitEligibility(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = eligibilitySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten() });
    }

    const { pest, activityLocation, duration, fullName, email, phone, address, postcode } = parsed.data;

    // Check if this postcode has been approved before (simple rule)
    const approved = true; // TODO: add real eligibility logic (e.g. postcode lookup)

    const submission = await prisma.eligibilitySubmission.create({
      data: {
        pest:            pest as any,
        activityLocation: activityLocation as any,
        duration:        duration as any,
        fullName,
        email,
        phone,
        address,
        postcode,
        approved,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        approved,
        submissionId: submission.id,
        message: approved
          ? 'You are eligible! Proceed to claim your free product.'
          : 'Thank you. Your eligibility is being reviewed.',
      },
    });
  } catch (err) {
    next(err);
  }
}
