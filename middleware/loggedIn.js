export default function async({ redirect, $auth }) {
  if ($auth.loggedIn) {
    redirect("/dashboard");
  }
}
