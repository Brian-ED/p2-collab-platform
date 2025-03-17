const foldersNames = ["boxed-project"]

function FolderToLink(x) {
  return <a href={`/tests/${x}`}>{x}</a>
}

export default function Home() {
  return (
    <div>
      {foldersNames.map(FolderToLink)}
    </div>
  );
}
