// Terms of a website project that appear in texts and in the terms page: correction rounds,
// bug fixing after publication, payment plan, content deadline. Prices and durations of the
// packages are in packages.js, care terms in maintenance.js.
import { HOURLY_RATE } from './maintenance.js'

export const projectTerms = {
  correctionRounds: 2, // included during design and build
  bugfixDays: 30, // after publication, for deviations from the agreed scope
  hourlyRate: HOURLY_RATE, // extra work, announced beforehand
  contentGraceDays: 30, // content missing this long after project start moves the project to the next free slot
  payment: {
    standard: [50, 50], // % at order, % before publication
    individual: [40, 30, 30], // individual projects
  },
}
