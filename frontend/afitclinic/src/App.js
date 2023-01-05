import logo from "./logo.svg";

import "./App.scss";

import { Register } from "./Pages/Register";
import { Navbar } from "./Components/navbar";

function App() {
  return (
    <main>
      <Navbar />
      <section>
        <div>
          <Register />
        </div>
        <div>
          <h1>Welcome</h1>
        </div>
      </section>
      <section>blog</section>
      <footer>footer</footer>
    </main>
  );
}

export default App;
