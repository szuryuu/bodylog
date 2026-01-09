export const PROGRAM_CONFIG = {
  startDate: "2025-12-30",
  totalWeeks: 12,
  workoutDays: ["monday", "tuesday", "wednesday", "friday", "saturday"],
  restDays: ["thursday", "sunday"],
};

export function getCurrentWeek(): number {
  const now = new Date();
  const start = new Date(PROGRAM_CONFIG.startDate);

  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const week = Math.ceil(diffDays / 7);

  return Math.max(1, Math.min(week, PROGRAM_CONFIG.totalWeeks));
}

export function getTodayDay(): string {
  const dayMap = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return dayMap[new Date().getDay()];
}

export function isTodayWorkoutDay(): boolean {
  return PROGRAM_CONFIG.workoutDays.includes(getTodayDay());
}
