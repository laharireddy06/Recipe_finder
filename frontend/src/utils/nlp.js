export function analyzeQuery(text) {
  const q = text.toLowerCase();

  return {
    isVeg: q.includes("veg"),
    isNonVeg: q.includes("non"),
    isKids: q.includes("kids"),
    isHealthy: q.includes("healthy"),
    isSpicy: q.includes("spicy"),
    isQuick: q.includes("quick") || q.includes("fast") || q.includes("30"),
    dinner: q.includes("dinner"),
    lunch: q.includes("lunch"),
    ingredients: q.split(" "),
  };
}
