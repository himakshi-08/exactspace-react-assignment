export const USER_LIST = ["Alan", "Bob", "Carol", "Dean", "Elin"];

export const USER_METADATA = {
  Alan: {
    name: "Alan",
    initials: "AL",
    color: "#E57373", // Coral
    bgLight: "#FFEBEE",
    role: "Frontend Engineer"
  },
  Bob: {
    name: "Bob",
    initials: "BO",
    color: "#4CAF50", // Fresh Green
    bgLight: "#E8F5E9",
    role: "System Architect"
  },
  Carol: {
    name: "Carol",
    initials: "CA",
    color: "#42A5F5", // Sky Blue
    bgLight: "#E3F2FD",
    role: "UI/UX Designer"
  },
  Dean: {
    name: "Dean",
    initials: "DE",
    color: "#FFA726", // Warm Amber
    bgLight: "#FFF3E0",
    role: "ML Specialist"
  },
  Elin: {
    name: "Elin",
    initials: "EE",
    color: "#AB47BC", // Soft Purple
    bgLight: "#F3E5F5",
    role: "Product Lead"
  },
  "PubNub Bot": {
    name: "PubNub Bot",
    initials: "PN",
    color: "#E91E63", // Pink/Red
    bgLight: "#FCE4EC",
    role: "Bot"
  }
};

export const getRandomUser = (exclude = null) => {
  const pool = exclude ? USER_LIST.filter(u => u !== exclude) : USER_LIST;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};

export const getUserColor = (name) => {
  if (USER_METADATA[name]) {
    return USER_METADATA[name].color;
  }
  // Fallback hash color
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 65%, 55%)`;
};

export const getUserInitials = (name) => {
  if (USER_METADATA[name]?.initials) return USER_METADATA[name].initials;
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

