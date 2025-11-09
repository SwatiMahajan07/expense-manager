import logo from "./assets/logo.png";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={logo} alt="Expense Manager Logo" className="w-20 h-20" />
      <h3 className="text-xl font-bold">Money Manager</h3>
    </div>
  );
}

export default App;
