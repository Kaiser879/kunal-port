export type CaseStudySection = {
  label: string;
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type CaseStudy = {
  challenge: {
    title: string;
    paragraphs: string[];
  };
  flow: { label: string; value: string }[];
  sections: CaseStudySection[];
  outcomes: { value: string; label: string }[];
  validation: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  'your-next-binge': {
    challenge: {
      title: 'A recommendation only helps if it is available here.',
      paragraphs: [
        'Streaming catalogs vary by region, and a title that looks interesting is a dead end if it cannot be streamed, rented, or bought in India. Your Next Binge puts India availability at the center of discovery, then adds semantic search and a watchlist around that constraint.',
      ],
    },
    flow: [
      { label: 'CATALOG', value: 'TMDB · India availability' },
      { label: 'QUERY', value: 'Embedding server' },
      { label: 'RANKING', value: 'On-device vector search' },
      { label: 'FALLBACK', value: 'Keyword → local title' },
    ],
    sections: [
      {
        label: '01 / DISCOVERY',
        title: 'Filter by what can actually be watched.',
        paragraphs: [
          'Home discovery uses TMDB data scoped to India. Trending titles are requested through the discover endpoint because TMDB’s trending endpoint ignores the watch-region filter. Provider availability is grouped into Stream, Rent, and Buy so ad-supported options are not silently excluded.',
          'The detail view carries those offers forward, and My List stores title snapshots so a saved list survives an app restart.',
        ],
      },
      {
        label: '02 / SEARCH',
        title: 'Keep semantic matching local to the device.',
        paragraphs: [
          'A small FastAPI service encodes the query. The app compares that vector on-device against a bundled index of India-scoped titles, avoiding a network request for every ranking operation.',
          'Search has explicit fallbacks: TMDB keyword results intersected with the bundled index, then local title matching if the network is unavailable. The interface reports which mode produced the results.',
        ],
      },
      {
        label: '03 / TRADEOFFS',
        title: 'Ship only the data the index needs.',
        paragraphs: [
          'The bundled index contains TMDB IDs, titles, years, provider names, and numeric vectors. Descriptions and artwork are fetched at runtime rather than redistributed in the index. This keeps the local search corpus small and avoids bundling metadata that can be requested when needed.',
          'Trailer playback was cut because the Vega Virtual Device image does not include the required WebView module. The detail view uses the backdrop instead.',
        ],
      },
    ],
    outcomes: [
      { value: '1,198', label: 'India-scoped titles in the bundled index' },
      { value: '31–33 ms', label: 'Five semantic search gate queries on the VVD' },
      { value: 'Persistent', label: 'Watchlist restored after force-stop and relaunch' },
    ],
    validation: [
      'Debug and Release builds installed and launched on the Vega Virtual Device.',
      'The tested live home showed 14 trending titles and 14 titles available on selected services.',
      'Physical Fire TV hardware was not tested. TMDB artwork was exercised but not pixel-inspected.',
    ],
  },
  mem: {
    challenge: {
      title: 'People remember what a file said, not what it was called.',
      paragraphs: [
        'A filename like “l.pdf” gives little help when someone remembers only that the document discussed Linux process scheduling. mem indexes local document text and lets the search explain how it interpreted the request.',
      ],
    },
    flow: [
      { label: 'SCAN', value: 'Filesystem' },
      { label: 'EXTRACT', value: 'PDF · Office · OCR' },
      { label: 'INDEX', value: 'SQLite FTS5' },
      { label: 'RANK', value: 'Parsed query · BM25' },
    ],
    sections: [
      {
        label: '01 / INDEXING',
        title: 'Keep the source text and search index in sync.',
        paragraphs: [
          'The scanner extracts text from PDFs and common office formats, then stores searchable terms in SQLite FTS5. The index is external-content: it stores the inverted word index rather than a second copy of each document. SQL triggers keep it synchronized with the source rows.',
          'Incremental scans skip files whose size and modification time have not changed. In the documented 46-file sample, a second scan took 4 ms compared with 800 ms for the first.',
        ],
      },
      {
        label: '02 / QUERYING',
        title: 'Turn natural phrasing into explicit constraints.',
        paragraphs: [
          'Before SQLite sees a query, mem removes stop words, extracts file-type and date hints, and lightly singularizes terms. The interface shows the parsed keywords and constraints so people can correct a mistaken interpretation.',
          'Results use BM25 with stronger weighting for filename matches. The displayed confidence is rank-normalized relative to the current results because BM25 scores do not have a meaningful absolute percentage scale.',
        ],
      },
      {
        label: '03 / TRUST',
        title: 'An honest miss beats a confident wrong answer.',
        paragraphs: [
          'When nothing matches, mem reports the miss and the constraints that excluded possible files. It does not fill the page with unrelated recent documents. This keeps the result list useful even when the search fails.',
          'OCR is optional and uses Tesseract when installed. A quality gate rejects noisy output; the tool targets printed text and does not identify what an image depicts or reliably read handwriting.',
        ],
      },
    ],
    outcomes: [
      { value: '4 ms', label: 'Second scan of a documented 46-file sample' },
      { value: 'Local-first', label: 'No network service or LLM required for search' },
      { value: 'Preview-first', label: 'Organize plans do not write unless explicitly applied' },
    ],
    validation: [
      'Search, indexing, query parsing, ranking, OCR quality gating, and terminal UI behavior are covered by the project’s documented tests.',
      'OCR depends on optional Tesseract. Scanned PDFs are not covered by the extraction pipeline.',
      'Search is deterministic full-text retrieval; it does not understand image subjects or use an LLM.',
    ],
  },
  airblued: {
    challenge: {
      title: 'Manage Bluetooth without handing control to a shell command.',
      paragraphs: [
        'AirBlued is a terminal interface for Linux Bluetooth that talks to the running bluetoothd service over system D-Bus. The application keeps device work and terminal rendering on separate paths so discovery and actions can report back without blocking the interface loop.',
      ],
    },
    flow: [
      { label: 'INPUT', value: 'ratatui interface' },
      { label: 'STATE', value: 'Application event loop' },
      { label: 'CLIENT', value: 'bluer · D-Bus' },
      { label: 'SERVICE', value: 'bluetoothd' },
    ],
    sections: [
      {
        label: '01 / ARCHITECTURE',
        title: 'One application state, with background work reported as events.',
        paragraphs: [
          'The event loop owns application state. Bluetooth work runs in background tasks and sends results through an event channel, so tasks do not mutate UI state directly. Input events and a ticker feed the same loop.',
          'Device actions are short-lived tasks with timeouts. They report completion through the channel, after which the app refreshes the relevant device state.',
        ],
      },
      {
        label: '02 / DEVICE WORK',
        title: 'Discovery and actions stay visible in the terminal.',
        paragraphs: [
          'The interface can enumerate known devices, stream live scan results sorted by signal strength, and connect, disconnect, trust, untrust, rename, or remove a device. Removing a device uses a confirmation dialog.',
          'Stopping a scan drops its BlueZ discovery session, so the radio scan ends with the screen rather than continuing in the background.',
        ],
      },
      {
        label: '03 / CURRENT SCOPE',
        title: 'The implemented milestones define the boundary.',
        paragraphs: [
          'The documented implementation covers the scaffold, read-only device browsing, live scanning, and device actions. Pairing-agent prompts, adapter settings, filtering, and GATT browsing remain future work.',
          'The project requires Linux with BlueZ running, Rust 1.88 or newer, and permission to use the system D-Bus.',
        ],
      },
    ],
    outcomes: [
      { value: 'No shell-out', label: 'Bluetooth operations use bluer over system D-Bus' },
      { value: 'Event-driven', label: 'Background tasks report through the app event channel' },
      { value: 'Milestones 1–3', label: 'Scaffold, live reads, scan, and device actions implemented' },
    ],
    validation: [
      'The README documents testing on Linux with BlueZ and a Bluetooth adapter.',
      'Pairing-agent prompts and adapter settings are not implemented yet.',
      'The project requires system D-Bus access; policy prompts may apply for privileged operations.',
    ],
  },
};
