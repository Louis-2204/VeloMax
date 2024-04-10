'use server';
import { createClient } from './supabase/server';

export async function getItemsBySearchParams(searchParams: any) {
  'use server';

  const supabase = createClient();
  let velosQuery = null;
  let piecesQuery = null;
  if (!searchParams.pieces || searchParams.velos) {
    velosQuery = supabase.from('vélos').select('*');
  }

  if (!searchParams.velos || searchParams.pieces) {
    piecesQuery = supabase.from('pieces').select('*');
  }

  if (searchParams.velos) {
    velosQuery = velosQuery!.in('type', searchParams.velos.split(','));
    if (!searchParams.pieces) piecesQuery = undefined;
  }

  if (searchParams.pieces) {
    piecesQuery = piecesQuery!.in('type', searchParams.pieces.split(','));
  }

  if (searchParams.prix) {
    let finalQuery = [] as string[];
    searchParams.prix.split(',').map((price: string) => {
      switch (price.toLowerCase()) {
        case '0-50':
          finalQuery.push('and(prix_unitaire.gte.0,prix_unitaire.lte.50)');
          break;
        case '50-100':
          finalQuery.push('and(prix_unitaire.gte.50,prix_unitaire.lte.100)');
          break;
        case '100-200':
          finalQuery.push('and(prix_unitaire.gte.100,prix_unitaire.lte.200)');
          break;
        case '200-400':
          finalQuery.push('and(prix_unitaire.gte.200,prix_unitaire.lte.4000)');
          break;
        case '400-700':
          finalQuery.push('and(prix_unitaire.gte.400,prix_unitaire.lte.700)');
          break;
        case '700-1000':
          finalQuery.push('and(prix_unitaire.gte.700,prix_unitaire.lte.1000)');
          break;
        case '1000+':
          finalQuery.push('prix_unitaire.gte.1000');
          break;
        default:
          break;
      }
    });
    if (velosQuery) velosQuery = velosQuery.or(finalQuery.join(',') as any);
    if (piecesQuery) piecesQuery = piecesQuery.or(finalQuery.join(',') as any);
  }

  if (searchParams.nom) {
    if (velosQuery) velosQuery = velosQuery.ilike('nom', `%${searchParams.nom}%`);
    if (piecesQuery) piecesQuery = piecesQuery.ilike('nom', `%${searchParams.nom}%`);
  }

  const queries = [velosQuery, piecesQuery].filter((query) => query !== null);

  const results = await Promise.all(queries);

  const [velosResult, piecesResult] = results;
  if (velosResult?.error || piecesResult?.error) {
    console.log(velosResult?.error, piecesResult?.error);
    return [];
  }

  const velos = velosResult?.data || [];
  const pieces = piecesResult?.data || [];

  const items = [...velos, ...pieces];

  return items;
}
