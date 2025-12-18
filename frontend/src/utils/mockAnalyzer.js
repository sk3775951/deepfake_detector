import { analyzeMedia } from "../services/api";

const handleAnalyze = async () => {
  if (!selectedFile) return;

  setIsAnalyzing(true);
  try {
    const result = await analyzeMedia(selectedFile);
    setVerificationResult(result);
  } catch (error) {
    console.error("Analysis failed:", error);
    alert("Failed to analyze media");
  } finally {
    setIsAnalyzing(false);
  }
};
