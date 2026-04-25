import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import Review from "@/lib/models/Review";
import BeforeAfterCase from "@/lib/models/BeforeAfterCase";

const serviceRU: Record<string, {
  title_ru: string; subtitle_ru: string; description_ru: string;
  features_ru: { title_ru: string; description_ru: string }[];
  benefits_ru: string[];
}> = {
  "examinations": {
    title_ru: "Обследования & Диагностика",
    subtitle_ru: "Диагностика",
    description_ru: "Точная диагностика с использованием передовых цифровых технологий. Панорамные снимки и 3D томография CBCT для идеального плана лечения.",
    features_ru: [
      { title_ru: "Цифровая панорамная рентгенография", description_ru: "Полный обзор зубных рядов." },
      { title_ru: "3D томография CBCT", description_ru: "Детальная трёхмерная визуализация." },
      { title_ru: "Полный клинический осмотр", description_ru: "Тщательная оценка состояния полости рта." },
      { title_ru: "Индивидуальный план лечения", description_ru: "Персонализированная стратегия." },
    ],
    benefits_ru: ["Цифровое оборудование последнего поколения", "Быстрая и точная диагностика", "Минимальная доза радиации", "Мгновенные результаты"],
  },
  "preventive-care": {
    title_ru: "Профессиональная Гигиена",
    subtitle_ru: "Профилактика",
    description_ru: "Профессиональная чистка, ультразвуковой скейлинг и Air-Flow для здоровых зубов и сияющей улыбки. Профилактика — лучшее лечение.",
    features_ru: [
      { title_ru: "Ультразвуковой скейлинг", description_ru: "Удаление зубного камня с точностью." },
      { title_ru: "Профессиональная чистка Air-Flow", description_ru: "Глубокая чистка и лёгкое отбеливание." },
      { title_ru: "Фторирование и герметизация", description_ru: "Дополнительная защита зубов." },
      { title_ru: "Консультация по гигиене", description_ru: "Персональные рекомендации." },
    ],
    benefits_ru: ["Профилактика кариеса и болезней дёсен", "Более чистая и здоровая улыбка", "Безболезненные процедуры", "Индивидуальные рекомендации"],
  },
  "teeth-whitening": {
    title_ru: "Отбеливание Зубов",
    subtitle_ru: "Эстетика",
    description_ru: "Безопасное и эффективное профессиональное отбеливание для более яркой улыбки. Видимый результат уже с первого сеанса с технологиями последнего поколения.",
    features_ru: [
      { title_ru: "Кабинетное отбеливание с LED-лампой", description_ru: "Мгновенный результат." },
      { title_ru: "Домашний набор для отбеливания", description_ru: "Продолжение лечения дома." },
      { title_ru: "Осветление до 8 оттенков", description_ru: "Заметный и стойкий результат." },
      { title_ru: "Безопасная и безболезненная процедура", description_ru: "Без чувствительности." },
    ],
    benefits_ru: ["Профессиональная LED-технология", "Видимый результат с первого сеанса", "Безопасная процедура", "Длительность 45 минут"],
  },
  "orthodontics": {
    title_ru: "Ортодонтия & Коронки",
    subtitle_ru: "Ортодонтия",
    description_ru: "Выравнивание зубов с помощью современных брекетов и премиальных керамических коронок. Эстетические и функциональные решения для идеальной улыбки.",
    features_ru: [
      { title_ru: "Металлические и керамические брекеты", description_ru: "Эффективные классические решения." },
      { title_ru: "Прозрачные элайнеры", description_ru: "Незаметное выравнивание." },
      { title_ru: "Керамические коронки и мосты", description_ru: "Эстетические реставрации." },
      { title_ru: "Цифровое 3D-планирование", description_ru: "Персонализированное лечение." },
    ],
    benefits_ru: ["Цифровые 3D-технологии", "Премиальные материалы", "Предсказуемые результаты", "Чёткий план лечения"],
  },
  "oral-surgery": {
    title_ru: "Хирургия & Эндодонтия",
    subtitle_ru: "Хирургия",
    description_ru: "Малоинвазивная оральная хирургия и точное эндодонтическое лечение. Сохраняем зубы и восстанавливаем здоровье полости рта.",
    features_ru: [
      { title_ru: "Сложные хирургические удаления", description_ru: "Безопасные и быстрые процедуры." },
      { title_ru: "Современное лечение каналов", description_ru: "Сохранение натуральных зубов." },
      { title_ru: "Апикальная резекция", description_ru: "Малоинвазивное вмешательство." },
      { title_ru: "Малоинвазивная хирургия", description_ru: "Быстрое восстановление." },
    ],
    benefits_ru: ["Современная местная анестезия", "Малоинвазивные процедуры", "Быстрое восстановление", "Опытная команда"],
  },
  "dental-implants": {
    title_ru: "Зубные Импланты",
    subtitle_ru: "Имплантология",
    description_ru: "Премиальные зубные импланты для полной и стабильной улыбки. Долгосрочные решения — от одного импланта до полных несъёмных протезов.",
    features_ru: [
      { title_ru: "Одиночный имплант с керамической коронкой", description_ru: "Решение для одного зуба." },
      { title_ru: "All-on-4 / All-on-6", description_ru: "Полные несъёмные протезы." },
      { title_ru: "Костная пластика & Синус-лифтинг", description_ru: "Подготовка кости." },
      { title_ru: "Пожизненная гарантия на импланты", description_ru: "Полная надёжность." },
    ],
    benefits_ru: ["Сертифицированные премиальные импланты", "Пожизненная гарантия", "Цифровое 3D-планирование", "Долгосрочные решения"],
  },
};

