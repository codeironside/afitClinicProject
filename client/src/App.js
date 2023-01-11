import logo from "./logo.svg";

import "./App.scss";
import { Navbar } from "./Components/navbar";
function App() {
  return (
    <>
      <Navbar />
      <section>
        <div></div>
        <div>
          <h1>Welcome</h1>
        </div>
      </section>
      <section id="Blog">Blog</section>

      <footer>footer</footer>
    </>
  );
}

export default App;
