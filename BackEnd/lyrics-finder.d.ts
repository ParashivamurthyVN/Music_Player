declare module 'lyrics-finder' {
    function lyricsFinder(artist: string, song: string): Promise<string>;
    export default lyricsFinder;
  }