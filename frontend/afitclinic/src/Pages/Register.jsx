import "../styles/register.scss";
export const Register = () => {
  return (
    <>
      {" "}
      <header>
        <h1>Registration Page</h1>
      </header>
      <main class="register">
        <form class="form" action="" method="GET">
          <section class="fname">
            <label for="fname">First Name</label>
            <input class="sty" type="text" placeholder="First Name" required />
          </section>
          <section class="name">
            <label for="name">Last Name</label>
            <input class="sty" type="text" placeholder="Last Name" required />
          </section>
          <section class="phoneno">
            <label for="Phone Number">Phone Number</label>
            <input class="sty" type="tel" placeholder="Pohne No." />
          </section>
          <section class="email">
            <label for="">Email</label>
            <input
              class="sty"
              id="email"
              type="email"
              placeholder="janedoe@gmail.com"
            />
          </section>
          <section>
            <select name="gender" id="gender" required>
              <option value="">Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </section>
          <section class="Dob">
            <label for="">Date of Birth</label>
            <input class="sty" type="date" />
          </section>
          <section class="color">
            <label for="Favourite Color">Favourite Color</label>
            <input
              type="color"
              name="fcolor"
              placeholder="Select Favourite Color"
            />
          </section>
          <section>
            <label for="">Password</label>
            <input
              class="sty"
              type="passsword"
              id="psw"
              name="psw"
              minlength="8"
              placeholder="minimum of 8 characters"
              required
            />
          </section>
          <section>
            <input class="btn" type="submit" onclick="auth()" />
          </section>
        </form>
      </main>
    </>
  );
};
