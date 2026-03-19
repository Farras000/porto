interface VisitorData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  org: string;
}

interface WebhookEmbed {
  title: string;
  color: number;
  fields: Array<{ name: string; value: string; inline: boolean }>;
}

const getDeviceType = (ua: string): string => {
  if (/Mobi|Android/i.test(ua)) return 'Mobile';
  if (/Tablet|iPad/i.test(ua)) return 'Tablet';
  return 'Desktop';
};

const getOS = (ua: string): string => {
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'MacOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('like Mac')) return 'iOS';
  return 'Unknown OS';
};

const getBrowser = (ua: string): string => {
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('SamsungBrowser')) return 'Samsung Internet';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  if (ua.includes('Trident')) return 'Internet Explorer';
  if (ua.includes('Edge') || ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Unknown Browser';
};

const fetchIpData = async (): Promise<VisitorData | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch IP data:', error);
    return null; // Graceful fallback if IP API fails
  }
};

const sendToDiscord = async (embed: WebhookEmbed, webhookUrl: string): Promise<void> => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
    
    if (!response.ok) throw new Error(`Discord API error! status: ${response.status}`);
  } catch (error) {
    console.error('Failed to send webhook to Discord:', error);
  }
};

export const trackVisitor = async (): Promise<void> => {
  // Prevent duplicate tracking in the same session
  if (sessionStorage.getItem('visited')) return;

  try {
    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("VITE_DISCORD_WEBHOOK_URL is not set in environment variables.");
      return;
    }

    const ipData = await fetchIpData();
    const ua = navigator.userAgent;
    const { width, height } = window.screen;
    
    const location = ipData 
      ? `${ipData.city || 'Unknown'}, ${ipData.region || 'Unknown'}, ${ipData.country_name || 'Unknown'}`
      : 'Unknown Location';

    const embed: WebhookEmbed = {
      title: '🔔 New Visitor',
      color: 0x5865f2,
      fields: [
        { name: 'IP Address', value: ipData?.ip || 'Unknown', inline: true },
        { name: 'Location', value: location, inline: true },
        { name: 'ISP', value: ipData?.org || 'Unknown', inline: true },
        { name: 'Device Type', value: getDeviceType(ua), inline: true },
        { name: 'OS', value: getOS(ua), inline: true },
        { name: 'Browser', value: getBrowser(ua), inline: true },
        { name: 'Screen Size', value: `${width}x${height}`, inline: true },
        { name: 'Language', value: navigator.language || 'Unknown', inline: true },
        { name: 'Visited At', value: new Date().toLocaleString(), inline: false },
      ],
    };

    await sendToDiscord(embed, webhookUrl);
    
    // Mark as visited only after successful tracking
    sessionStorage.setItem('visited', 'true');
    
  } catch (err) {
    console.error('An unexpected error occurred during visitor tracking:', err);
  }
};
