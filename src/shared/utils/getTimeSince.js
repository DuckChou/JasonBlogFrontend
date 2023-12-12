export function timeSince(dateString) {
  const now = new Date();
  const date = new Date(dateString)
  const secondsPast = Math.floor((now - date) / 1000);

  if(secondsPast < 60) {
    return secondsPast === 1 ? '1 second ago' : `${secondsPast} seconds ago`;
  }
  if(secondsPast < 3600) {
    const minutes = Math.floor(secondsPast/60);
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }
  if(secondsPast <= 86400) {
    const hours = Math.floor(secondsPast/3600);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  if(secondsPast > 86400) {
    const day = Math.floor(secondsPast/86400);
    if(day < 30) {
      return day === 1 ? '1 day ago' : `${day} days ago`;
    } else if(day < 365) {
      const months = Math.floor(day/30);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    } else {
      const years = Math.floor(day/365);
      return years === 1 ? '1 year ago' : `${years} years ago`;
    }
  }
}