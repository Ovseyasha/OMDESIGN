export default async function ({ store, redirect, $fireAuth }) {
  const user = await $fireAuth.currentUser
  if (user) {
    if (user.id) {
      redirect('/admin/login?msg=auth')
    }
  }
  // if (!store.getters['login/token']) {
  //   redirect('/login?message=login')
  // }
}
