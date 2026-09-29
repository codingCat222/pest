"use strict";
// Eligibility has no dedicated DB table — it's a stateless rules check run
// against the pest + postcode the customer provides, before a Case exists.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityService = void 0;
// Pests the free-product program currently covers. Adjust as the business rules evolve.
const QUALIFYING_PESTS = ['rats', 'mice', 'wasps', 'ants', 'cockroaches', 'bed bugs'];
// Simple UK postcode sanity check (not a full validator, just format-level).
const POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
exports.EligibilityService = {
    async check(data) {
        const pest = data.pest?.trim().toLowerCase();
        const postcode = data.postcode?.trim();
        if (!pest || !postcode) {
            return {
                eligible: false,
                reason: 'Both pest type and postcode are required',
                qualifyingPests: QUALIFYING_PESTS,
            };
        }
        if (!POSTCODE_REGEX.test(postcode)) {
            return {
                eligible: false,
                reason: 'Postcode format looks invalid',
                qualifyingPests: QUALIFYING_PESTS,
            };
        }
        const pestQualifies = QUALIFYING_PESTS.includes(pest);
        return {
            eligible: pestQualifies,
            reason: pestQualifies ? undefined : 'This pest type is not currently covered by the free product program',
            qualifyingPests: QUALIFYING_PESTS,
        };
    },
};
