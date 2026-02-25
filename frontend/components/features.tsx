

const features = [
  {

    title: "เลือกรถได้ตามความต้องการ",
    description:
      "มีรถให้เลือกหลากหลายรุ่น ทั้งรถเก๋ง รถกระบะ และ SUV พร้อมแพ็กเกจเช่ารายวัน รายสัปดาห์ หรือรายเดือน ปรับแผนได้ตามงบประมาณของคุณ",
  },
  {

    title: "ขั้นตอนง่าย อนุมัติรวดเร็ว",
    description:
      "จองรถออนไลน์ได้ตลอด 24 ชั่วโมง เอกสารไม่ยุ่งยาก รับรถได้รวดเร็ว พร้อมทีมงานคอยดูแลตลอดการใช้งาน",
  },
  {

    title: "ราคาชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง",
    description:
      "แสดงราคาชัดเจน โปร่งใส รวมประกันพื้นฐานและบริการช่วยเหลือฉุกเฉิน ให้คุณมั่นใจทุกการเดินทาง",
  },
  {

    title: "รถสะอาด ปลอดภัย พร้อมใช้งาน",
    description:
      "รถทุกคันผ่านการตรวจเช็กสภาพอย่างละเอียด ทำความสะอาดก่อนส่งมอบ เพื่อความปลอดภัยและความสบายใจของคุณ",
  },

];

const Features = () => {
  return (

    <div id="features" className="w-full py-12 xs:py-20 px-6" >
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center  drop-shadow-lg">
        ทำไมต้องเช่ารถกับเรา?
      </h2>
      <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col bg-background border rounded-xl py-6 px-5 bg-background/40 backdrop-blur-sm border"
          >

            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-foreground/80 text-[15px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default Features;
