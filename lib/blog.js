export const blogPosts = [
  {
    slug: "dr-alexander-soto-arthrex-instructor-latam",
    title:
      "Liderazgo en Cirugía MIS: Dr. Alexander Soto como Instructor Internacional en Arthrex",
    type: "Especialización y Docencia",
    date: "12 de Marzo, 2026",
    publishedAt: "2026-03-12",
    updatedAt: "2026-03-12",
    paragraph1:
      "El Dr. Alexander Soto consolida su posición como referente en la ortopedia regional tras su destacada participación en la sede central de Arthrex en Estados Unidos. Durante los días 11 y 12 de marzo de 2026, el especialista del CEO no solo asistió para perfeccionar técnicas de cirugía mínimamente invasiva (MIS) de pie y tobillo, sino que actuó como colaborador estratégico e instructor para médicos de toda Latinoamérica.",
    paragraph2:
      "Esta jornada de alta exigencia técnica incluyó el dominio de procedimientos artroscópicos no convencionales. Junto a un selecto grupo de cirujanos de Chile, Uruguay, Argentina, Perú y Colombia, el Dr. Soto intercambió protocolos de vanguardia, reafirmando que la medicina ecuatoriana, representada por el CEO, se encuentra al nivel de los estándares más rigurosos de la industria médica global.",
    note: "Ser parte del cuerpo de instructores de Arthrex y colaborar con Biocells Cadaveric Lab nos permite estandarizar la excelencia. No solo traemos tecnología a Ecuador, sino que formamos a la siguiente generación de cirujanos en técnicas que salvan extremidades.",
    noteTitle: "Formación de Clase Mundial",
    subtitle: "Alianza Estratégica: Biocells y Arthrex",
    subparagraph1:
      "La colaboración entre el Dr. Soto y Biocells Cadaveric Lab ha permitido establecer un programa teórico-práctico sin precedentes en el país. Este enfoque 'hands-on' asegura que el aprendizaje de técnicas quirúrgicas complejas se realice en ambientes controlados de simulación avanzada, garantizando la máxima seguridad del paciente antes de llegar al quirófano real.",
    image: "/assets/images/dr-alexander-soto-arthrex-instructor-latam.jpeg",
    subparagraph2:
      "El enfoque en técnicas mínimamente invasivas discutido en Naples busca transformar el postoperatorio tradicional. Al liderar estos cursos como speaker, el Dr. Alexander Soto promueve una cultura de precisión donde las incisiones milimétricas y la artroscopia avanzada permiten una recuperación funcional superior, reduciendo complicaciones y optimizando los tiempos de rehabilitación en el Centro de Especialidades Ortopédicas.",
    list: [
      "Instructor internacional en técnicas MIS para cirujanos de Latinoamérica.",
      "Desarrollo de programas teóricos-prácticos en conjunto con Biocells Ecuador.",
      "Especialización en artroscopia de pie y tobillo no convencional.",
    ],
  },
  {
    slug: "brigada-galapagos-2025-dr-alexander-soto",
    title:
      "Misión Galápagos 2025: Innovación en Cirugía de Pie y Tobillo con el Dr. Alexander Soto",
    type: "Brigada Médica",
    date: "20 de Noviembre, 2025",
    publishedAt: "2025-11-20",
    updatedAt: "2025-11-20",
    paragraph1:
      "La llegada del equipo del Centro de Especialidades Ortopédicas (CEO) al Hospital General Oskar Jandl en San Cristóbal marcó un hito en la atención humanitaria especializada. En un entorno donde el acceso a la alta complejidad es limitado, el Dr. Alexander Soto, especialista en pie y tobillo, lideró la evaluación de patologías deformantes y traumáticas que afectaban la movilidad de la comunidad galapagueña.",
    paragraph2:
      "Durante esta jornada intensa en noviembre de 2025, el Dr. Soto aplicó criterios de alta especialidad para resolver casos crónicos que requerían una visión experta. Su enfoque no solo se centró en la resolución quirúrgica, sino en la restauración funcional completa, permitiendo que pacientes con secuelas de fracturas y patologías degenerativas recuperaran la capacidad de caminar sin dolor en el terreno irregular de las islas.",
    note: "La movilidad es el pilar de la independencia humana. En San Cristóbal, nuestro objetivo fue devolver a cada paciente la confianza en su pisada, integrando técnicas de vanguardia con la calidez humana que define al equipo del CEO.",
    noteTitle: "Compromiso con el Movimiento",
    subtitle: "Especialidad en Pie y Tobillo: Resultados en Territorio",
    subparagraph1:
      "La intervención del Dr. Alexander Soto se fundamentó en un diagnóstico preciso mediante evaluación clínica avanzada. Al tratar afecciones complejas del retropié y antepié, se priorizó el uso de técnicas que minimizan el impacto postoperatorio, asegurando que los habitantes de la isla pudieran reintegrarse a sus actividades económicas y cotidianas en un tiempo récord.",
    image: "/assets/images/brigada_galapagos_2025_CEO.jpeg",
    subparagraph2:
      "Junto al equipo multidisciplinario del CEO, incluyendo especialistas en mano y fisioterapia, el Dr. Soto coordinó protocolos de rehabilitación inmediata. Esta sinergia permitió que los pacientes tratados por patologías de pie y tobillo recibieran un seguimiento integral, garantizando que el éxito de la cirugía se tradujera en una mejora real y sostenible en su calidad de vida.",
    list: [
      "Evaluación especializada de deformidades congénitas y adquiridas del pie.",
      "Tratamiento quirúrgico de lesiones complejas de tobillo con técnica mínimamente invasiva.",
      "Protocolos de recuperación acelerada adaptados a la realidad local de la isla.",
    ],
  },
];

export function getAllPosts() {
  return blogPosts.filter(
    (post, index, posts) =>
      posts.findIndex((candidate) => candidate.slug === post.slug) === index,
  );
}

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
