const foldersNames = ["boxed-project"]

export default function Home() {
  return (
    <div>
      {foldersNames.map(x=>(<a href={`/tests/${x}`}>{x}</a>))}
    </div>
  );
}
