# AI image prompts — B-Acoustics Google Ads asset group

For the 5 missing slots (2 horizontal, 2 square, 1 vertical) in the "Add
images to your asset group" picker. Mixed target market this round — B2B
corporate office + residential/WFH homeowner, matching the site's actual
scope (`knowsAbout`/service pages cover commercial, residential, and
industrial). Style matched to the existing uploaded photos: documentary-
style, warm neutral tones, natural light, no visible branding/logos, no text
overlay (Google Ads adds its own text over these).

---

### 1. Horizontal (1.91:1) — Commercial

```
A wide, documentary-style photograph of an acoustic consultant installing
fabric-wrapped acoustic wall panels in a modern Singapore corporate office
meeting room. Warm neutral color palette (beige, cream, soft charcoal),
natural daylight from floor-to-ceiling windows, city skyline softly visible
outside. The installer wears a light-colored collared shirt, focused on
aligning a panel against the wall. Clean, minimal, professional B2B
aesthetic — no text, no logos, no visible brand names. Shot on a full-frame
camera, shallow depth of field, photorealistic, editorial commercial
photography style. Landscape orientation, 1.91:1 aspect ratio.
```

### 2. Horizontal (1.91:1) — Residential / home office

```
A wide, photorealistic photograph of a bright home office/study in a
Singapore HDB or condo apartment, one wall fitted with fabric-wrapped
acoustic panels in warm muted tones (oatmeal, soft terracotta, charcoal). A
homeowner in casual smart-casual clothing sits at a desk in the middle
distance, relaxed, on a video call with headphones, soft window light,
plants, a sense of quiet focus. Lived-in but tidy residential styling, not
a showroom. No text, no logos, no visible screen content. Editorial
lifestyle/interiors photography style, photorealistic. Landscape
orientation, 1.91:1 aspect ratio.
```

### 3. Square (1:1) — Neutral / material

```
A close-up, photorealistic photograph of hands holding a swatch of acoustic
felt panel material next to a tape measure and a small notebook, on a
wooden desk with soft natural window light. Warm, muted color palette
(cream, oatmeal, soft charcoal). Shallow depth of field, focus on the
material texture. No visible faces, no text, no logos. Editorial product/
craft photography style, photorealistic. Square 1:1 aspect ratio.
```

### 4. Square (1:1) — Residential / WFH homeowner

```
A photorealistic photograph of a homeowner in their 30s-40s, casual home
attire, sitting at a small home-office desk in front of a wall of
fabric-wrapped acoustic panels, mid-conversation on a laptop video call,
relaxed and comfortable expression. Warm residential interior — a shelf
with books/plants softly out of focus behind the panels. Soft natural
daylight, warm neutral tones. Calm, quiet, productive mood, not corporate.
No text, no logos, no visible screen content. Editorial lifestyle
photography style, photorealistic. Square 1:1 aspect ratio.
```

### 5. Vertical (4:5) — Commercial

```
A vertical, photorealistic photograph of an acoustic consultant standing
back to inspect a newly installed wall of fabric-wrapped acoustic panels in
a modern Singapore office, arms relaxed, quiet confident posture, seen from
behind/three-quarter angle so the finished wall is the focal point. Warm
neutral tones, soft natural light, minimal modern interior. No text, no
logos, no visible face needed. Editorial architecture/portrait hybrid
photography style, photorealistic. Vertical, 4:5 aspect ratio.
```

---

**Mix rationale:** 2 commercial (installer at work, finished install from
behind), 2 residential/WFH (homeowner using an acoustically-treated home
office — the fastest-growing intent for a Singapore audience given how
common WFH/hybrid work is), 1 neutral material close-up that reads fine
either way. Adjust the ratio if you want to lean further into either
segment — swap #1 or #5 to a residential scene, or #2/#4 back to commercial,
using the same style language.

**Tips:**
- If your tool has a separate aspect-ratio selector, set it explicitly
  (1.91:1 / 1:1 / 4:5) rather than relying on the aspect ratio described in
  the prompt text alone — more reliable.
- Generate 2-3 variations per slot and pick the one that best matches the
  existing 5 uploaded photos' tone before adding to the asset group.
- Don't reuse any of these on the website itself or GBP — this batch is for
  Google Ads asset-group visuals only, kept separate from the site's
  real-photos-only policy for portfolio/case-study content.

---

## Which AI image tool for the most life-like result?

Gemini's built-in generator (the "Generate images" button in that same
Google Ads picker) is convenient but not the strongest for photorealistic
humans — hands, skin texture, and natural interior lighting tend to look
slightly synthetic. For this specific job (realistic people in real-looking
rooms, no obvious "AI sheen"), ranked by fit:

1. **Midjourney (v7)** — currently the strongest for editorial/lifestyle
   photorealism specifically: natural skin texture, believable hands,
   convincing ambient light. Best pick if the goal is "could pass as a real
   stock photo." Downsides: subscription-only, prompting works a bit
   differently (shorter, comma-separated descriptors read better than full
   sentences), and there's ongoing scrutiny over its training-data
   licensing — worth knowing if that matters for how comfortable you are
   using the output in paid ads.
2. **FLUX1.1 [pro]** (Black Forest Labs — available via their API or hosts
   like Freepik/Leonardo) — very close behind Midjourney on realism, often
   cited as the current best for accurate hands and skin detail
   specifically. Good second choice, several hosted UIs make it as easy to
   use as Gemini.
3. **Adobe Firefly** — a notch below Midjourney/FLUX on raw photorealism,
   but it's trained only on licensed Adobe Stock/public-domain content,
   making it the safest choice if commercial/legal cleanliness of the ad
   images matters more than squeezing out the last bit of realism. Also
   integrates directly with Photoshop if you want to touch up afterward.
4. **ChatGPT / GPT-image-1** — strong prompt-following (does what you
   describe very literally, good for precise scene composition) and decent
   realism, though people still sometimes come out a bit "smooth"/posed
   compared to Midjourney or FLUX. Convenient if you're already using
   ChatGPT and want to iterate conversationally.

**Practical suggestion:** try the same prompt in Midjourney or FLUX first
for the 2 "person" shots (#2 and #4 above, and #1/#5 if you want the
installer to look maximally real) — that's where Gemini's limits show up
most. The 2 people-free shots (#3 material close-up, and #2/#4 if you swap
them to empty-room versions) are safe to generate in Gemini either way,
since there's no face/hands to render.
