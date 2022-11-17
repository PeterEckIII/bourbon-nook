import { useState, useEffect } from "react";

export default function useTimezone() {
  const [tz, setTz] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const timezoneFromBrowser =
        window.Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTz(timezoneFromBrowser);
    }
  }, [tz]);

  return tz;
}
