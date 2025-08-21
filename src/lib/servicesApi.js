export async function loadServices() {
  const res = await fetch("/assets/data/services.json");
  const raw = await res.json();

  const fix = (p) => (p || "").replace(/^\.\.\//, "/");

  return raw.map((s) => {
    const images = Array.isArray(s.imagesCarucel) ? s.imagesCarucel : [];
    const symptoms = Array.isArray(s.symptoms) ? s.symptoms : [];

    // Pair: [{ image, symptom, altText }]
    const pairedSlides = symptoms.map((symptom, i) => {
      const imgObj = images[i] || images[images.length - 1] || {};
      return {
        image: fix(imgObj.image),
        symptom,
        altText: imgObj.altText || symptom,
      };
    });

    return {
      ...s,
      image: fix(s.image),
      slides: pairedSlides,
    };
  });
}

export async function findServiceById(id) {
  const all = await loadServices();
  return all.find((s) => s.id === id) || null;
}
