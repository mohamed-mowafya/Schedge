import { toast } from "react-toastify";

export function useCopyLink(sessionUUID?: string) {
  const copyLink = () => {
    if (!sessionUUID) return;
    const shareUrl = `${window.location.origin}/calendar/${sessionUUID}`;
    navigator.clipboard.writeText(shareUrl).catch(() => {
      toast.error("An error has occurred while copying the calendar's url.");
    });
  };
  return { copyLink };
}
