import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
