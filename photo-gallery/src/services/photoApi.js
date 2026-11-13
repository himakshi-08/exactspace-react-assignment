// Picsum photo API client with proxy support and fallback resilience
const FALLBACK_PAGES = {
  1: [
    {
      id: "0",
      author: "Alejandro Escamilla",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/yC-YDelHvfQ",
      download_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "1",
      author: "Vadim Sherbakov",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/LNRyGwIJr5c",
      download_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "2",
      author: "Alex",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/N7XodRrbzS0",
      download_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "3",
      author: "Daniel Genser",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/GPPAjJicemU",
      download_url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "4",
      author: "Justin Leibow",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/pLo3qvi6CzU",
      download_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "5",
      author: "Alexander Shustov",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/nO1LjftnhYT",
      download_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80"
    }
  ],
  2: [
    {
      id: "6",
      author: "Danielle MacInnes",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/Ihx-2iqN4pc",
      download_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "7",
      author: "Greg Rakozy",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/_snqARKTgoc",
      download_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "8",
      author: "Christian Perner",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/t20UMIIdvnn",
      download_url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "9",
      author: "Jerry Meyer",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/xG5VJW-aWwA",
      download_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    }
  ],
  3: [
    {
      id: "10",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/6J--NXulQCs",
      download_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "11",
      author: "Tina Rataj",
      width: 2500,
      height: 1656,
      url: "https://unsplash.com/photos/P3OIncuhHZE",
      download_url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "12",
      author: "Vadim Sherbakov",
      width: 2500,
      height: 1657,
      url: "https://unsplash.com/photos/1Z2niiBPg5A",
      download_url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

export async function fetchPhotosPage(page = 1, limit = 10) {
  const directUrl = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
  const proxyUrl = `/api/picsum/v2/list?page=${page}&limit=${limit}`;

  // Helper fetch with timeout
  const fetchWithTimeout = async (url, timeoutMs = 4000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  };

  // Try direct URL first
  try {
    const data = await fetchWithTimeout(directUrl, 4000);
    return { data, isFallback: false };
  } catch (directErr) {
    console.warn(`[PhotoApi] Direct fetch failed (${directErr.message}), trying proxy...`);
    // Try proxy URL second
    try {
      const data = await fetchWithTimeout(proxyUrl, 4000);
      return { data, isFallback: false };
    } catch (proxyErr) {
      console.warn(`[PhotoApi] Proxy fetch failed (${proxyErr.message}), using resilient fallback.`);
      const fallbackList = FALLBACK_PAGES[page] || [];
      return { data: fallbackList, isFallback: true };
    }
  }
}

