import Hero from "@/components/landing/Hero";
import PropuestaValor from "@/components/landing/PropuestaValor";
import Servicios from "@/components/landing/Servicios";
import Industrias from "@/components/landing/Industrias";
import Clientes from "@/components/landing/Clientes";
import Noticias from "@/components/landing/Noticias";
import ContactForm from "@/components/landing/ContactForm";
import Separator from "@/components/landing/Separator";

export default function Home() {
  return (
    <>
      <Hero />
      <PropuestaValor />
      <Separator imageUrl="/imgCamion.webp" />
      <Servicios />
      <Industrias />
      <Separator imageUrl="/imgEspacioUrbano.webp" />
      <Clientes />
      <Noticias />
      <Separator imageUrl="/imgSegrgacion.webp" />
      <ContactForm />
    </>
  );
}
