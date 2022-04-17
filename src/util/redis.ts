import { createClient } from 'redis';
export default async function connectWithACLUser() {
  const client = createClient({
    url: process.env.REDIS_URL,
  });

  await client.connect();

  // Returns PONG
  console.log(`Response from PING command: ${await client.ping()}`);

  try {
    // This will error as this user is not allowed to run this command...
    console.log(`Response from GET command: ${await client.get('somekey')}`);
  } catch (e: any) {
    console.log(`GET command failed: ${e.message}`);
  }

  await client.quit();
}
