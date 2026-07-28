#!/usr/bin/env bash
# SessionStart hook for this project. Two jobs:
# 1. Always surface STATUS.md's "Open items" table (the consolidated rollup
#    across SEO_RECOMMENDATIONS.md, CONTINUOUS_IMPROVEMENT.md,
#    DESIGN_FEEDBACK.md, and Photo request list.md) so a fresh session gets
#    the current punch list without needing to ask or open 4 files.
# 2. Keep the original cadence check for two weekly-cadence recurring
#    activities ("SEO ranking check" and the continuous-improvement weekly
#    idea generation) -- neither can run unattended (the SEO check needs
#    claude-in-chrome), so this flags when either is ~7+ days stale.
set -uo pipefail

today_epoch=$(date +%s)

# Require the date to appear directly in the matched heading line (not just
# anywhere in the file) so template/placeholder lines like "## Week of YYYY-MM-DD"
# in the format-instructions footer are excluded, not mistaken for the latest entry.
seo_date=$(grep -oE '## SEO ranking check.*[0-9]{4}-[0-9]{2}-[0-9]{2}' SEO_RECOMMENDATIONS.md 2>/dev/null | tail -1 | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' | head -1)
ci_date=$(grep -oE '## Week of [0-9]{4}-[0-9]{2}-[0-9]{2}' CONTINUOUS_IMPROVEMENT.md 2>/dev/null | tail -1 | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}')

cadence_msg=""

if [ -n "$seo_date" ]; then
  seo_epoch=$(date -d "$seo_date" +%s 2>/dev/null || true)
  if [ -n "$seo_epoch" ]; then
    days=$(( (today_epoch - seo_epoch) / 86400 ))
    if [ "$days" -ge 7 ]; then
      cadence_msg="$cadence_msg SEO ranking check is due (last run $seo_date, ${days}d ago; method in seo-ranking-routine-2026-07 memory)."
    fi
  fi
else
  cadence_msg="$cadence_msg No SEO ranking check has been logged yet (see seo-ranking-routine-2026-07 memory)."
fi

if [ -n "$ci_date" ]; then
  ci_epoch=$(date -d "$ci_date" +%s 2>/dev/null || true)
  if [ -n "$ci_epoch" ]; then
    days=$(( (today_epoch - ci_epoch) / 86400 ))
    if [ "$days" -ge 7 ]; then
      cadence_msg="$cadence_msg Continuous-improvement weekly idea generation is due (last run $ci_date, ${days}d ago; see continuous_improvement_stream_2026-07 memory)."
    fi
  fi
fi

if [ -n "$cadence_msg" ]; then
  cadence_msg="Cadence reminder:$cadence_msg (Both need an interactive session with claude-in-chrome for the SEO check.)"
fi

open_items=$(awk '/^## Open items/{flag=1; next} /^## /{flag=0} flag' STATUS.md 2>/dev/null)

full_msg="B-Acoustics project status (from STATUS.md, the consolidated tracker across all trackers -- read that file directly for full detail/history, this is just the current punch list):
${open_items}
${cadence_msg}
Proactively surface anything from this list that's relevant to what the user asks for this session."

esc=$(printf '%s' "$full_msg" | sed 's/\\/\\\\/g; s/"/\\"/g' | awk '{printf "%s\\n", $0}')
printf '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"%s"}}' "$esc"
