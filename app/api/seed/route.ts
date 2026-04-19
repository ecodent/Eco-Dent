import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TeamMember from "@/lib/models/TeamMember";
import Service from "@/lib/models/Service";
import Review from "@/lib/models/Review";
import BeforeAfterCase from "@/lib/models/BeforeAfterCase";
import HeroImage from "@/lib/models/HeroImage";

export async function POST() {
  try {
    await dbConnect();

  // Seed only if empty
  const teamCount = await TeamMember.countDocuments();
  if (teamCount === 0) {
    await TeamMember.insertMany([
      { name: "Dr. Emilia Rossi", role: "Cosmetic Dentist", image: "/medic1.png", order: 0 },
      { name: "Dr. Adrian Novak", role: "Implantologist", image: "/medic2.png", order: 1 },
      { name: "Dr. Lukas Meyer", role: "Lead Dentist", image: "/medic3.jpg", order: 2 },
      { name: "Dr. Sofia Chen", role: "Orthodontist", image: "/medic4.jpg", order: 3 },
      { name: "Dr. Marcus Reid", role: "Oral Surgeon", image: "/medic 5.jpg", order: 4 },
    ]);
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      {
        slug: "examinations", title: "Examinations", subtitle: "Radiografie & Tomografie Dentară",
        description: "Diagnosticare precisă cu tehnologie digitală de ultimă generație. Radiografii panoramice și tomografii CBCT 3D pentru un plan de tratament perfect.",
        image: "/radiografie-tomografie dentară.jpg", imagePosition: "center 30%", cardColor: "#0F1A2D", order: 0,
        features: [
          { title: "Radiografie panoramică digitală", description: "Imagine completă a arcadelor dentare." },
          { title: "Tomografie CBCT 3D", description: "Vizualizare tridimensională detaliată." },
          { title: "Examen clinic complet", description: "Evaluare amănunțită a sănătății orale." },
          { title: "Plan de tratament personalizat", description: "Strategie individualizată." },
        ],
        benefits: ["Echipamente digitale de ultimă generație", "Diagnostic rapid și precis", "Doze minime de radiație", "Rezultate instant"],
      },
      {
        slug: "preventive-care", title: "Preventive Care", subtitle: "Igienizare Profesională",
        description: "Curățare profesională, detartraj și periaj Air-Flow pentru dinți sănătoși și un zâmbet strălucitor. Prevenția este cel mai bun tratament.",
        image: "/Igienizare profesională.jpg", imagePosition: "center 30%", cardColor: "#ECEEF1", order: 1,
        features: [
          { title: "Detartraj ultrasonic", description: "Îndepărtarea tartrului cu precizie." },
          { title: "Periaj profesional Air-Flow", description: "Curățare profundă și albire ușoară." },
          { title: "Fluorizare și sigilare", description: "Protecție suplimentară pentru dinți." },
          { title: "Consultanță igienă orală", description: "Sfaturi personalizate." },
        ],
        benefits: ["Prevenirea cariilor și a bolilor gingivale", "Zâmbet mai curat și mai sănătos", "Proceduri nedureroase", "Recomandări personalizate"],
      },
      {
        slug: "teeth-whitening", title: "Teeth Whitening", subtitle: "Albire Dentară",
        description: "Albire profesională sigură și eficientă pentru un zâmbet mai luminos. Rezultate vizibile din prima ședință, cu tehnologie de ultimă generație.",
        image: "/albire dentară.jpg", imagePosition: "center 40%", cardColor: "#ECEEF1", order: 2,
        features: [
          { title: "Albire în cabinet cu lampă LED", description: "Rezultate imediate." },
          { title: "Kit de albire la domiciliu", description: "Continuare tratament acasă." },
          { title: "Rezultate până la 8 nuanțe", description: "Albire vizibilă și durabilă." },
          { title: "Procedură sigură și nedureroasă", description: "Fără sensibilitate." },
        ],
        benefits: ["Tehnologie LED profesională", "Rezultate vizibile din prima ședință", "Procedură sigură", "Durată de 45 minute"],
      },
      {
        slug: "orthodontics", title: "Orthodontics", subtitle: "Ortodonție & Coroane",
        description: "Aliniere dentară cu aparate moderne și coroane ceramice premium. Soluții estetice și funcționale pentru un zâmbet perfect.",
        image: "/service-coroane,punti.png", imagePosition: "center 30%", cardColor: "#0F1A2D", order: 3,
        features: [
          { title: "Aparate fixe metalice și ceramice", description: "Soluții clasice eficiente." },
          { title: "Alignere transparente", description: "Aliniere discretă." },
          { title: "Coroane și punți ceramice", description: "Restaurări estetice." },
          { title: "Tratament personalizat digital", description: "Planificare 3D." },
        ],
        benefits: ["Tehnologie digitală 3D", "Materiale premium", "Rezultate predictibile", "Plan de tratament clar"],
      },
      {
        slug: "oral-surgery", title: "Oral Surgery", subtitle: "Terapie & Endodonție",
        description: "Chirurgie orală minim invazivă și tratamente endodontice de precizie. Salvăm dinții și restaurăm sănătatea orală.",
        image: "/terapie și endodonție.png", imagePosition: "center 30%", cardColor: "#0168FF", order: 4,
        features: [
          { title: "Extracții chirurgicale complexe", description: "Proceduri sigure și rapide." },
          { title: "Tratament de canal modern", description: "Salvarea dinților naturali." },
          { title: "Rezecție apicală", description: "Intervenție minim invazivă." },
          { title: "Chirurgie minim invazivă", description: "Recuperare rapidă." },
        ],
        benefits: ["Anestezie locală modernă", "Proceduri minim invazive", "Recuperare rapidă", "Echipă experimentată"],
      },
      {
        slug: "dental-implants", title: "Dental Implants", subtitle: "Dantura Fixă pe Implanturi",
        description: "Implanturi dentare premium pentru un zâmbet complet și stabil. Soluții definitive de la un singur implant la arcade complete fixe.",
        image: "/dantura fixa pe implanturi.jpg", imagePosition: "center 60%", cardColor: "#ECEEF1", order: 5,
        features: [
          { title: "Implant unitar cu coroană ceramică", description: "Soluție pentru un singur dinte." },
          { title: "All-on-4 / All-on-6", description: "Arcade complete fixe." },
          { title: "Augmentare osoasă & Sinus Lift", description: "Pregătire os." },
          { title: "Garanție pe viață pe implanturi", description: "Siguranță totală." },
        ],
        benefits: ["Implanturi premium certificate", "Garanție pe viață", "Planificare digitală 3D", "Soluții definitive"],
      },
    ]);
  }

  const reviewCount = await Review.countDocuments();
  if (reviewCount === 0) {
    await Review.insertMany([
      { name: "Sherri K.", image: "/patient-1.jpg", grade: 5.0, text: '"Wonderful experience from start to finish. The staff was incredibly warm and the procedure was completely painless. I finally feel confident about my smile."', order: 0 },
      { name: "Anna M.", image: "/patient-2.jpg", grade: 5.0, text: '"I used to feel anxious before dental visits. Here everything **felt calm** and clearly explained. The treatment was **gentle**, and I\'m really happy with **how natural** my smile looks now."', order: 1 },
      { name: "Ron B.", image: "/patient-3.jpg", grade: 4.5, text: '"Professional team with great attention to detail. The results exceeded my expectations and the whole process was smooth and well-organized."', order: 2 },
      { name: "Maria D.", image: "/patient-4.jpg", grade: 5.0, text: '"Best dental clinic I\'ve ever been to. The doctors take their time to explain everything and make sure you\'re comfortable throughout the treatment."', order: 3 },
    ]);
  }

  const baCount = await BeforeAfterCase.countDocuments();
  if (baCount === 0) {
    await BeforeAfterCase.insertMany([
      { before: "/before11.png", after: "/after11.png", label: "Teeth Whitening", order: 0 },
      { before: "/smile-2.jpg", after: "/smile-2.jpg", label: "Dental Veneers", order: 1 },
      { before: "/smile-3.jpg", after: "/smile-3.jpg", label: "Full Restoration", order: 2 },
    ]);
  }

  const heroCount = await HeroImage.countDocuments();
  if (heroCount === 0) {
    await HeroImage.insertMany([
      { url: "/clinica1.jpg", order: 0 },
      { url: "/clinica222.png", order: 1 },
      { url: "/clinica33.png", order: 2 },
    ]);
  }

  return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
