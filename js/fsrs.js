/**
 * FSRS-5 (Free Spaced Repetition Scheduler) Implementation
 * Based on the FSRS-5 algorithm with FSRS-4.5 forgetting curve.
 */
(function () {
  'use strict';

  // FSRS-5 default parameters
  const W = [
    0.4072, 1.1829, 3.1262, 15.4722, // w[0]-w[3]: initial stability for grades 1-4
    7.2102,                            // w[4]: initial difficulty baseline
    0.5316,                            // w[5]: initial difficulty grade scaling
    1.0651,                            // w[6]: difficulty mean reversion rate
    0.0234,                            // w[7]: difficulty mean reversion weight
    1.616,                             // w[8]: recall stability base
    0.1544,                            // w[9]: recall stability decay
    1.0824,                            // w[10]: recall stability retrieval
    1.9813,                            // w[11]: forget stability base
    0.0953,                            // w[12]: forget stability difficulty
    0.2975,                            // w[13]: forget stability stability
    2.2042,                            // w[14]: forget stability retrieval
    0.2407,                            // w[15]: hard penalty
    2.9466,                            // w[16]: easy bonus
    0.5034,                            // w[17]: short-term stability base
    0.6567                             // w[18]: short-term stability grade offset
  ];

  const DECAY = -0.5;
  const FACTOR = 19 / 81;
  const DEFAULT_TARGET_RETENTION = 0.85;

  // --- Core formulas ---

  /** Initial stability for a given grade (1-4) on first review. */
  function initialStability(grade) {
    return W[grade - 1];
  }

  /** Initial difficulty for a given grade (1-4) on first review. */
  function initialDifficulty(grade) {
    return clampD(W[4] - Math.exp(W[5] * (grade - 1)) + 1);
  }

  /** Updated difficulty after a review. */
  function nextDifficulty(D, grade) {
    var d0_4 = W[4] - Math.exp(W[5] * 3) + 1; // D_0(4)
    var newD = W[7] * d0_4 + (1 - W[7]) * (D - W[6] * (grade - 3));
    return clampD(newD);
  }

  /** Clamp difficulty to [1, 10]. */
  function clampD(d) {
    return Math.max(1, Math.min(10, d));
  }

  /**
   * Recall probability (forgetting curve).
   * R(t, S) = (1 + FACTOR * t / S) ^ DECAY
   * @param {number} elapsedDays - days since last review
   * @param {number} S - stability in days
   */
  function recallProbability(elapsedDays, S) {
    if (S <= 0) return 1;
    if (elapsedDays <= 0) return 1;
    return Math.pow(1 + FACTOR * elapsedDays / S, DECAY);
  }

  /**
   * Next interval from desired retention and stability.
   * I(r, S) = S / FACTOR * (r^(1/DECAY) - 1)
   * @param {number} targetRetention - desired recall probability (e.g., 0.85)
   * @param {number} S - stability in days
   */
  function nextInterval(targetRetention, S) {
    if (S <= 0) return 0;
    var interval = S / FACTOR * (Math.pow(targetRetention, 1 / DECAY) - 1);
    return Math.max(1, Math.round(interval));
  }

  /**
   * Stability after successful recall (grade 2, 3, or 4).
   * S'_r(D, S, R, G) = S * (e^w[8] * (11-D) * S^(-w[9]) * (e^(w[10]*(1-R)) - 1) * hardPenalty * easyBonus + 1)
   */
  function stabilityAfterRecall(D, S, R, grade) {
    var hardPenalty = (grade === 2) ? W[15] : 1;
    var easyBonus = (grade === 4) ? W[16] : 1;
    var newS = S * (
      Math.exp(W[8]) *
      (11 - D) *
      Math.pow(S, -W[9]) *
      (Math.exp(W[10] * (1 - R)) - 1) *
      hardPenalty *
      easyBonus +
      1
    );
    return newS;
  }

  /**
   * Stability after forgetting (grade 1, lapse).
   * S'_f(D, S, R) = w[11] * D^(-w[12]) * ((S+1)^w[13] - 1) * e^(w[14]*(1-R))
   */
  function stabilityAfterForgetting(D, S, R) {
    return W[11] *
      Math.pow(D, -W[12]) *
      (Math.pow(S + 1, W[13]) - 1) *
      Math.exp(W[14] * (1 - R));
  }

  /**
   * Short-term stability for same-day re-review after failure.
   * S'(S, G) = S * e^(w[17] * (G - 3 + w[18]))
   */
  function shortTermStability(S, grade) {
    return S * Math.exp(W[17] * (grade - 3 + W[18]));
  }

  // --- Helper ---

  function daysBetween(dateA, dateB) {
    var a = (typeof dateA === 'string') ? new Date(dateA) : dateA;
    var b = (typeof dateB === 'string') ? new Date(dateB) : dateB;
    return (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24);
  }

  function toISOString(date) {
    if (typeof date === 'string') return date;
    return date.toISOString();
  }

  // --- Public API ---

  var FSRS = {
    defaultTargetRetention: DEFAULT_TARGET_RETENTION,
    W: W,
    DECAY: DECAY,
    FACTOR: FACTOR,

    /**
     * Returns a new card in the initial state.
     */
    getInitialCard: function () {
      return {
        state: 'new',
        S: 0,
        D: 0,
        R: 1,
        lastReview: null,
        scheduledDays: 0,
        reps: 0,
        lapses: 0
      };
    },

    /**
     * Process a review for a card.
     * @param {Object} card - the card object
     * @param {number} grade - 1=Again, 2=Hard, 3=Good, 4=Easy
     * @param {Date|string} [now] - current time (defaults to now)
     * @returns {Object} updated card (new object, does not mutate input)
     */
    reviewCard: function (card, grade, now) {
      now = now || new Date();
      if (typeof now === 'string') now = new Date(now);
      grade = Math.max(1, Math.min(4, Math.round(grade)));

      var updated = {
        state: card.state,
        S: card.S,
        D: card.D,
        R: card.R,
        lastReview: card.lastReview,
        scheduledDays: card.scheduledDays,
        reps: card.reps,
        lapses: card.lapses
      };

      var targetRetention = DEFAULT_TARGET_RETENTION;

      if (card.state === 'new') {
        // First review: use initial formulas
        updated.S = initialStability(grade);
        updated.D = initialDifficulty(grade);
        updated.reps = 1;
        updated.lastReview = toISOString(now);

        if (grade === 1) {
          updated.state = 'learning';
          updated.lapses = (card.lapses || 0) + 1;
          updated.scheduledDays = 0; // review again same day
        } else {
          updated.state = 'review';
          updated.scheduledDays = nextInterval(targetRetention, updated.S);
        }

        updated.R = 1;
        updated.scheduledDate = toISOString(
          new Date(now.getTime() + updated.scheduledDays * 24 * 60 * 60 * 1000)
        );
        return updated;
      }

      // Existing card (learning or review)
      var elapsedDays = card.lastReview ? daysBetween(card.lastReview, now) : 0;
      var R = (card.S > 0 && elapsedDays > 0)
        ? recallProbability(elapsedDays, card.S)
        : 1;

      updated.reps = card.reps + 1;
      updated.D = nextDifficulty(card.D, grade);

      if (grade === 1) {
        // Lapse: forgot the card
        updated.lapses = (card.lapses || 0) + 1;
        updated.state = 'learning';

        if (card.state === 'learning' && elapsedDays < 1) {
          // Same-day re-review after failure: use short-term stability
          updated.S = shortTermStability(card.S, grade);
        } else {
          updated.S = stabilityAfterForgetting(card.D, card.S, R);
        }

        // Minimum stability floor
        updated.S = Math.max(updated.S, 0.01);
        updated.scheduledDays = 0; // review again same day
      } else {
        // Successful recall (grade 2, 3, 4)
        updated.state = 'review';

        if (card.state === 'learning' && elapsedDays < 1) {
          // Same-day review in learning: use short-term stability
          updated.S = shortTermStability(card.S, grade);
        } else {
          updated.S = stabilityAfterRecall(card.D, card.S, R, grade);
        }

        updated.scheduledDays = nextInterval(targetRetention, updated.S);
      }

      updated.R = 1; // just reviewed
      updated.lastReview = toISOString(now);
      updated.scheduledDate = toISOString(
        new Date(now.getTime() + updated.scheduledDays * 24 * 60 * 60 * 1000)
      );

      return updated;
    },

    /**
     * Get the current recall probability for a card.
     * @param {Object} card
     * @param {Date|string} [now]
     * @returns {number} recall probability [0, 1]
     */
    getRecallProbability: function (card, now) {
      if (card.state === 'new' || !card.lastReview || card.S <= 0) return 1;
      now = now || new Date();
      var elapsedDays = daysBetween(card.lastReview, now);
      if (elapsedDays <= 0) return 1;
      return recallProbability(elapsedDays, card.S);
    },

    /**
     * Get the number of days until the next review for given target retention.
     * @param {Object} card
     * @param {number} [targetRetention]
     * @returns {number} days
     */
    getNextInterval: function (card, targetRetention) {
      targetRetention = targetRetention || DEFAULT_TARGET_RETENTION;
      if (card.S <= 0) return 0;
      return nextInterval(targetRetention, card.S);
    },

    /**
     * Filter cards that are due for review.
     * A card is due if it is new, or if its recall probability has dropped
     * to or below the target retention.
     * @param {Array} cards
     * @param {Date|string} [now]
     * @param {number} [targetRetention]
     * @returns {Array} cards that are due
     */
    getDueCards: function (cards, now, targetRetention) {
      now = now || new Date();
      targetRetention = targetRetention || DEFAULT_TARGET_RETENTION;
      var self = this;
      return cards.filter(function (card) {
        if (card.state === 'new') return true;
        if (card.state === 'learning') return true;
        var R = self.getRecallProbability(card, now);
        return R <= targetRetention;
      });
    },

    // Expose internal functions for testing/advanced use
    _initialStability: initialStability,
    _initialDifficulty: initialDifficulty,
    _nextDifficulty: nextDifficulty,
    _recallProbability: recallProbability,
    _nextInterval: nextInterval,
    _stabilityAfterRecall: stabilityAfterRecall,
    _stabilityAfterForgetting: stabilityAfterForgetting,
    _shortTermStability: shortTermStability
  };

  // Export
  if (typeof window !== 'undefined') {
    window.FSRS = FSRS;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = FSRS;
  }
})();
