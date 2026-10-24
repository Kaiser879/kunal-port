export type Project = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  implementationNote: string;
  technologies: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  devpostUrl?: string;
};

// Project details come from the local READMEs and source repositories. Add
// links only when the corresponding public repository or demo is verified.
export const projects: Project[] = [
  {
    title: 'Your Next Binge',
    slug: 'your-next-binge',
    summary: 'A Fire TV app for finding something you can actually watch in India.',
    description:
      'A React Native for Vega discovery app that checks streaming, rental, and purchase availability. It combines live TMDB data with an on-device semantic search index and watchlists that persist across restarts.',
    implementationNote:
      'The bundled index covers 1,198 India-scoped titles. Semantic search returned results in 31–33 ms on the Vega Virtual Device.',
    technologies: ['React Native for Vega', 'TypeScript', 'TMDB API', 'Vector search'],
    repositoryUrl: 'https://github.com/Kaiser879/YourNextBinge',
    devpostUrl: 'https://devpost.com/software/your-next-binge',
  },
  {
    title: 'mem',
    slug: 'mem',
    summary: 'Find files by what you remember, not what they’re named.',
    description:
      'A local-first file search tool that indexes document text and ranks results with SQLite FTS5. It extracts text from common office formats and PDFs, with an OCR quality gate for printed text in images.',
    implementationNote:
      'Search explains how it parsed a query and reports an honest miss instead of filling the results with unrelated files.',
    technologies: ['Go', 'SQLite FTS5', 'Bubble Tea', 'OCR'],
    repositoryUrl: 'https://github.com/Kaiser879/MeM',
  },
  {
    title: 'AirBlued',
    slug: 'airblued',
    summary: 'Manage Bluetooth devices from a terminal, without shelling out to bluetoothctl.',
    description:
      'A Rust terminal interface for Linux Bluetooth. It connects to bluetoothd over system D-Bus, supports live device discovery, and provides device actions such as connect, trust, rename, and remove.',
    implementationNote:
      'Background Bluetooth tasks report events to the application loop over a channel, keeping device work out of the terminal rendering path.',
    technologies: ['Rust', 'ratatui', 'bluer', 'D-Bus'],
    repositoryUrl: 'https://github.com/Kaiser879/AirBlued',
  },
];
