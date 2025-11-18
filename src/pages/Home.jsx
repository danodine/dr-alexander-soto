// src/pages/Home.jsx
import React, { useEffect, useState } from "react";

export default function Home() {
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".animate");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("animate-visible");
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchLatestPost() {
      try {
        const res = await fetch("http://localhost:4000/api/instagram/latest");
        const data = await res.json();
        setLatestPost(data);
      } catch (err) {
        console.error("Error fetching Instagram post", err);
      }
    }
    fetchLatestPost();
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="bg-primary text-white text-center py-4">
        <div className="header-container">
          <img
            src="../../assets/images/portada_dr_alex_soto.png"
            alt="Portada donde figura el doctor Alexander Soto"
          />
          <div className="overlay-text animate">
            <h1>DR. ALEXANDER SOTO</h1>
            <h2>Traumatólogo Especialista en Pie y Tobillo</h2>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main>
        <div className="contenedor-main">
          <section id="vision" className="vision-container animate container">
            <div className="row row-cols-sm-1 row-cols-md-1 row-cols-lg-5 vision-image-text">
              <div className="col vision-text">
                <p className="ph3">Mi Visión</p>
                <p>
                  En nuestra práctica, creemos que la medicina va más allá del
                  tratamiento de enfermedades: es un compromiso con el bienestar
                  y la calidad de vida de cada paciente. Como especialista en
                  pie, tobillo y miembro inferior, mi misión es devolver la
                  movilidad y aliviar el dolor para que puedas disfrutar
                  plenamente de tus actividades diarias. <br />
                  Cada persona es única, y por eso ofrecemos un enfoque
                  personalizado, basado en años de formación, experiencia y un
                  profundo sentido de vocación. Desde el diagnóstico hasta la
                  recuperación, estamos aquí para acompañarte en cada paso del
                  camino, brindándote atención especializada y soluciones
                  adaptadas a tus necesidades. <br />
                  Porque tus pies son la base de tu bienestar, y merecen el
                  mejor cuidado.
                </p>
              </div>
              <div className="col vision-image">
                <img
                  src="/assets/images/Foto_vision.png"
                  alt="Foro del doctor Alexander Soto"
                />
              </div>
            </div>
          </section>
          <section className="bg-light">
            ‚{/* Main content */}
            <main className="my-4">
              {/* Titles */}
              <p className="ph3">Sobre mi</p>
              {/* First Bio Section */}
              <section className="sobre-mi container animate">
                <div className="sobre-mi-foto">
                  <img
                    src="/assets/images/Dr-Alexander-Soto.webp"
                    alt="Foto del doctor Alexander Soto"
                  />
                </div>
                <div className="sobre-mi-text">
                  <p className="ph5">Especialidad</p>
                  <p>Traumatología y Ortopedia en Cirugía de Pie y Tobillo</p>

                  <p className="ph5">Subespecialidad</p>
                  <p>Subespecialista en Cirugía Pie y Tobillo.</p>

                  <p className="ph5">Biografía</p>
                  <p className="ph4">Estudios</p>
                  <ul>
                    <li>Graduado de la Universidad Central del Ecuador.</li>
                    <li>
                      Postgrado en Traumatología y Ortopedia en el Hospital
                      Enrique Garcés.
                    </li>
                    <li>
                      Subespecialidad en Cirugía de Pie y Tobillo en el Hospital
                      Enrique Garcés.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Affiliations Section */}
              <section className="sobre-mi container animate">
                <div className="sobre-mi-foto no-mobile">
                  <img
                    src="/assets/images/dr-alex.soto.png"
                    alt="Foto del doctor Alexander Soto"
                  />
                </div>
                <div className="sobre-mi-text">
                  <p className="ph4">Afiliaciones</p>
                  <ul>
                    <li>
                      Médico Traumatólogo Tratante del Hospital Enrique Garcés.
                    </li>
                    <li>
                      Miembro Honorario de la Sociedad Internacional de
                      Flebología y Linfología del Pacífico.
                    </li>
                    <li>
                      Socio Activo de la Sociedad Ecuatoriana de Ortopedia y
                      Traumatología S.E.O.T.
                    </li>
                    <li>
                      Miembro Fundador del Capítulo de Cirugía de Pie y Tobillo
                      de la Sociedad Ecuatoriana de Ortopedia y Traumatología
                      S.E.O.T.
                    </li>
                  </ul>
                  <p className="ph4">Otros logros</p>
                  <p>
                    Autor de varios trabajos de investigación y ponente en foros
                    científicos nacionales e internacionales.
                  </p>
                </div>
              </section>

              {/* Mission */}
              <section className="mi-mision">
                <div className="mi-mision-inner container">
                  <p className="ph2 ph2-sobre-mi">
                    “Mi misión es devolverte la movilidad para que puedas volver
                    a disfrutar de tus actividades sin dolor ni limitaciones„
                  </p>
                </div>
              </section>

              {/* Video */}
              <section className="conoce-mejor container">
                <p className="ph5">Conozca su Traumatólogo</p>
                <div className="video-container">
                  <iframe
                    title="video"
                    src="https://www.youtube.com/embed/JvI7efSek0w"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            </main>
          </section>

          {/* <section className="instagram-container animate">
            <p className="ph3">Últimas publicaciones</p>

            {!latestPost && <p>Cargando última publicación...</p>}

            {latestPost && (
              <a
                href={latestPost.permalink}
                target="_blank"
                rel="noreferrer"
                className="instagram-post-card"
              >
                {latestPost.media_type === "VIDEO" ? (
                  <img
                    src={latestPost.thumbnail_url || latestPost.media_url}
                    alt={
                      latestPost.caption || "Última publicación de Instagram"
                    }
                  />
                ) : (
                  <img
                    src={latestPost.media_url}
                    alt={
                      latestPost.caption || "Última publicación de Instagram"
                    }
                  />
                )}
                {latestPost.caption && (
                  <p className="instagram-caption">
                    {latestPost.caption.substring(0, 100)}...
                  </p>
                )}
              </a>
            )}
          </section> */}
          <section>
            <p className="ph3">Formo parte de</p>
            <div className="forma-parte">
              <div className="logo-grid">
                <a
                  href="https://www.ceoecuador.com/team/alexander-soto/"
                  className="logo-item animate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/images/ceo-grey.png"
                    className="logo grey"
                  />
                  <img
                    src="/assets/images/ceo-color.png"
                    className="logo color"
                  />
                </a>

                <div className="logo-item animate">
                  <img
                    src="/assets/images/metropolitano-grey.png"
                    className="logo grey"
                  />
                  <img
                    src="/assets/images/metropolitano-color.png"
                    className="logo color"
                  />
                </div>

                <a
                  href="https://www.hospitalmetropolitano.org/en/doctors/10881/alexander-nicolal-soto-toledo"
                  className="logo-item animate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/images/vozandes-grey.png"
                    className="logo grey"
                  />
                  <img
                    src="/assets/images/vozandes-color.png"
                    className="logo color"
                  />
                </a>
              </div>
            </div>
          </section>

          {/* SEGUROS */}
          <section id="seguros" className="main-container-seguros-image">
            <img
              id="responsive-image"
              className="image-background-seguros"
              src="/assets/images/seguros.png"
              alt="Imagen artificial de una mano con una cruz de salud referenciando los seguros"
            />
            <div className="main-container-over-image-text-container">
              <p className="main-container-over-image-text">
                Seguros Con Los Que Trabajamos
              </p>
              <div className="main-container-over-grid-container animate">
                <div className="container mt-4">
                  <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-5 justify-content-center">
                    <div className="col">
                      <a
                        href="https://palig.com/es/ec"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="image-seguros"
                          src="/assets/images/Seguro-PANAMERICAN-LIFE-DE-ECUADOR.webp"
                          alt="Imagen del seguro Pan American Life"
                        />
                      </a>
                    </div>
                    <div className="col">
                      <a
                        href="https://www.saludsa.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="image-seguros"
                          src="/assets/images/Seguro-Saludsa.webp"
                          alt="Imagen del seguro Saludsa"
                        />
                      </a>
                    </div>
                    <div className="col">
                      <a
                        href="https://humana.med.ec/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="image-seguros"
                          src="/assets/images/Seguro-nuestra-esencia-es-humana.webp"
                          alt="Imagen del seguro Humana"
                        />
                      </a>
                    </div>
                    <div className="col">
                      <a
                        href="https://www.ecuasanitas.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="image-seguros"
                          src="/assets/images/Seguro-Ecuasanitas.webp"
                          alt="Imagen del seguro Ecuasanitas"
                        />
                      </a>
                    </div>
                    <div className="col">
                      <a
                        href="https://www.bmicos.com/ecuador/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="image-seguros"
                          src="/assets/images/Seguro-BMI.webp"
                          alt="Imagen del seguro BMI"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
