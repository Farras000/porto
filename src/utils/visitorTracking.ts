interface VisitorData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  org: string;
}

export const trackVisitor = async () => {
  if (sessionStorage.getItem('visited')) {
    return;
  }

  try {
    const ipRes = await fetch('https://ipapi.co/json/');
    const ipData: VisitorData = await ipRes.json();

    const ua = navigator.userAgent;
    let deviceType = 'Desktop';
    if (/Mobi|Android/i.test(ua)) {
      deviceType = 'Mobile';
    } else if (/Tablet|iPad/i.test(ua)) {
      deviceType = 'Tablet';
    }

    const { width, height } = window.screen;
    const screenSize = `${width}x${height}`;
    const language = navigator.language;
    const visitedAt = new Date().toLocaleString();

    // Basic OS extraction
    let os = 'Unknown OS';
    if (ua.indexOf('Win') !== -1) os = 'Windows';
    else if (ua.indexOf('Mac') !== -1) os = 'MacOS';
    else if (ua.indexOf('Linux') !== -1) os = 'Linux';
    else if (ua.indexOf('Android') !== -1) os = 'Android';
    else if (ua.indexOf('like Mac') !== -1) os = 'iOS';

    // Basic Browser extraction
    let browser = 'Unknown Browser';
    if (ua.indexOf('Firefox') !== -1) browser = 'Firefox';
    else if (ua.indexOf('SamsungBrowser') !== -1) browser = 'Samsung Internet';
    else if (ua.indexOf('Opera') !== -1 || ua.indexOf('OPR') !== -1) browser = 'Opera';
    else if (ua.indexOf('Trident') !== -1) browser = 'Internet Explorer';
    else if (ua.indexOf('Edge') !== -1) browser = 'Edge';
    else if (ua.indexOf('Chrome') !== -1) browser = 'Chrome';
    else if (ua.indexOf('Safari') !== -1) browser = 'Safari';

    const location = `${ipData.city || 'Unknown'}, ${ipData.region || 'Unknown'}, ${ipData.country_name || 'Unknown'}`;

    const embed = {
      title: '🔔 New Visitor',
      color: 0x5865f2,
      fields: [
        { name: 'IP Address', value: ipData.ip || 'Unknown', inline: true },
        { name: 'Location', value: location, inline: true },
        { name: 'ISP', value: ipData.org || 'Unknown', inline: true },
        { name: 'Device Type', value: deviceType, inline: true },
        { name: 'OS', value: os, inline: true },
        { name: 'Browser', value: browser, inline: true },
        { name: 'Screen Size', value: screenSize, inline: true },
        { name: 'Language', value: language, inline: true },
        { name: 'Visited At', value: visitedAt, inline: false },
      ],
    };

    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ embeds: [embed] }),
      });
      sessionStorage.setItem('visited', 'true');
    } else {
      console.warn("VITE_DISCORD_WEBHOOK_URL is not set.");
    }
  } catch (err) {
    console.error('Failed to track visitor:', err);
  }
};
