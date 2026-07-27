#!/usr/bin/env bash
# SessionStart reminder for two weekly-cadence recurring activities on this project:
# the "SEO ranking check" and the continuous-improvement weekly idea generation.
# Neither can be run unattended (SEO check needs claude-in-chrome), so this hook
# only injects a reminder for Claude to check whether either is due (~7+ days since
# the last logged entry) and, if so, proactively suggest running it with the user.
set -uo pipefail

today_epoch=$(date +%s)

# Require the date to appear directly in the matched heading line (not just
# anywhere in the file) so template/placeholder lines like "## Week of YYYY-MM-DD"
# in the format-instructions footer are excluded, not mistaken for the latest entry.
seo_date=$(grep -oE '## SEO ranking check.*[0-9]{4}-[0-9]{2}-[0-9]{2}' SEO_RECOMMENDATIONS.md 2>/dev/null | tail -1 | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' | head -1)
ci_date=$(grep -oE '## Week of [0-9]{4}-[0-9]{2}-[0-9]{2}' CONTINUOUS_IMPROVEMENT.md 2>/dev/null | tail -1 | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}')

msg=""
due_any=0

if [ -n "$seo_date" ]; then
  seo_epoch=$(date -d "$seo_date" +%s 2>/dev/null || true)
  if [ -n "$seo_epoch" ]; then
    days=$(( (today_epoch - seo_epoch) / 86400 ))
    if [ "$days" -ge 7 ]; then
      msg="$msg SEO ranking check is due (last run $seo_date, ${days}d ago; method in seo-ranking-routine-2026-07 memory)."
      due_any=1
    fi
  fi
else
  msg="$msg No SEO ranking check has been logged yet (see seo-ranking-routine-2026-07 memory)."
  due_any=1
fi

if [ -n "$ci_date" ]; then
  ci_epoch=$(date -d "$ci_date" +%s 2>/dev/null || true)
  if [ -n "$ci_epoch" ]; then
    days=$(( (today_epoch - ci_epoch) / 86400 ))
    if [ "$days" -ge 7 ]; then
      msg="$msg Continuous-improvement weekly idea generation is due (last run $ci_date, ${days}d ago; see continuous_improvement_stream_2026-07 memory)."
      due_any=1
    fi
  fi
fi

if [ "$due_any" -eq 1 ]; then
  msg="B-Acoustics project reminder:$msg Both require an interactive session with the user (the SEO check needs claude-in-chrome browser automation). Proactively surface this near the start of the conversation, and mention any other pending/parked action items noted in SEO_RECOMMENDATIONS.md or CONTINUOUS_IMPROVEMENT.md."
  esc=$(printf '%s' "$msg" | sed 's/\\/\\\\/g; s/"/\\"/g')
  printf '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"%s"}}' "$esc"
else
  printf '{}'
fi
