import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link as LinkIcon, Download, Loader2 } from "lucide-react";
import { StemPlayer } from "./StemPlayer";
import { useToast } from "@/hooks/use-toast";

export const CustomStems = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedStems, setProcessedStems] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [soundcloudUrl, setSoundcloudUrl] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "audio/mpeg") {
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} ready to process`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an MP3 file",
        variant: "destructive",
      });
    }
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setProcessedStems({
        vocals: "/placeholder-audio.mp3",
        bass: "/placeholder-audio.mp3",
        drums: "/placeholder-audio.mp3",
        other: "/placeholder-audio.mp3",
      });
      setIsProcessing(false);
      toast({
        title: "Processing complete!",
        description: "Your stems are ready to play and download",
      });
    }, 5000);
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your stems are being downloaded as a ZIP file",
    });
  };

  if (processedStems) {
    return (
      <section className="min-h-screen bg-gradient-dark py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Your Custom Stems
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Play with your stems and download them when you're ready
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setProcessedStems(null)} variant="secondary">
                Process Another Track
              </Button>
              <Button onClick={handleDownload} className="shadow-glow">
                <Download className="w-4 h-4 mr-2" />
                Download Stems (.zip)
              </Button>
            </div>
          </div>
          <StemPlayer stems={processedStems} songName="Your Custom Track" />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-dark py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Make Your Own Stems
          </h2>
          <p className="text-muted-foreground text-lg">
            Upload your track or paste a link to split it into stems
          </p>
        </div>

        <div className="bg-card rounded-xl p-8 shadow-elevated border border-border">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="upload">Upload MP3</TabsTrigger>
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
              <TabsTrigger value="soundcloud">SoundCloud</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer text-lg font-medium hover:text-primary transition-colors"
                >
                  Click to upload or drag and drop
                </Label>
                <p className="text-sm text-muted-foreground mt-2">MP3 files only</p>
                <Input
                  id="file-upload"
                  type="file"
                  accept="audio/mpeg"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              {uploadedFile && (
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="text-sm font-medium">
                    Selected file: {uploadedFile.name}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="youtube" className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="youtube-url" className="text-base">
                  YouTube URL
                </Label>
                <div className="flex gap-2">
                  <LinkIcon className="w-5 h-5 text-muted-foreground mt-3" />
                  <Input
                    id="youtube-url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="soundcloud" className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="soundcloud-url" className="text-base">
                  SoundCloud URL
                </Label>
                <div className="flex gap-2">
                  <LinkIcon className="w-5 h-5 text-muted-foreground mt-3" />
                  <Input
                    id="soundcloud-url"
                    placeholder="https://soundcloud.com/..."
                    value={soundcloudUrl}
                    onChange={(e) => setSoundcloudUrl(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Button
              onClick={handleProcess}
              disabled={!uploadedFile && !youtubeUrl && !soundcloudUrl || isProcessing}
              className="w-full h-14 text-lg shadow-glow"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing... This may take a few minutes
                </>
              ) : (
                "Process Track"
              )}
            </Button>
          </div>

          {isProcessing && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Estimated time remaining</span>
                <span>~3 minutes</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full animate-pulse" style={{ width: "40%" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
