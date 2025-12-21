const startOfToday = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function employmentStatusLabel(dateIso: string): string {
  const date = new Date(dateIso)
  return date > startOfToday() ? 'Employed soon' : 'Currently employed'
}

export function terminationStatusLabel(dateIso: string | null): string {
  if (!dateIso) return '—'
  const date = new Date(dateIso)
  return date > startOfToday() ? 'To be terminated' : 'Terminated'
}
