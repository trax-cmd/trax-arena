// TRAX WAVE MAP — authored in wave-maker.html. 31 waves.
// Drop this beside index.html (and in double-jump/) and reload. Nothing else to do.
// Waves past the last authored one fall back to the engine's own composer.
// (v1.6.1569) THE SOFT WAVES, his order 2026-09-19 ('author in some more soft waves before the difficulty begins to scale'): waves 1-3 are the soft street,
//   flagged soft: true - three popcorn and a drone, then a dealer, then a platinum - and his 28 authored waves follow as 4-31 unchanged. The engine's
//   difficulty curves read the wave PAST the soft ones (wcurveN), so his first authored fight (wave 4) is exactly the fight wave 1 was.
window.TRAX_WAVE_MAP = {
 "format": "trax-wave-map",
 "version": 2,
 "authored": 31,
 "waves": [
  {
   "wave": 1,
   "abs": {
    "pop": 3,
    "drone": 1
   },
   "window": 12,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "soft": true
  },
  {
   "wave": 2,
   "abs": {
    "pop": 5,
    "drone": 2,
    "dealer": 1
   },
   "window": 12,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "soft": true
  },
  {
   "wave": 3,
   "abs": {
    "pop": 6,
    "dealer": 2,
    "drone": 2,
    "plat": 1
   },
   "window": 10,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "soft": true
  },
  {
   "wave": 4,
   "abs": {
    "pop": 5,
    "dealer": 2,
    "drone": 1,
    "grudge": 1,
    "plat": 1
   },
   "window": 8,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0
  },
  {
   "wave": 5,
   "abs": {
    "pop": 7,
    "dealer": 2,
    "jack": 2,
    "drone": 1,
    "grudge": 1,
    "plat": 2
   },
   "window": 8,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0
  },
  {
   "wave": 6,
   "abs": {
    "pop": 7,
    "dealer": 3,
    "jack": 3,
    "drone": 2,
    "grudge": 1,
    "plat": 3
   },
   "window": 8,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0
  },
  {
   "wave": 7,
   "abs": {
    "pop": 15,
    "dealer": 5,
    "jack": 3,
    "drone": 6,
    "grudge": 3,
    "plat": 5,
    "rabbi": 1,
    "jetf": 2
   },
   "window": 8,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.1
  },
  {
   "wave": 8,
   "abs": {
    "pop": 15,
    "jack": 4,
    "rival": 3,
    "drone": 10,
    "grudge": 3,
    "plat": 4,
    "rabbi": 3,
    "jetf": 6
   },
   "window": 8,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0
  },
  {
   "wave": 9,
   "abs": {
    "pop": 19,
    "dealer": 7,
    "jack": 3,
    "twins": 1,
    "drone": 5,
    "grudge": 5,
    "machine": 1,
    "plat": 4,
    "rabbi": 2,
    "lion": 2,
    "jetf": 10
   },
   "window": 8,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.15
  },
  {
   "wave": 10,
   "abs": {
    "pop": 18,
    "dealer": 9,
    "jack": 6,
    "twins": 2,
    "drone": 14,
    "grudge": 6,
    "machine": 2,
    "plat": 10,
    "rabbi": 3,
    "lion": 4,
    "jetf": 13
   },
   "window": 13,
   "shape": "even",
   "elitePct": 10,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.2,
   "boss": "THE PERCH BOSS"
  },
  {
   "wave": 11,
   "abs": {
    "pop": 25,
    "dealer": 11,
    "jack": 9,
    "twins": 3,
    "drone": 13,
    "grudge": 10,
    "machine": 4,
    "plat": 3,
    "rabbi": 5,
    "lion": 2,
    "jetf": 15
   },
   "window": 27,
   "shape": "crescendo",
   "elitePct": 10,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.3,
   "event": "FIRST BLOOD"
  },
  {
   "wave": 12,
   "abs": {
    "pop": 100,
    "drone": 20,
    "grudge": 30,
    "machine": 5,
    "plat": 12,
    "rabbi": 9,
    "lion": 2,
    "jetf": 18
   },
   "window": 46,
   "shape": "crescendo",
   "elitePct": 10,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.4
  },
  {
   "wave": 13,
   "abs": {
    "pop": 61,
    "drone": 33,
    "grudge": 19,
    "machine": 5,
    "plat": 19,
    "rabbi": 14,
    "lion": 5,
    "jetf": 23
   },
   "window": 48,
   "shape": "crescendo",
   "elitePct": 10,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.35,
   "tear": {
    "n": 1,
    "hp": 70,
    "cap": 40,
    "gout": 10,
    "fam": "pop"
   },
   "boss": "THE REFLECTION",
   "event": "BRAWL"
  },
  {
   "wave": 14,
   "abs": {
    "pop": 21,
    "dealer": 24,
    "jack": 19,
    "twins": 7,
    "grudge": 13,
    "machine": 11,
    "plat": 14,
    "rabbi": 14,
    "lion": 11,
    "jetf": 25
   },
   "window": 49,
   "shape": "crescendo",
   "elitePct": 10,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.4
  },
  {
   "wave": 15,
   "abs": {
    "twins": 6,
    "drone": 51,
    "plat": 45,
    "rabbi": 27,
    "lion": 8,
    "jetf": 30
   },
   "window": 43,
   "shape": "crescendo",
   "elitePct": 14,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.5
  },
  {
   "wave": 16,
   "abs": {
    "pop": 76,
    "dealer": 30,
    "jack": 29,
    "drone": 25,
    "grudge": 35,
    "machine": 16,
    "plat": 44,
    "rabbi": 12,
    "lion": 13,
    "jetf": 17
   },
   "window": 38,
   "shape": "crescendo",
   "elitePct": 10,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.55,
   "event": "THE WALL"
  },
  {
   "wave": 17,
   "abs": {
    "twins": 16,
    "grudge": 30,
    "machine": 29,
    "plat": 33,
    "rabbi": 24,
    "lion": 4,
    "jetf": 19
   },
   "window": 30,
   "shape": "crescendo",
   "elitePct": 21,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.6,
   "tear": {
    "n": 1,
    "hp": 80,
    "cap": 0,
    "gout": 0
   },
   "boss": "THE REFLECTION"
  },
  {
   "wave": 18,
   "abs": {
    "machine": 41,
    "plat": 84,
    "rabbi": 54,
    "lion": 13,
    "jetf": 27
   },
   "window": 60,
   "shape": "crescendo",
   "elitePct": 10,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.75,
   "rich": 1.8
  },
  {
   "wave": 19,
   "abs": {
    "drone": 101,
    "grudge": 35,
    "machine": 16,
    "plat": 44,
    "rabbi": 150,
    "lion": 20,
    "jetf": 22
   },
   "window": 55,
   "shape": "crescendo",
   "elitePct": 30,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 1.8,
   "aggM": 1.15,
   "paragonPct": 13
  },
  {
   "wave": 20,
   "abs": {
    "drone": 500,
    "grudge": 44,
    "machine": 22,
    "plat": 44,
    "rabbi": 19,
    "lion": 24,
    "jetf": 43
   },
   "window": 55,
   "shape": "even",
   "elitePct": 22,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 2,
   "aggM": 1.15,
   "tear": {
    "n": 5,
    "hp": 91,
    "cap": 100,
    "gout": 99
   }
  },
  {
   "wave": 21,
   "abs": {
    "plat": 500,
    "lion": 18,
    "jetf": 35
   },
   "window": 50,
   "shape": "even",
   "elitePct": 15,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 2.05,
   "aggM": 1.3,
   "tear": {
    "n": 2,
    "hp": 121,
    "cap": 97,
    "gout": 27
   },
   "boss": "THE FORGE",
   "event": "THE PRIESTHOOD"
  },
  {
   "wave": 22,
   "abs": {
    "rabbi": 500,
    "lion": 38
   },
   "window": 46,
   "shape": "even",
   "elitePct": 26,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 2,
   "aggM": 1.4,
   "superN": 6,
   "boss": "THE SUMMIT"
  },
  {
   "wave": 23,
   "abs": {
    "pop": 76,
    "dealer": 30,
    "jack": 29,
    "twins": 11,
    "drone": 199,
    "grudge": 62,
    "machine": 27,
    "plat": 48,
    "rabbi": 28,
    "lion": 40,
    "jetf": 39
   },
   "window": 56,
   "shape": "even",
   "elitePct": 30,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 2,
   "aggM": 1.3,
   "boss": "THE LONG DARK",
   "mirror": {
    "n": 3
   }
  },
  {
   "wave": 24,
   "abs": {
    "pop": 76,
    "dealer": 30,
    "jack": 29,
    "twins": 10,
    "drone": 217,
    "grudge": 42,
    "machine": 30,
    "plat": 51,
    "rabbi": 31,
    "lion": 46,
    "jetf": 68
   },
   "window": 49,
   "shape": "even",
   "elitePct": 20,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 3.3,
   "aggM": 1.75
  },
  {
   "wave": 25,
   "abs": {
    "pop": 76,
    "dealer": 30,
    "jack": 29,
    "twins": 14,
    "drone": 230,
    "grudge": 49,
    "machine": 36,
    "plat": 54,
    "rabbi": 39,
    "lion": 42,
    "jetf": 77
   },
   "window": 58,
   "shape": "even",
   "elitePct": 17,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 3.05,
   "aggM": 1.45
  },
  {
   "wave": 26,
   "abs": {
    "pop": 76,
    "dealer": 30,
    "jack": 29,
    "twins": 11,
    "drone": 239,
    "grudge": 56,
    "machine": 44,
    "plat": 70,
    "rabbi": 68,
    "lion": 32,
    "jetf": 46
   },
   "window": 60,
   "shape": "crescendo",
   "elitePct": 20,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 3,
   "aggM": 2.2,
   "event": "THE TEAR"
  },
  {
   "wave": 27,
   "abs": {
    "pop": 156,
    "dealer": 39,
    "jack": 47,
    "twins": 11,
    "drone": 239,
    "grudge": 91,
    "machine": 75,
    "plat": 98,
    "rabbi": 104,
    "lion": 10
   },
   "window": 68,
   "shape": "crescendo",
   "elitePct": 20,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 3,
   "aggM": 2.2
  },
  {
   "wave": 28,
   "abs": {
    "drone": 2000,
    "lion": 100,
    "jetf": 117
   },
   "window": 86,
   "shape": "even",
   "elitePct": 10,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 5.05,
   "aggM": 5,
   "fireG": 5,
   "superN": 5,
   "tear": {
    "n": 5,
    "hp": 2000,
    "cap": 300,
    "gout": 100
   },
   "event": "THE TEAR"
  },
  {
   "wave": 29,
   "abs": {
    "pop": 300,
    "dealer": 100,
    "jack": 60,
    "drone": 600,
    "grudge": 50,
    "machine": 100,
    "plat": 100,
    "rabbi": 100,
    "blimp": 30,
    "lion": 66,
    "jetf": 36
   },
   "window": 90,
   "shape": "even",
   "elitePct": 10,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 3,
   "aggM": 2,
   "fireG": 2,
   "event": "EVERYTHING"
  },
  {
   "wave": 30,
   "abs": {
    "rabbi": 1000,
    "lion": 54,
    "jetf": 95
   },
   "window": 95,
   "shape": "even",
   "elitePct": 50,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 4,
   "aggM": 5,
   "fireG": 2,
   "superN": 5,
   "paragonPct": 30
  },
  {
   "wave": 31,
   "abs": {
    "pop": 300,
    "dealer": 100,
    "jack": 60,
    "drone": 600,
    "grudge": 50,
    "machine": 100,
    "plat": 100,
    "rabbi": 100,
    "blimp": 30,
    "lion": 80,
    "jetf": 106
   },
   "window": 96,
   "shape": "even",
   "elitePct": 10,
   "pilotHearts": 0,
   "heartEvery": 0,
   "heartPrice": 0,
   "hpM": 3,
   "aggM": 2,
   "fireG": 2,
   "event": "EVERYTHING"
  }
 ]
};
