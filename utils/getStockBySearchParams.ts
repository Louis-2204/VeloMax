'use server';
import { PieceStock, VeloStock } from '@/types/entities';
import { createClient } from './supabase/server';

export async function getStockBySearchParams(searchParams: any, id_boutique: string) {
  'use server';

  const supabase = createClient();
  let velosQuery = null;
  let piecesQuery = null;

  if (searchParams.velos || (!searchParams.fournisseur && !searchParams.pieces)) {
    velosQuery = supabase.from('boutiques_velos').select('quantite,vélos!inner(*)').eq('id_boutique', id_boutique);
  }

  if (searchParams.pieces || searchParams.fournisseur || (!searchParams.velos && !searchParams.pieces)) {
    piecesQuery = supabase
      .from('boutiques_pieces_fournisseurs')
      .select('fournisseurs!inner(nom_entreprise),quantite,pieces!inner(*)')
      .eq('id_boutique', id_boutique);
  }

  if (searchParams.velos) {
    velosQuery = velosQuery!.in('vélos.type', searchParams.velos.split(','));
    // if (!searchParams.pieces) piecesQuery = undefined;
  }

  if (searchParams.pieces) {
    piecesQuery = piecesQuery!.in('pieces.type', searchParams.pieces.split(','));
  }

  if (searchParams.nom) {
    if (velosQuery) velosQuery = velosQuery.ilike('vélos.nom', `%${searchParams.nom}%`);
    if (piecesQuery) piecesQuery = piecesQuery.ilike('pieces.nom', `%${searchParams.nom}%`);
  }

  if (searchParams.fournisseur) {
    if (piecesQuery) piecesQuery = piecesQuery.eq('id_fournisseur', searchParams.fournisseur);
  }

  const queries = [velosQuery, piecesQuery].filter((query) => query !== null);

  const results = await Promise.all(queries);

  const [result1, result2] = results;
  if (result1?.error || result2?.error) {
    console.log(result1?.error, result2?.error);
    return [];
  }

  let formatedVelos: VeloStock[] | undefined;
  let formatedPieces: PieceStock[] | undefined;

  if (result1 && !result2) {
    if (result1.data.length > 0 && 'id_velo' in result1.data[0]) {
      formatedVelos = formatVelo(result1);
      formatedPieces = [];
    }

    if (result1.data.length > 0 && (result1.data[0] as any).pieces) {
      formatedPieces = formatPieces(result1);
      formatedVelos = [];
    }

    if (result1.data.length > 0 && (result1.data[0] as any).vélos) {
      formatedVelos = formatVelo(result1);
      formatedPieces = [];
    }

    if ((result1.data as any).length === 0) {
      formatedPieces = [];
      formatedVelos = [];
    }
  } else {
    formatedPieces = formatPieces(result2);
    formatedVelos = formatVelo(result1);
  }

  const items = [...(formatedVelos || []), ...(formatedPieces || [])] as (PieceStock | VeloStock)[];

  return items;
}

function formatVelo(items: any) {
  const formatedVelos: VeloStock[] =
    items.data.map((item: any) => ({
      ...item['vélos'],
      quantite: item.quantite,
    })) || [];
  return formatedVelos;
}

function formatPieces(items: any) {
  const formatedPieces = items.data.reduce((acc: any, current: any) => {
    const existingPieceIndex = acc.findIndex((item: any) => item.id_piece === current.pieces.id_piece);
    if (existingPieceIndex !== -1) {
      acc[existingPieceIndex].fournisseurs.push({
        nom_fournisseur: current.fournisseurs.nom_entreprise,
        quantite: current.quantite,
      });
    } else {
      acc.push({
        ...current.pieces,
        fournisseurs: [
          {
            nom_fournisseur: current.fournisseurs.nom_entreprise,
            quantite: current.quantite,
          },
        ],
      });
    }
    return acc as PieceStock[];
  }, []);
  return formatedPieces;
}
