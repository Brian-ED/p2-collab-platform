import { GroupContract } from "./components/projects/groupContract/groupContract";
import { TestComponent } from "@/app/components/test";
import { LoginButton } from "./components/loginButton";

export default function Home() {
  return  (
    <div>
      <GroupContract />;
      <TestComponent />;
      <LoginButton />
    </div>
  );
}
