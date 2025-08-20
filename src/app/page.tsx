import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Redirect } from "@/components/Redirect";

export default function Home() {
  return (
      <>
        <Header/>
        <Hero />
        <Redirect/>
      </>
  );
}
