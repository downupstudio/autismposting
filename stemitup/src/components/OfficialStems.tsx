import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StemPlayer } from "./StemPlayer";
import { ChevronRight } from "lucide-react";

// Mock data - replace with actual data structure
const mockData = {
  artists: [
    {
      id: "artist1",
      name: "The Example Band",
      albums: [
        {
          id: "album1",
          name: "Greatest Hits",
          songs: [
            {
              id: "song1",
              name: "Demo Track",
              stems: {
                vocals: "/placeholder-audio.mp3",
                bass: "/placeholder-audio.mp3",
                drums: "/placeholder-audio.mp3",
                other: "/placeholder-audio.mp3",
              },
            },
          ],
        },
      ],
    },
  ],
};

export const OfficialStems = () => {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  const artist = mockData.artists.find((a) => a.id === selectedArtist);
  const album = artist?.albums.find((a) => a.id === selectedAlbum);
  const song = album?.songs.find((s) => s.id === selectedSong);

  const resetSelection = () => {
    setSelectedArtist(null);
    setSelectedAlbum(null);
    setSelectedSong(null);
  };

  return (
    <section className="min-h-screen bg-gradient-dark py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Official Stems
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse and play professionally separated stems from your favorite artists
          </p>
        </div>

        {!selectedSong ? (
          <div className="space-y-8">
            {/* Artist Selection */}
            {!selectedArtist && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Select an Artist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockData.artists.map((artist) => (
                    <Button
                      key={artist.id}
                      onClick={() => setSelectedArtist(artist.id)}
                      variant="secondary"
                      className="h-auto p-6 justify-between hover:border-primary transition-all"
                    >
                      <span className="text-lg font-medium">{artist.name}</span>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Album Selection */}
            {selectedArtist && !selectedAlbum && (
              <div>
                <Button
                  onClick={resetSelection}
                  variant="ghost"
                  className="mb-4 text-primary hover:text-primary/80"
                >
                  ← Back to Artists
                </Button>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Select an Album
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {artist?.albums.map((album) => (
                    <Button
                      key={album.id}
                      onClick={() => setSelectedAlbum(album.id)}
                      variant="secondary"
                      className="h-auto p-6 justify-between hover:border-primary transition-all"
                    >
                      <span className="text-lg font-medium">{album.name}</span>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Song Selection */}
            {selectedAlbum && !selectedSong && (
              <div>
                <Button
                  onClick={() => setSelectedAlbum(null)}
                  variant="ghost"
                  className="mb-4 text-primary hover:text-primary/80"
                >
                  ← Back to Albums
                </Button>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Select a Song
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {album?.songs.map((song) => (
                    <Button
                      key={song.id}
                      onClick={() => setSelectedSong(song.id)}
                      variant="secondary"
                      className="h-auto p-6 justify-between hover:border-primary transition-all"
                    >
                      <span className="text-lg font-medium">{song.name}</span>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Button
              onClick={() => setSelectedSong(null)}
              variant="ghost"
              className="mb-6 text-primary hover:text-primary/80"
            >
              ← Back to Songs
            </Button>
            <StemPlayer stems={song.stems} songName={song.name} />
          </div>
        )}
      </div>
    </section>
  );
};
