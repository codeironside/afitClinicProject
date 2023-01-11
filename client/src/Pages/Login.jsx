import "../styles/login.scss";

export const Login = () => {
  return (
    <>
      <header>
        <h1>Login Page</h1>
      </header>
      <main>
        <form action="" method="get">
          <section class="email">
            <label for="">Email</label>
            <input class="sty" type="email" placeholder="janedoe@gmail.com" />
          </section>
          <section>
            <label for="">Password</label>
            <input
              class="sty"
              type="passsword"
              id="pword"
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