const reviewRU: { name: string; name_ru: string; text_ru: string }[] = [
  {
    name: "Sherri K.",
    name_ru: "Sherri K.",
    text_ru: '"Замечательный опыт от начала до конца. Персонал был невероятно приветлив, а процедура — абсолютно безболезненной. Я наконец-то чувствую уверенность в своей улыбке."',
  },
  {
    name: "Anna M.",
    name_ru: "Anna M.",
    text_ru: '"Раньше я испытывала тревогу перед стоматологом. Здесь всё **было спокойно** и понятно объяснено. Лечение прошло **бережно**, и я очень довольна тем, **как естественно** выглядит моя улыбка."',
  },
  {
    name: "Ron B.",
    name_ru: "Ron B.",
    text_ru: '"Профессиональная команда, уделяющая большое внимание деталям. Результаты превзошли мои ожидания, а весь процесс прошёл гладко и слаженно."',
  },
  {
    name: "Maria D.",
    name_ru: "Maria D.",
    text_ru: '"Лучшая стоматология, в которой я когда-либо была. Врачи не торопятся объяснить всё и следят за тем, чтобы вам было комфортно на протяжении всего лечения."',
  },
];

const baRU: { label: string; label_ru: string }[] = [
  { label: "Teeth Whitening", label_ru: "Отбеливание Зубов" },
  { label: "Dental Veneers", label_ru: "Зубные Виниры" },
  { label: "Full Restoration", label_ru: "Полное Восстановление" },
];

export async function POST() {
  try {
    await dbConnect();
    const results: string[] = [];

    // Patch services
    for (const [slug, ru] of Object.entries(serviceRU)) {
      const service = await (Service as any).findOne({ slug }).lean() as any;
      if (!service) { results.push(`service not found: ${slug}`); continue; }

      // Merge RU into existing features array
      const updatedFeatures = (service.features || []).map((f: any, idx: number) => ({
        ...f,
        title_ru: ru.features_ru[idx]?.title_ru || f.title_ru || "",
        description_ru: ru.features_ru[idx]?.description_ru || f.description_ru || "",
      }));

      await (Service as any).findOneAndUpdate({ slug }, {
        $set: {
          title_ru: ru.title_ru,
          subtitle_ru: ru.subtitle_ru,
          description_ru: ru.description_ru,
          benefits_ru: ru.benefits_ru,
          features: updatedFeatures,
        },
      });
      results.push(`✓ service: ${slug}`);
    }

    // Patch reviews
    for (const r of reviewRU) {
      const res = await (Review as any).findOneAndUpdate(
        { name: r.name },
        { $set: { name_ru: r.name_ru, text_ru: r.text_ru } }
      );
      results.push(res ? `✓ review: ${r.name}` : `review not found: ${r.name}`);
    }

    // Patch before-after
    for (const b of baRU) {
      const res = await (BeforeAfterCase as any).findOneAndUpdate(
        { label: b.label },
        { $set: { label_ru: b.label_ru } }
      );
      results.push(res ? `✓ ba: ${b.label}` : `ba not found: ${b.label}`);
    }

    return NextResponse.json({ ok: true, results });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
