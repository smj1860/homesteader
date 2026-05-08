"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { ArrowLeft, Sprout, FlaskConical, Search } from "lucide-react"
import Link from "next/link"

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'
const MEDICINAL_COLOR = '#7c3aed'

// Zone groups and last frost reference dates
const ZONE_GROUPS = [
  { id: '3-4', label: 'Zones 3–4', lastFrost: 'May 15 – June 1', firstFall: 'Sept 1 – Sept 15' },
  { id: '5-6', label: 'Zones 5–6', lastFrost: 'Apr 15 – May 15', firstFall: 'Sept 15 – Oct 15' },
  { id: '7-8', label: 'Zones 7–8', lastFrost: 'Mar 15 – Apr 15', firstFall: 'Oct 15 – Nov 15' },
  { id: '9-10', label: 'Zones 9–10', lastFrost: 'Jan 15 – Feb 28', firstFall: 'Nov 15 – Dec 15' },
]

type PlantRow = {
  name: string
  medicinal?: boolean
  indoors: Record<string, string>   // weeks before last frost
  transplant: Record<string, string>
  directSow: Record<string, string>
  maturity: string
  notes?: string
}

// ── VEGETABLES ────────────────────────────────────────────────────────────────
const VEGETABLES: PlantRow[] = [
  { name: 'Tomatoes', indoors: { '3-4': '6–8 wks', '5-6': '6–8 wks', '7-8': '6–8 wks', '9-10': '8–10 wks' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': '2 wks after last frost', '9-10': 'Feb–Mar' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '60–85 days', notes: 'Needs consistent 65°F+ soil temp' },
  { name: 'Peppers', indoors: { '3-4': '8–10 wks', '5-6': '8–10 wks', '7-8': '8–10 wks', '9-10': '10–12 wks' }, transplant: { '3-4': '2 wks after last frost', '5-6': '2 wks after last frost', '7-8': 'After last frost', '9-10': 'Feb–Mar' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '70–90 days', notes: 'Slowest to germinate — start early' },
  { name: 'Cucumbers', indoors: { '3-4': '3–4 wks', '5-6': '3–4 wks', '7-8': '2–3 wks', '9-10': '—' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': '—' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr & Aug' }, maturity: '50–70 days', notes: 'Dislikes transplanting — direct sow preferred' },
  { name: 'Squash (Summer)', indoors: { '3-4': '2–3 wks', '5-6': '2–3 wks', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': '—', '9-10': '—' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar & Aug' }, maturity: '45–60 days', notes: 'Prolific — plant less than you think' },
  { name: 'Squash (Winter)', indoors: { '3-4': '3–4 wks', '5-6': '3–4 wks', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': '—', '9-10': '—' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, maturity: '80–110 days', notes: 'Needs long growing season — plan accordingly' },
  { name: 'Zucchini', indoors: { '3-4': '2–3 wks', '5-6': '2–3 wks', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': '—', '9-10': '—' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar & Aug' }, maturity: '45–55 days', notes: 'One or two plants is usually enough' },
  { name: 'Beans (Bush)', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–May & Aug' }, maturity: '50–60 days', notes: 'Direct sow only — dislikes transplanting' },
  { name: 'Beans (Pole)', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–May' }, maturity: '60–70 days', notes: 'Needs trellis or support structure' },
  { name: 'Peas', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': '4–6 wks before last frost', '5-6': '4–6 wks before last frost', '7-8': '4–6 wks before last frost', '9-10': 'Oct–Jan' }, maturity: '55–70 days', notes: 'Cool season — plant as early as possible' },
  { name: 'Lettuce', indoors: { '3-4': '4–6 wks', '5-6': '4–6 wks', '7-8': '4–6 wks', '9-10': '—' }, transplant: { '3-4': '2–4 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': '4 wks before last frost', '9-10': '—' }, directSow: { '3-4': '2–4 wks before last frost', '5-6': '2–4 wks before last frost', '7-8': 'Mar & Sept–Oct', '9-10': 'Oct–Feb' }, maturity: '45–75 days', notes: 'Stagger every 2–3 weeks for continuous harvest' },
  { name: 'Spinach', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': '4–6 wks before last frost', '5-6': '4–6 wks before last frost', '7-8': 'Mar & Sept–Oct', '9-10': 'Oct–Feb' }, maturity: '40–50 days', notes: 'Bolts quickly in heat — fall crop often better' },
  { name: 'Kale', indoors: { '3-4': '4–6 wks', '5-6': '4–6 wks', '7-8': '4–6 wks', '9-10': '4–6 wks' }, transplant: { '3-4': '2–3 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': '4 wks before last frost', '9-10': 'Sept–Oct' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'Aug–Sept', '9-10': 'Sept–Oct' }, maturity: '55–75 days', notes: 'Improves with light frost — sweeter flavor' },
  { name: 'Broccoli', indoors: { '3-4': '5–7 wks', '5-6': '5–7 wks', '7-8': '5–7 wks', '9-10': '5–7 wks' }, transplant: { '3-4': '2–4 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': '4 wks before last frost', '9-10': 'Aug–Sept' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '70–100 days', notes: 'Cool season — spring and fall crops best' },
  { name: 'Cauliflower', indoors: { '3-4': '5–7 wks', '5-6': '5–7 wks', '7-8': '5–7 wks', '9-10': '5–7 wks' }, transplant: { '3-4': '2–4 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': '4 wks before last frost', '9-10': 'Aug–Sept' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '70–100 days', notes: 'More temperature sensitive than broccoli' },
  { name: 'Cabbage', indoors: { '3-4': '5–7 wks', '5-6': '5–7 wks', '7-8': '5–7 wks', '9-10': '5–7 wks' }, transplant: { '3-4': '2–4 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': '4 wks before last frost', '9-10': 'Aug–Oct' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '70–120 days', notes: 'Wide spacing needed — 18" minimum' },
  { name: 'Brussels Sprouts', indoors: { '3-4': '5–7 wks', '5-6': '5–7 wks', '7-8': '5–7 wks', '9-10': '—' }, transplant: { '3-4': '2–4 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': 'June–July', '9-10': '—' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '80–100 days', notes: 'Best flavor after first fall frost' },
  { name: 'Carrots', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': '3–4 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': 'Mar–Apr & Aug–Sept', '9-10': 'Oct–Feb' }, maturity: '70–80 days', notes: 'Direct sow only — tap root dislikes disturbance' },
  { name: 'Beets', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': '3–4 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': 'Mar–Apr & Aug', '9-10': 'Oct–Jan' }, maturity: '50–70 days', notes: 'Soak seeds 1 hr before planting for better germination' },
  { name: 'Radishes', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': '3–4 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': 'Mar & Aug–Sept', '9-10': 'Oct–Mar' }, maturity: '22–35 days', notes: 'Fastest maturing vegetable — good row marker' },
  { name: 'Onions', indoors: { '3-4': '10–12 wks', '5-6': '10–12 wks', '7-8': '10–12 wks', '9-10': '10–12 wks' }, transplant: { '3-4': '4 wks before last frost', '5-6': '4 wks before last frost', '7-8': 'Feb–Mar', '9-10': 'Jan–Feb' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'Feb–Mar', '9-10': 'Jan–Feb' }, maturity: '100–120 days', notes: 'Day-length sensitive — choose short or long day variety for your zone' },
  { name: 'Garlic', medicinal: true, indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': 'Oct–Nov', '5-6': 'Oct–Nov', '7-8': 'Oct–Dec', '9-10': 'Nov–Jan' }, maturity: '240–270 days (planted fall, harvested summer)', notes: 'Plant cloves in fall, harvest following summer when tops die back' },
  { name: 'Red Potatoes', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': '2–3 wks before last frost', '5-6': '2–4 wks before last frost', '7-8': 'Feb–Mar', '9-10': 'Jan–Feb & Aug' }, maturity: '70–80 days', notes: 'Plant seed potatoes 4" deep, 12" apart. Hill soil as plants grow' },
  { name: 'Gold Potatoes', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': '2–3 wks before last frost', '5-6': '2–4 wks before last frost', '7-8': 'Feb–Mar', '9-10': 'Jan–Feb & Aug' }, maturity: '70–90 days', notes: 'Yukon Gold type — higher yield than reds, excellent storage' },
  { name: 'Sweet Corn', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Feb–Apr' }, maturity: '65–90 days', notes: 'Plant in blocks not rows for proper wind pollination — minimum 4×4 block' },
  { name: 'Eggplant', indoors: { '3-4': '8–10 wks', '5-6': '8–10 wks', '7-8': '8–10 wks', '9-10': '8–10 wks' }, transplant: { '3-4': '2 wks after last frost', '5-6': '2 wks after last frost', '7-8': 'After last frost', '9-10': 'Feb–Mar' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '65–80 days', notes: 'Heat-lover — needs warmer temps than tomatoes' },
  { name: 'Celery', indoors: { '3-4': '10–12 wks', '5-6': '10–12 wks', '7-8': '10–12 wks', '9-10': '10–12 wks' }, transplant: { '3-4': '2 wks before last frost', '5-6': '2 wks before last frost', '7-8': '2 wks before last frost', '9-10': 'Aug–Sept' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '100–130 days', notes: 'Challenging — needs consistent moisture and cool temps during development' },
  { name: 'Sweet Potatoes', indoors: { '3-4': 'Start slips 6–8 wks', '5-6': 'Start slips 6–8 wks', '7-8': 'Start slips 4–6 wks', '9-10': '—' }, transplant: { '3-4': '2–3 wks after last frost', '5-6': '2 wks after last frost', '7-8': '2 wks after last frost', '9-10': 'Mar–Apr' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '90–120 days', notes: 'Grow from slips not seeds — start your own or purchase from nursery' },
]

// ── HERBS ─────────────────────────────────────────────────────────────────────
const HERBS: PlantRow[] = [
  { name: 'Basil', indoors: { '3-4': '6–8 wks', '5-6': '4–6 wks', '7-8': '4–6 wks', '9-10': '4–6 wks' }, transplant: { '3-4': '2 wks after last frost', '5-6': '2 wks after last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, maturity: '25–30 days to first harvest', notes: 'Cold sensitive — do not plant until nights stay above 50°F' },
  { name: 'Parsley', indoors: { '3-4': '8–10 wks', '5-6': '8–10 wks', '7-8': '8–10 wks', '9-10': '8–10 wks' }, transplant: { '3-4': '3–4 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': 'Feb–Mar', '9-10': 'Oct–Feb' }, directSow: { '3-4': '2–3 wks before last frost', '5-6': '2–3 wks before last frost', '7-8': 'Feb–Mar', '9-10': 'Oct–Feb' }, maturity: '70–90 days', notes: 'Slow to germinate — soak seeds 24 hrs before planting' },
  { name: 'Cilantro', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': '2–3 wks before last frost', '5-6': '2–3 wks before last frost', '7-8': 'Mar–Apr & Sept', '9-10': 'Oct–Mar' }, maturity: '45–70 days', notes: 'Bolts quickly in heat — stagger every 2–3 weeks, plant in cooler seasons' },
  { name: 'Dill', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Sept–Mar' }, maturity: '40–60 days to harvest', notes: 'Dislikes transplanting — direct sow. Self-seeds readily' },
  { name: 'Chives', indoors: { '3-4': '8–10 wks', '5-6': '8–10 wks', '7-8': '6–8 wks', '9-10': '6–8 wks' }, transplant: { '3-4': '3–4 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': 'Feb–Mar', '9-10': 'Oct–Feb' }, directSow: { '3-4': '2–3 wks before last frost', '5-6': '2–3 wks before last frost', '7-8': 'Feb–Apr', '9-10': 'Oct–Feb' }, maturity: '60–90 days', notes: 'Perennial — plant once and divide every 3 years' },
  { name: 'Oregano', indoors: { '3-4': '8–10 wks', '5-6': '8–10 wks', '7-8': '6–8 wks', '9-10': '6–8 wks' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, maturity: '80–90 days to full flavor', notes: 'Perennial in zones 5+. Flavor intensifies when slightly stressed' },
  { name: 'Thyme', indoors: { '3-4': '8–10 wks', '5-6': '8–10 wks', '7-8': '6–8 wks', '9-10': '6–8 wks' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, maturity: '75–90 days', notes: 'Perennial in zones 5+. Drought tolerant once established' },
  { name: 'Rosemary', indoors: { '3-4': '10–12 wks', '5-6': '10–12 wks', '7-8': '8–10 wks', '9-10': '8–10 wks' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '80–100 days', notes: 'Perennial in zones 7+. Very slow from seed — buy transplants in colder zones' },
  { name: 'Sage', indoors: { '3-4': '6–8 wks', '5-6': '6–8 wks', '7-8': '6–8 wks', '9-10': '6–8 wks' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, maturity: '75–80 days', notes: 'Perennial in zones 5+. Prune hard in spring to prevent woodiness' },
  { name: 'Mint', indoors: { '3-4': '8–10 wks', '5-6': '8–10 wks', '7-8': '6–8 wks', '9-10': '6–8 wks' }, transplant: { '3-4': '2–3 wks before last frost', '5-6': '2–3 wks before last frost', '7-8': 'Feb–Mar', '9-10': 'Oct–Mar' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '90 days from seed', notes: 'Extremely invasive — grow in containers to prevent spreading' },
  { name: 'Lemon Balm', medicinal: true, indoors: { '3-4': '6–8 wks', '5-6': '6–8 wks', '7-8': '6–8 wks', '9-10': '6–8 wks' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, maturity: '70–75 days', notes: 'Calming, anti-anxiety, digestive. Perennial zones 4+. Can spread aggressively' },
  { name: 'Chamomile', medicinal: true, indoors: { '3-4': '4–6 wks', '5-6': '4–6 wks', '7-8': '4–6 wks', '9-10': '—' }, transplant: { '3-4': '2 wks before last frost', '5-6': '2 wks before last frost', '7-8': 'Feb–Mar', '9-10': '—' }, directSow: { '3-4': '2–3 wks before last frost', '5-6': '2–3 wks before last frost', '7-8': 'Feb–Apr & Sept', '9-10': 'Oct–Feb' }, maturity: '60–65 days to flower', notes: 'Calming, anti-inflammatory, digestive aid. Self-seeds freely. Harvest flowers when just open' },
  { name: 'Lavender', medicinal: true, indoors: { '3-4': '12 wks', '5-6': '10–12 wks', '7-8': '10–12 wks', '9-10': '10–12 wks' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: '90–200 days (buy transplants for better results)', notes: 'Anti-anxiety, sleep aid, antiseptic. Perennial zones 5+. Very slow from seed' },
  { name: 'Echinacea', medicinal: true, indoors: { '3-4': '8–10 wks', '5-6': '8–10 wks', '7-8': '8–10 wks', '9-10': '8–10 wks' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, directSow: { '3-4': 'After last frost or fall', '5-6': 'After last frost or fall', '7-8': 'After last frost or fall', '9-10': 'Oct–Nov' }, maturity: 'First harvest year 2–3', notes: 'Immune support. Perennial. Cold stratification improves germination. Roots most potent after 3 yrs' },
  { name: 'Valerian', medicinal: true, indoors: { '3-4': '6–8 wks', '5-6': '6–8 wks', '7-8': '6–8 wks', '9-10': '6–8 wks' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, directSow: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, maturity: '120 days, roots harvested year 2', notes: 'Sleep aid, nerve calming. Perennial zones 4+. Flowers attract pollinators. Harvest roots in fall of year 2' },
  { name: 'Calendula', medicinal: true, indoors: { '3-4': '4–6 wks', '5-6': '4–6 wks', '7-8': '4–6 wks', '9-10': '—' }, transplant: { '3-4': '2 wks before last frost', '5-6': '2 wks before last frost', '7-8': 'Feb–Mar', '9-10': '—' }, directSow: { '3-4': '2 wks before last frost', '5-6': '2 wks before last frost', '7-8': 'Mar & Sept', '9-10': 'Oct–Feb' }, maturity: '45–60 days to flower', notes: 'Skin healing, anti-inflammatory. Self-seeds reliably. Harvest flowers continuously to prolong blooming' },
  { name: "St. John's Wort", medicinal: true, indoors: { '3-4': '8–10 wks', '5-6': '8–10 wks', '7-8': '8–10 wks', '9-10': '8–10 wks' }, transplant: { '3-4': 'After last frost', '5-6': 'After last frost', '7-8': 'After last frost', '9-10': 'Mar–Apr' }, directSow: { '3-4': 'After last frost or fall', '5-6': 'After last frost or fall', '7-8': 'After last frost', '9-10': 'Oct–Nov' }, maturity: 'First good harvest year 2', notes: 'Mood support, nerve tonic. Perennial zones 5+. Needs cold stratification. Harvest buds just before flowers open' },
]

// ── FRUITS ────────────────────────────────────────────────────────────────────
const FRUITS: PlantRow[] = [
  { name: 'Strawberries', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '3–4 wks before last frost', '5-6': '3–4 wks before last frost', '7-8': 'Feb–Mar & Aug–Sept', '9-10': 'Oct–Jan' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'First full harvest year 2', notes: 'Plant crowns not seeds. Remove flowers year 1 for stronger plants year 2' },
  { name: 'Blueberries', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'Early spring or fall', '5-6': 'Early spring or fall', '7-8': 'Early spring or fall', '9-10': 'Oct–Jan' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'Full production years 4–6', notes: '⚠ Plant at least 3 different varieties for cross-pollination — single plants produce little to no fruit. Need acidic soil (pH 4.5–5.5)' },
  { name: 'Raspberries', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'Early spring', '5-6': 'Early spring', '7-8': 'Early spring or fall', '9-10': 'Oct–Feb' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'First good harvest year 2', notes: 'Plant bare root canes in early spring. Needs trellis support. Prune out old canes after fruiting' },
  { name: 'Blackberries', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'Early spring', '5-6': 'Early spring', '7-8': 'Early spring or fall', '9-10': 'Oct–Feb' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'First good harvest year 2', notes: 'Thorned or thornless varieties available. Spreads aggressively — plant where you can manage it' },
  { name: 'Grapes', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'Early spring', '5-6': 'Early spring', '7-8': 'Early spring or fall', '9-10': 'Oct–Feb' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'First good harvest years 3–5', notes: 'Choose variety for your zone. Needs strong trellis. Annual pruning is critical for production' },
  { name: 'Muscadines', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': '—', '7-8': 'Early spring or fall', '9-10': 'Oct–Feb' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'First good harvest years 3–4', notes: 'Best in zones 7–10 — not cold hardy. Self-fertile varieties available but cross-pollination improves yield. Extremely heat and humidity tolerant' },
  { name: 'Watermelon', indoors: { '3-4': '3–4 wks', '5-6': '3–4 wks', '7-8': '2–3 wks', '9-10': '—' }, transplant: { '3-4': '2 wks after last frost', '5-6': '2 wks after last frost', '7-8': '2 wks after last frost', '9-10': '—' }, directSow: { '3-4': '—', '5-6': '—', '7-8': 'After last frost', '9-10': 'Mar–May' }, maturity: '70–90 days', notes: 'Needs lots of space and heat. Check for sweetness by thumping — hollow sound means ripe' },
  { name: 'Cantaloupe', indoors: { '3-4': '3–4 wks', '5-6': '3–4 wks', '7-8': '2–3 wks', '9-10': '—' }, transplant: { '3-4': '2 wks after last frost', '5-6': '2 wks after last frost', '7-8': '2 wks after last frost', '9-10': '—' }, directSow: { '3-4': '—', '5-6': '—', '7-8': 'After last frost', '9-10': 'Mar–May' }, maturity: '75–90 days', notes: 'Ripe when stem separates easily from vine with gentle pressure' },
  { name: 'Apple (tree)', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'Early spring or fall', '5-6': 'Early spring or fall', '7-8': 'Early spring or fall', '9-10': 'Oct–Jan' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'First fruit years 3–5', notes: 'Most varieties need a cross-pollinating partner. Choose chill-hour variety matched to your zone. Annual pruning required' },
  { name: 'Peach (tree)', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'Early spring', '5-6': 'Early spring', '7-8': 'Early spring or fall', '9-10': 'Oct–Jan' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'First fruit years 2–4', notes: 'Self-fertile. Check chill hours for your zone — low-chill varieties for zones 8–10. Prone to frost damage on blossoms' },
  { name: 'Pear (tree)', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'Early spring or fall', '5-6': 'Early spring or fall', '7-8': 'Early spring or fall', '9-10': 'Oct–Jan' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'First fruit years 3–5', notes: 'Needs cross-pollination. Harvest before fully ripe and ripen indoors for best texture' },
  { name: 'Cherry (tree)', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'Early spring', '5-6': 'Early spring', '7-8': 'Early spring', '9-10': '—' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'First fruit years 4–7', notes: 'Sweet cherries need cross-pollination. Sour cherries self-fertile. Zones 4–7 best. Net trees to protect from birds' },
  { name: 'Plum (tree)', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': 'Early spring or fall', '5-6': 'Early spring or fall', '7-8': 'Early spring or fall', '9-10': 'Oct–Jan' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'First fruit years 3–5', notes: 'Japanese plums self-fertile. European types need cross-pollination. American varieties most cold-hardy' },
  { name: 'Fig (tree)', indoors: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, transplant: { '3-4': '—', '5-6': 'Spring (protect in winter)', '7-8': 'Spring or fall', '9-10': 'Oct–Mar' }, directSow: { '3-4': '—', '5-6': '—', '7-8': '—', '9-10': '—' }, maturity: 'First good harvest years 2–3', notes: 'Self-fertile. Best in zones 7–10. In zones 5–6 grow in containers and bring in for winter, or heavily mulch roots' },
]

const TAB_OPTIONS = [
  { id: 'vegetables', label: 'Vegetables', data: VEGETABLES },
  { id: 'herbs', label: 'Herbs', data: HERBS },
  { id: 'fruits', label: 'Fruits', data: FRUITS },
]

export default function PlantingSchedulesPage() {
  const [zone, setZone]   = useState('5-6')
  const [tab, setTab]     = useState('vegetables')
  const [search, setSearch] = useState('')

  const currentZone = ZONE_GROUPS.find(z => z.id === zone)!
  const currentTab  = TAB_OPTIONS.find(t => t.id === tab)!

  const rows = currentTab.data.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen pb-24 pt-20" style={{ backgroundColor: PARCH }}>
      <Navigation />

      <main className="container mx-auto max-w-6xl px-4 pt-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: `${FOREST}88` }}>
          <Link href="/homesteading" style={{ color: `${FOREST}88` }} className="hover:underline">Homesteading</Link>
          <span>/</span>
          <Link href="/resources" style={{ color: `${FOREST}88` }} className="hover:underline">Resources</Link>
          <span>/</span>
          <span style={{ color: FOREST }}>Planting Schedules</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2" style={{ color: FOREST }}>
            Planting Schedules
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: `${FOREST}99` }}>
            Zone-specific sow and transplant dates for vegetables, herbs, and fruits.
            Select your zone, find your crop, and know exactly when to act.
          </p>
        </div>

        {/* Medicinal badge legend */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold mb-6"
          style={{ backgroundColor: `${MEDICINAL_COLOR}12`, color: MEDICINAL_COLOR, border: `1px solid ${MEDICINAL_COLOR}30` }}
        >
          <FlaskConical className="h-3.5 w-3.5" />
          Medicinal — Future Apothecary Section
        </div>

        {/* Controls row */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">

          {/* Zone selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold shrink-0" style={{ color: FOREST }}>Your Zone:</label>
            <select
              value={zone}
              onChange={e => setZone(e.target.value)}
              className="rounded-lg px-3 py-2 text-sm font-semibold outline-none"
              style={{ backgroundColor: FOREST, color: PARCH, border: 'none' }}
            >
              {ZONE_GROUPS.map(z => (
                <option key={z.id} value={z.id}>{z.label}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: `${FOREST}66` }} />
            <input
              type="text"
              placeholder="Search crops..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg pl-9 pr-3 py-2 text-sm outline-none"
              style={{ backgroundColor: PARCH2, border: `1.5px solid ${FOREST}20`, color: FOREST }}
            />
          </div>

          {/* Print button */}
          <button
            onClick={() => window.print()}
            className="rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80 hidden md:flex items-center gap-1.5 ml-auto"
            style={{ backgroundColor: `${FOREST}15`, color: FOREST, border: `1.5px solid ${FOREST}25` }}
          >
            🖨 Print Schedule
          </button>
        </div>

        {/* Zone info bar */}
        <div
          className="rounded-xl px-4 py-3 mb-5 flex flex-wrap gap-4 text-sm"
          style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}
        >
          <span style={{ color: FOREST }}>
            <strong>Last Spring Frost:</strong>{' '}
            <span style={{ color: `${FOREST}99` }}>{currentZone.lastFrost}</span>
          </span>
          <span style={{ color: FOREST }}>
            <strong>First Fall Frost:</strong>{' '}
            <span style={{ color: `${FOREST}99` }}>{currentZone.firstFall}</span>
          </span>
          <span className="text-xs italic" style={{ color: `${FOREST}77` }}>
            Dates are regional averages — check your specific location for precision
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl overflow-hidden mb-4" style={{ border: `1.5px solid ${FOREST}20` }}>
          {TAB_OPTIONS.map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSearch('') }}
              className="flex-1 py-2.5 text-sm font-semibold transition-colors"
              style={tab === t.id
                ? { backgroundColor: FOREST, color: PARCH }
                : { backgroundColor: 'transparent', color: `${FOREST}88` }
              }
            >
              {t.label}
              <span className="ml-1.5 text-xs opacity-60">({t.data.length})</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden mb-10" style={{ border: `1.5px solid ${FOREST}20` }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: GOLD }}>
                  <th className="text-left px-4 py-3 font-semibold w-36" style={{ color: '#1a1a1a' }}>Crop</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: '#1a1a1a' }}>Start Indoors</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: '#1a1a1a' }}>Transplant Out</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: '#1a1a1a' }}>Direct Sow</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: '#1a1a1a' }}>Days to Maturity</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell" style={{ color: '#1a1a1a' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-sm" style={{ color: `${FOREST}66` }}>
                      No crops found for &ldquo;{search}&rdquo;
                    </td>
                  </tr>
                )}
                {rows.map((row, i) => (
                  <tr
                    key={row.name}
                    style={{ backgroundColor: i % 2 === 0 ? PARCH : PARCH2, borderBottom: `1px solid ${FOREST}12` }}
                  >
                    <td className="px-4 py-3 font-semibold" style={{ color: FOREST }}>
                      <div className="flex flex-col gap-1">
                        {row.name}
                        {row.medicinal && (
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide w-fit"
                            style={{ backgroundColor: `${MEDICINAL_COLOR}15`, color: MEDICINAL_COLOR, border: `1px solid ${MEDICINAL_COLOR}30` }}
                          >
                            <FlaskConical className="h-2.5 w-2.5" /> Medicinal
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: `${FOREST}cc` }}>{row.indoors[zone]}</td>
                    <td className="px-4 py-3" style={{ color: `${FOREST}cc` }}>{row.transplant[zone]}</td>
                    <td className="px-4 py-3" style={{ color: `${FOREST}cc` }}>{row.directSow[zone]}</td>
                    <td className="px-4 py-3" style={{ color: `${FOREST}cc` }}>{row.maturity}</td>
                    <td className="px-4 py-3 text-xs hidden lg:table-cell" style={{ color: `${FOREST}88` }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { title: 'Starting from seed indoors', body: '"Weeks before last frost" means count backward from your last frost date. If last frost is May 15 and the crop needs 8 weeks, start seeds indoors around March 20.' },
            { title: 'Direct sow timing', body: 'Crops listed as "after last frost" are frost-sensitive. Crops listed as "before last frost" tolerate cold and actually prefer cool soil for germination.' },
            { title: 'Fruit trees and perennial fruits', body: 'Dates shown are for planting bare-root stock or nursery transplants. Fruit trees rarely produce in year one — plan for a 2–5 year runway to full production.' },
            { title: 'Blueberries: pollination note', body: 'Blueberries require cross-pollination between at least 2–3 different varieties to produce well. Single plants may fruit minimally or not at all.' },
          ].map(({ title, body }) => (
            <div key={title} className="rounded-xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
              <h3 className="font-semibold text-sm mb-1.5" style={{ color: FOREST }}>{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: `${FOREST}99` }}>{body}</p>
            </div>
          ))}
        </div>

        {/* Back link */}
        <Link href="/resources" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: `${FOREST}88` }}>
          <ArrowLeft className="h-4 w-4" /> All Resources
        </Link>

      </main>
    </div>
  )
}
