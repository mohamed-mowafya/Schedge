export function useCopyLink(sessionUUID?: string) {
  const copyLink = () => {
    if (!sessionUUID) return;
    const shareUrl = `${window.location.origin}/calendar/${sessionUUID}`;
    navigator.clipboard.writeText(shareUrl);
  };
  return { copyLink };
}
