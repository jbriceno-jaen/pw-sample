export function getCreds() {
  const user = process.env.SAUCE_USER;
  const pass = process.env.SAUCE_PASS;
  if (!user || !pass) {
    throw new Error('Missing SAUCE_USER/SAUCE_PASS environment variables');
  }
  return { user, pass };
}

