import GroupContract from "@/components/groupContract";

const testRules = [
  {
    id: 1,
    title: "Meetings",
    rules: [
      "bla bla",
      "bla bla 2",
      "bla bla 3",
    ],
  },
  {
    id: 2,
    title: "Communication",
    rules: {
      rule1: "bla bla",
      rule2: "bla bla 2",
      rule3: "bla bla 3",
    },
  },
];

export default function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <GroupContract />
      <div className="bg-amber-900 h-screen"> TEST</div>
    </div>
  );
}
