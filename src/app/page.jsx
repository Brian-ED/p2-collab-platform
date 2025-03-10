import { TestComponent } from "@/app/components/test";
import { BoxedProject } from "@/app/components/boxed-project";

export default function Home() {
  return (
    <div className="items-center space-y-4 space-x-10">
      <div></div>
      <BoxedProject title="Title1" startDate=""/>
      <BoxedProject title="Title2" startDate=""/>
      <BoxedProject />
      <BoxedProject />
      <BoxedProject />
      <BoxedProject />
    </div>
  );
}
