import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import { extractVideoId, getThumbnailUrl } from "@/lib/youtube";
import { extractRecipeFromTranscript } from "@/lib/extractRecipe";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL. Please provide a valid YouTube video link." },
        { status: 400 }
      );
    }

    // Fetch transcript
    let transcript: string;
    let videoTitle = "Cooking Video";

    try {
      const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
      transcript = transcriptItems.map((item) => item.text).join(" ");
    } catch {
      return NextResponse.json(
        {
          error:
            "Could not fetch transcript. The video may not have captions enabled, or may be private/restricted.",
        },
        { status: 422 }
      );
    }

    if (!transcript || transcript.trim().length < 100) {
      return NextResponse.json(
        { error: "The transcript is too short to extract a recipe from." },
        { status: 422 }
      );
    }

    // Extract recipe using AI
    const result = await extractRecipeFromTranscript(transcript, videoTitle);

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 422 });
    }

    const recipe = {
      ...result,
      videoId,
      videoTitle,
      thumbnailUrl: getThumbnailUrl(videoId),
    };

    return NextResponse.json({ success: true, recipe });
  } catch (error) {
    console.error("Extraction error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
