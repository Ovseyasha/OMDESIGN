export default async function ({ redirect, store }) {
  const user = await store.dispatch('admin/getUid')
  if (user === 'null') {
    redirect('/admin/login?msg=auth')
  }
}
