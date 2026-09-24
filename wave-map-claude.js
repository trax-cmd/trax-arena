// TRAX WAVE MAP — authored in wave-maker.html. 40 waves.
// Drop this beside index.html (and in double-jump/) and reload. Nothing else to do.
// Waves past the last authored one fall back to the engine's own composer.
// THE CANDIDATE MAP (2026-09-23) — a second hand's map for him to play, built after studying his 31: a soft street, one new family a wave through 10, the sky opening
//   over 11-17 (the first REFLECTION at 13), the war 18-24 (THE FORGE at 21, the last brawl at 23 - brawls die at 24), the crowd 25-31 with THE REFLECTION at 30, and the madness 32-40 where the count holds near his
//   wave-28 scale and the WINDOW grows (his late-game ruling: the wave-37 madness lasts longer, not denser), the red look authored from 34, THE SUMMIT at 40 as his own
//   sentence - 4,000-plus heavily armored bodies moving fast. hpM is typed on every fight wave (it replaces the engine's curve), aggression climbs from 16, elites 5 -> 50,
//   supers from the swarm at 16, paragons from 24, six tears, two forges, five reflections (FROST 60% at 13, STEEL 90% at 24, BLOOD at 30, two GOLD at 36). Loads in the maker.
window.TRAX_WAVE_MAP = {
 "format": "trax-wave-map",
 "version": 2,
 "authored": 40,
 "waves": [
  {
   "wave": 1,
   "abs": {
    "pop": 4,
    "drone": 1
   },
   "window": 12,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "soft": true
  },
  {
   "wave": 2,
   "abs": {
    "pop": 6,
    "dealer": 1,
    "drone": 2
   },
   "window": 12,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "soft": true
  },
  {
   "wave": 3,
   "abs": {
    "pop": 8,
    "dealer": 2,
    "drone": 3
   },
   "window": 10,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "soft": true
  },
  {
   "wave": 4,
   "abs": {
    "pop": 6,
    "dealer": 2,
    "jack": 2,
    "drone": 2
   },
   "window": 10,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0
  },
  {
   "wave": 5,
   "abs": {
    "pop": 8,
    "dealer": 2,
    "jack": 2,
    "drone": 3,
    "grudge": 2
   },
   "window": 10,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "hpM": 1.05,
   "event": "FIRST BLOOD"
  },
  {
   "wave": 6,
   "abs": {
    "pop": 9,
    "dealer": 3,
    "jack": 3,
    "drone": 3,
    "grudge": 2,
    "plat": 2
   },
   "window": 11,
   "shape": "even",
   "elitePct": 0,
   "pilotHearts": 0,
   "hpM": 1.1
  },
  {
   "wave": 7,
   "abs": {
    "pop": 16,
    "dealer": 6,
    "jack": 6,
    "drone": 5,
    "grudge": 4,
    "plat": 3
   },
   "window": 16,
   "shape": "even",
   "elitePct": 5,
   "pilotHearts": 0,
   "hpM": 1.15
  },
  {
   "wave": 8,
   "abs": {
    "jack": 8,
    "twins": 2,
    "rival": 6
   },
   "window": 14,
   "shape": "even",
   "elitePct": 5,
   "pilotHearts": 0,
   "hpM": 1.2,
   "event": "BRAWL"
  },
  {
   "wave": 9,
   "abs": {
    "pop": 16,
    "dealer": 5,
    "jack": 5,
    "drone": 8,
    "grudge": 4,
    "machine": 8,
    "plat": 4
   },
   "window": 18,
   "shape": "even",
   "elitePct": 5,
   "pilotHearts": 0,
   "hpM": 1.25
  },
  {
   "wave": 10,
   "abs": {
    "pop": 20,
    "dealer": 6,
    "jack": 8,
    "twins": 3,
    "drone": 10,
    "grudge": 6,
    "machine": 12,
    "plat": 6
   },
   "window": 22,
   "shape": "crescendo",
   "elitePct": 8,
   "pilotHearts": 0,
   "hpM": 1.3,
   "event": "THE WALL"
  },
  {
   "wave": 11,
   "abs": {
    "pop": 24,
    "dealer": 6,
    "jack": 8,
    "drone": 14,
    "grudge": 6,
    "machine": 8,
    "plat": 8,
    "rabbi": 4
   },
   "window": 26,
   "shape": "even",
   "elitePct": 8,
   "pilotHearts": 0,
   "hpM": 1.4
  },
  {
   "wave": 12,
   "abs": {
    "pop": 36,
    "dealer": 10,
    "jack": 10,
    "drone": 20,
    "grudge": 10,
    "machine": 20,
    "plat": 12
   },
   "window": 36,
   "shape": "even",
   "elitePct": 10,
   "pilotHearts": 0,
   "hpM": 1.45
  },
  {
   "wave": 13,
   "abs": {
    "pop": 12,
    "drone": 6
   },
   "window": 16,
   "shape": "even",
   "elitePct": 10,
   "pilotHearts": 0,
   "hpM": 1.5,
   "boss": "LAB TRAX",
   "mirror": {
    "hp": 45,
    "agg": 0.9,
    "pct": 60,
    "ver": 1
   }
  },
  {
   "wave": 14,
   "abs": {
    "pop": 34,
    "dealer": 10,
    "jack": 12,
    "drone": 24,
    "grudge": 12,
    "plat": 14,
    "rabbi": 8,
    "lion": 4
   },
   "window": 40,
   "shape": "pulsed",
   "elitePct": 10,
   "pilotHearts": 0,
   "hpM": 1.55,
   "tear": {
    "n": 1,
    "hp": 60,
    "cap": 30,
    "gout": 8,
    "fam": "pop"
   }
  },
  {
   "wave": 15,
   "abs": {
    "pop": 30,
    "dealer": 8,
    "jack": 12,
    "drone": 20,
    "grudge": 10,
    "machine": 8,
    "plat": 12,
    "rabbi": 36,
    "lion": 5,
    "jetf": 9
   },
   "window": 44,
   "shape": "crescendo",
   "elitePct": 10,
   "pilotHearts": 0,
   "hpM": 1.6,
   "event": "THE PRIESTHOOD"
  },
  {
   "wave": 16,
   "abs": {
    "drone": 170,
    "grudge": 36,
    "plat": 10
   },
   "window": 46,
   "shape": "crescendo",
   "elitePct": 12,
   "pilotHearts": 0,
   "hpM": 1.7,
   "aggM": 1.2,
   "superN": 1
  },
  {
   "wave": 17,
   "abs": {
    "pop": 50,
    "dealer": 24,
    "jack": 20,
    "twins": 5,
    "drone": 24,
    "grudge": 12,
    "machine": 12,
    "plat": 16,
    "rabbi": 10,
    "lion": 6,
    "jetf": 9
   },
   "window": 48,
   "shape": "even",
   "elitePct": 12,
   "pilotHearts": 0,
   "hpM": 1.8,
   "aggM": 1.2,
   "rich": 1.4
  },
  {
   "wave": 18,
   "abs": {
    "drone": 40,
    "plat": 20,
    "rabbi": 10
   },
   "window": 60,
   "shape": "even",
   "elitePct": 12,
   "pilotHearts": 0,
   "hpM": 1.9,
   "aggM": 1.2,
   "event": "THE DREAM"
  },
  {
   "wave": 19,
   "abs": {
    "jack": 70,
    "twins": 15,
    "rival": 50
   },
   "window": 36,
   "shape": "pulsed",
   "elitePct": 15,
   "pilotHearts": 0,
   "hpM": 2,
   "aggM": 1.2,
   "event": "BRAWL"
  },
  {
   "wave": 20,
   "abs": {
    "pop": 90,
    "dealer": 16,
    "jack": 24,
    "drone": 90,
    "grudge": 40,
    "machine": 16,
    "plat": 50,
    "rabbi": 24,
    "lion": 12,
    "jetf": 18
   },
   "window": 60,
   "shape": "crescendo",
   "elitePct": 15,
   "pilotHearts": 0,
   "hpM": 2.1,
   "aggM": 1.4,
   "superN": 2,
   "tear": {
    "n": 2,
    "hp": 150,
    "cap": 60,
    "gout": 20,
    "fam": "plat"
   },
   "event": "THE TEAR"
  },
  {
   "wave": 21,
   "abs": {
    "drone": 100,
    "grudge": 30,
    "jetf": 18
   },
   "window": 60,
   "shape": "even",
   "elitePct": 15,
   "pilotHearts": 0,
   "hpM": 2.3,
   "aggM": 1.4,
   "boss": "THE FORGE",
   "forge": {
    "dr": 3,
    "mach": 2,
    "rate": 12,
    "hp": 2600,
    "clock": 150,
    "cap": 12
   }
  },
  {
   "wave": 22,
   "abs": {
    "machine": 28,
    "plat": 300,
    "jetf": 18
   },
   "window": 55,
   "shape": "even",
   "elitePct": 18,
   "pilotHearts": 0,
   "hpM": 2.4,
   "aggM": 1.4
  },
  {
   "wave": 23,
   "abs": {
    "jack": 90,
    "twins": 25,
    "rival": 60
   },
   "window": 40,
   "shape": "pulsed",
   "elitePct": 18,
   "pilotHearts": 0,
   "hpM": 2.5,
   "aggM": 1.4,
   "event": "BRAWL"
  },
  {
   "wave": 24,
   "abs": {
    "pop": 60,
    "drone": 60,
    "grudge": 20,
    "plat": 40,
    "rabbi": 16
   },
   "window": 50,
   "shape": "even",
   "elitePct": 18,
   "pilotHearts": 0,
   "hpM": 2.6,
   "aggM": 1.5,
   "paragonPct": 5,
   "boss": "LAB TRAX",
   "mirror": {
    "hp": 110,
    "agg": 1.1,
    "pct": 90,
    "ver": 2
   }
  },
  {
   "wave": 25,
   "abs": {
    "pop": 150,
    "dealer": 36,
    "jack": 50,
    "twins": 12,
    "drone": 160,
    "grudge": 60,
    "machine": 32,
    "plat": 80,
    "rabbi": 50,
    "lion": 24,
    "jetf": 24
   },
   "window": 65,
   "shape": "crescendo",
   "elitePct": 22,
   "pilotHearts": 0,
   "hpM": 2.8,
   "aggM": 1.7,
   "superN": 3,
   "paragonPct": 5,
   "event": "EVERYTHING"
  },
  {
   "wave": 26,
   "abs": {
    "pop": 120,
    "drone": 180,
    "grudge": 80,
    "plat": 80,
    "rabbi": 40,
    "lion": 24,
    "jetf": 21
   },
   "window": 60,
   "shape": "even",
   "elitePct": 22,
   "pilotHearts": 0,
   "hpM": 3,
   "aggM": 1.7,
   "superN": 3,
   "paragonPct": 5,
   "tear": {
    "n": 3,
    "hp": 300,
    "cap": 100,
    "gout": 40,
    "fam": "drone"
   }
  },
  {
   "wave": 27,
   "abs": {
    "pop": 80,
    "drone": 80,
    "plat": 60,
    "rabbi": 400,
    "lion": 50,
    "jetf": 36
   },
   "window": 66,
   "shape": "crescendo",
   "elitePct": 22,
   "pilotHearts": 0,
   "hpM": 3.2,
   "aggM": 1.7,
   "paragonPct": 5
  },
  {
   "wave": 28,
   "abs": {
    "pop": 200,
    "dealer": 50,
    "jack": 60,
    "twins": 15,
    "drone": 240,
    "grudge": 100,
    "machine": 44,
    "plat": 120,
    "rabbi": 80,
    "lion": 36,
    "jetf": 36
   },
   "window": 72,
   "shape": "crescendo",
   "elitePct": 26,
   "pilotHearts": 0,
   "hpM": 3.4,
   "aggM": 1.7,
   "superN": 4,
   "paragonPct": 8,
   "event": "EVERYTHING"
  },
  {
   "wave": 29,
   "abs": {
    "drone": 1500,
    "grudge": 150,
    "jetf": 36
   },
   "window": 90,
   "shape": "crescendo",
   "elitePct": 26,
   "pilotHearts": 0,
   "hpM": 3.5,
   "aggM": 1.7,
   "superN": 5,
   "paragonPct": 8,
   "tear": {
    "n": 2,
    "hp": 400,
    "cap": 150,
    "gout": 60,
    "fam": "rabbi"
   }
  },
  {
   "wave": 30,
   "abs": {
    "pop": 140,
    "drone": 160,
    "grudge": 60,
    "plat": 100,
    "rabbi": 80,
    "lion": 40,
    "jetf": 36
   },
   "window": 60,
   "shape": "even",
   "elitePct": 26,
   "pilotHearts": 0,
   "hpM": 3.6,
   "aggM": 2,
   "paragonPct": 8,
   "mirror": {
    "hp": 180,
    "agg": 1.2,
    "react": 1.1,
    "ver": 4
   },
   "event": "LAB TRAX"
  },
  {
   "wave": 31,
   "abs": {
    "pop": 300,
    "dealer": 60,
    "jack": 70,
    "drone": 360,
    "grudge": 140,
    "machine": 56,
    "plat": 180,
    "rabbi": 120,
    "lion": 50,
    "jetf": 48
   },
   "window": 84,
   "shape": "pulsed",
   "elitePct": 30,
   "pilotHearts": 0,
   "hpM": 3.8,
   "aggM": 2,
   "superN": 5,
   "paragonPct": 8
  },
  {
   "wave": 32,
   "abs": {
    "pop": 200,
    "dealer": 60,
    "drone": 260,
    "plat": 140,
    "rabbi": 60,
    "lion": 20
   },
   "window": 66,
   "shape": "even",
   "elitePct": 30,
   "pilotHearts": 0,
   "hpM": 4,
   "aggM": 2,
   "paragonPct": 12,
   "rich": 1.5
  },
  {
   "wave": 33,
   "abs": {
    "pop": 400,
    "dealer": 60,
    "jack": 80,
    "twins": 20,
    "drone": 600,
    "grudge": 200,
    "machine": 60,
    "plat": 200,
    "rabbi": 160,
    "lion": 60,
    "jetf": 60
   },
   "window": 100,
   "shape": "crescendo",
   "elitePct": 30,
   "pilotHearts": 0,
   "hpM": 4.3,
   "aggM": 2.2,
   "superN": 6,
   "paragonPct": 12,
   "event": "EVERYTHING"
  },
  {
   "wave": 34,
   "abs": {
    "pop": 400,
    "dealer": 60,
    "jack": 80,
    "twins": 20,
    "drone": 700,
    "grudge": 240,
    "machine": 72,
    "plat": 240,
    "rabbi": 200,
    "lion": 70,
    "jetf": 72
   },
   "window": 110,
   "shape": "even",
   "elitePct": 35,
   "pilotHearts": 0,
   "hpM": 4.6,
   "aggM": 2.4,
   "superN": 6,
   "paragonPct": 12,
   "tear": {
    "n": 4,
    "hp": 900,
    "cap": 200,
    "gout": 80,
    "fam": "grudge"
   },
   "red": true
  },
  {
   "wave": 35,
   "abs": {
    "drone": 300,
    "plat": 300,
    "rabbi": 700,
    "lion": 100,
    "jetf": 60
   },
   "window": 110,
   "shape": "pulsed",
   "elitePct": 35,
   "pilotHearts": 0,
   "hpM": 5,
   "aggM": 2.6,
   "paragonPct": 12,
   "event": "THE LONG DARK",
   "red": true
  },
  {
   "wave": 36,
   "abs": {
    "pop": 300,
    "drone": 600,
    "grudge": 200,
    "plat": 300,
    "rabbi": 200,
    "lion": 80,
    "jetf": 60
   },
   "window": 110,
   "shape": "even",
   "elitePct": 35,
   "pilotHearts": 0,
   "hpM": 5.3,
   "aggM": 2.8,
   "superN": 8,
   "paragonPct": 18,
   "boss": "LAB TRAX",
   "mirror": {
    "n": 2,
    "hp": 220,
    "agg": 1.3,
    "react": 1.2,
    "ver": 3
   },
   "red": true
  },
  {
   "wave": 37,
   "abs": {
    "pop": 600,
    "dealer": 80,
    "jack": 120,
    "twins": 30,
    "drone": 900,
    "grudge": 320,
    "machine": 96,
    "plat": 320,
    "rabbi": 280,
    "lion": 100,
    "jetf": 90
   },
   "window": 120,
   "shape": "crescendo",
   "elitePct": 40,
   "pilotHearts": 0,
   "hpM": 5.7,
   "aggM": 3,
   "superN": 10,
   "paragonPct": 18,
   "red": true
  },
  {
   "wave": 38,
   "abs": {
    "drone": 900,
    "grudge": 300,
    "plat": 400,
    "rabbi": 300,
    "jetf": 120
   },
   "window": 120,
   "shape": "even",
   "elitePct": 40,
   "pilotHearts": 0,
   "hpM": 6,
   "aggM": 3,
   "superN": 10,
   "paragonPct": 18,
   "boss": "THE FORGE",
   "forge": {
    "dr": 6,
    "mach": 4,
    "rate": 8,
    "hp": 7000,
    "clock": 200,
    "cap": 24
   },
   "red": true
  },
  {
   "wave": 39,
   "abs": {
    "pop": 700,
    "dealer": 90,
    "jack": 130,
    "twins": 30,
    "drone": 1000,
    "grudge": 400,
    "machine": 120,
    "plat": 400,
    "rabbi": 340,
    "lion": 120,
    "jetf": 105
   },
   "window": 130,
   "shape": "even",
   "elitePct": 45,
   "pilotHearts": 0,
   "hpM": 6.5,
   "aggM": 3.2,
   "superN": 12,
   "paragonPct": 25,
   "tear": {
    "n": 5,
    "hp": 1500,
    "cap": 300,
    "gout": 120,
    "fam": "lion"
   },
   "red": true
  },
  {
   "wave": 40,
   "abs": {
    "pop": 900,
    "dealer": 120,
    "jack": 160,
    "twins": 40,
    "drone": 1300,
    "grudge": 500,
    "machine": 160,
    "plat": 500,
    "rabbi": 420,
    "lion": 150,
    "jetf": 150
   },
   "window": 150,
   "shape": "crescendo",
   "elitePct": 50,
   "pilotHearts": 0,
   "hpM": 7,
   "aggM": 3.5,
   "superN": 15,
   "paragonPct": 30,
   "event": "THE SUMMIT",
   "red": true
  }
 ]
};
