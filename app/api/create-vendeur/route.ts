import { createVendeur } from '@/utils/createVendeur';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const email = body.get('email')?.toString();
  const password = body.get('password')?.toString();
  const nom = body.get('nom')?.toString();
  const prenom = body.get('prenom')?.toString();
  const temps = body.get('temps')?.toString() as 'partiel' | 'plein';
  const date_embauche = body.get('date_embauche')?.toString();
  const id_boutique = body.get('id_boutique')?.toString();

  if (!email || !password || !nom || !prenom || !temps || !id_boutique) {
    return new Response('Missing required fields', {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  if (temps !== 'partiel' && temps !== 'plein') {
    return new Response('Invalid temps', {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const is_created = await createVendeur(email, password, nom, prenom, temps, id_boutique, date_embauche);

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
