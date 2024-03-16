import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/actions/user";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    await createUser({
      name: `${evt.data.first_name} ${evt.data.last_name}`,
      email: evt.data.email_addresses[0].email_address,
      externalId: evt.data.id,
      imageUrl: evt.data.image_url,
    });
  }

  if (eventType === "user.updated") {
    await updateUser({
      externalId: evt.data.id,
      name: `${evt.data.first_name} ${evt.data.last_name}`,
      email: evt.data.email_addresses[0].email_address,
      imageUrl: evt.data.image_url,
    });
  }

  if (eventType === "user.deleted") {
    if (typeof evt.data.id === "string") {
      await deleteUser(evt.data.id);
    } else {
      // Handle the undefined case, e.g., log an error or throw an exception
      console.error("Error: evt.data.id is undefined");
    }
  }

  return new Response("", { status: 200 });
}
