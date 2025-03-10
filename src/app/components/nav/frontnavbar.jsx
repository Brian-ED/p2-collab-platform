export const FrontNavbar = () => {
  return (
    <nav>
      <img src="#" alt="Logo" />
      <nav className="Username">
        <button>
          <i className="fa fa-caret-down"></i>
        </button>
        <nav className="dropdown-content">
          <a href="#">Option 1</a>
          <a href="#">Option 2</a>
          <a href="#">Option 3</a>
        </nav>
      </nav>
      <a href="#">User button</a>
    </nav>
  );
};
