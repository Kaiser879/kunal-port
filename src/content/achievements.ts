export type Achievement = {
  competition: string;
  organizer: string;
  result: string;
  project: string;
  projectUrl: string;
  date?: string;
};

// Details supplied by Kunal. No year or exact placement was provided.
export const achievements: Achievement[] = [
  {
    competition: 'BuildX',
    organizer: 'MIT Kernel · Tech Club',
    result: 'Winner',
    project: 'MeM',
    projectUrl: 'https://github.com/Kaiser879/MeM',
  },
];
