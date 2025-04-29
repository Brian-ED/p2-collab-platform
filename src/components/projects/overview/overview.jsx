import { ProjectSetup } from "@/components/projects/overview/projectSetup";

export const Overview = () => {
  return (
    <div>
      <h1 className="text-2xl">overview</h1>
      <p className="text-lg">
        this is the overview section of the projects page
      </p>
      <div className="mt-4">
        <p className="text-xl italic">here there will be:</p>
        <ul className="list-disc list-inside ml-2">
          <li>an introduction to the projects section</li>
          <li>
            an explanation of the different functionalities of the projects
            section
          </li>
          <li>details about the user&apos;s project</li>
          <li>a way to get back to the main page, to select other projects</li>
          <li>a list of the users with access to the project</li>
        </ul>
      </div>
      <div className="mx-auto w-[50%] py-26">
        <h3 className="text-2xl text-center">Get started with your project!</h3>
        <ProjectSetup />
      </div>
    </div>
  );
};
