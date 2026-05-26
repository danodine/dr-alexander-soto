let servicesPromise;

export async function loadServices() {
  if (servicesPromise) return servicesPromise;

  servicesPromise = fetch("/assets/data/services.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("No se pudo cargar services.json");
      }

      return res.json();
    })
    .then((raw) => {
      const fix = (p) => (p || "").replace(/^\.\.\//, "/");

      return raw.map((s) => {
        const images = Array.isArray(s.imagesCarucel) ? s.imagesCarucel : [];
        const symptoms = Array.isArray(s.symptoms) ? s.symptoms : [];

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
    })
    .catch((error) => {
      servicesPromise = null;
      throw error;
    });

  return servicesPromise;
}

export async function findServiceById(id) {
  const all = await loadServices();
  return all.find((s) => s.id === id) || null;
}
