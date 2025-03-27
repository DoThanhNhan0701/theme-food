import { container } from "./_component/style";
import { Card } from "./_component/Card";
import { foodData } from "@/helpers/data";

export default function FoodPage() {
  return (
    <div className="!max-w-full sm:!max-w-[250px]" style={container}>
      {foodData.map(([emoji, hueA, hueB], i) => (
        <Card i={i} emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
      ))}
    </div>
  );
}
