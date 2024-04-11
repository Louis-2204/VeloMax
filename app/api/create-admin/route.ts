import { createAdmin } from '@/utils/createAdmin';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const email = body.get('email')?.toString();
  const password = body.get('password')?.toString();
  const nom = body.get('nom')?.toString();
  const prenom = body.get('prenom')?.toString();

  if (!email || !password || !nom || !prenom) {
    return new Response('Missing required fields', {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const is_created = await createAdmin(email, password, nom, prenom);

  if (!is_created) {
    return new Response('Error creating user', {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response('User created', {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
